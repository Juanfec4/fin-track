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
    return res.status(201).json("User created successfully.");
  }
  return res.status(500).json("Server error.");
};

export default { registerUser };
