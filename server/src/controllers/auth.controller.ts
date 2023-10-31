import User from "../models/user";

import { Request, Response } from "express";
import knexConfig from "../../knexfile";
import knexLibrary from "knex";

import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../utils/validators";
import { hashPassword } from "../utils/passwordHasher";
import { comparePassword } from "../utils/passwordCompare";

import {
  generateRefreshToken,
  generateToken,
  verifyToken,
} from "../utils/jsonWebToken";

import mailService from "../mailer/mailService";

const knex = knexLibrary(knexConfig);

//Register user
const registerUser = async (req: Request, res: Response) => {
  //Validate request body
  if (!req.body["username"]) return res.status(400).json("Missing username.");

  if (!req.body["email"]) return res.status(400).json("Missing email.");

  if (!req.body["password"]) return res.status(400).json("Missing password.");

  //Extract values from request body
  const { username, email, password }: User = req.body;

  //Validate string formats
  if (!isValidUsername(username))
    return res.status(400).json("Invalid username.");

  if (!isValidEmail(email)) return res.status(400).json("Invalid email.");

  if (!isValidPassword(password))
    return res.status(400).json("Invalid password.");

  try {
    //Check if user does not exist on DB
    const existingUser = await knex
      .select("*")
      .from("users")
      .where({ username: username })
      .orWhere({ email: email });

    if (existingUser.length !== 0)
      return res.status(400).json("User already exists.");

    //Hash password
    let hashedPassword = await hashPassword(password);

    //Create user object from model
    let newUser: User = {
      username: username,
      email: email,
      password: hashedPassword,
    };
    //Create new user on DB
    let resultId = await knex("users").insert(newUser);

    if (resultId.length !== 0) {
      //Create email transporter
      const transporter = mailService.createTransporter();

      //Create email welcome email
      const welcomeEmail = await mailService.createEmail(
        email,
        "Welcome to Fin Track",
        "welcomeEmail",
        {
          title: "Thank you for creating an account with us.",
          message: "You are one step closer to reaching financial wellbeing.",
        }
      );

      //Send email
      transporter.sendMail(welcomeEmail, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json("Server error.");
        }
        return res.status(201).json("User created successfully.");
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json("Server error.");
  }
};

//Login user
const loginUser = async (req: Request, res: Response) => {
  //Validate request body
  if (!req.body["email"]) return res.status(400).json("Missing email.");

  if (!req.body["password"]) return res.status(400).json("Missing password.");

  //Extract values from request body
  const { email, password }: User = req.body;

  //Search for user on DB based on email
  const existingUser = await knex("users")
    .select("id")
    .select("password")
    .where({ email: email })
    .first();

  if (!existingUser) return res.status(204).json("No user found.");

  //Compare passwords to see if they match
  let hashedPassword = existingUser.password;

  if (!(await comparePassword(password, hashedPassword)))
    return res.status(401).json("Invalid password.");

  // Generate JWT token
  let token = generateToken(existingUser.id);
  let refreshToken = generateRefreshToken(existingUser.id);

  // Send it in response
  return res
    .status(200)
    .header("Authorization", token)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json("Login successful.");
};

//Refresh user token
const refreshToken = async (req: Request, res: Response) => {
  //Validate request body
  if (!req.body["refreshToken"])
    return res.status(401).json("No refresh token provided.");

  //Extract values from request
  const { refreshToken } = req.body;
  const payload = await verifyToken(refreshToken);

  //Verify if refresh token is valid
  if (!payload?.["user_id"])
    return res.status(401).json("Invalid refresh token.");

  //Extract user id
  const userId = payload.user_id;
  const newToken = generateToken(userId);

  // Send new token in response
  return res
    .status(200)
    .header("Authorization", newToken)
    .json("Refresh successful.");
};

export default { registerUser, loginUser, refreshToken };
