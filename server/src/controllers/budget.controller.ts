import User from "../models/user";
import Budget from "../models/budget";
import BudgetMembers from "../models/budget";

import { Request, Response } from "express";
import knexConfig from "../../knexfile";
import knexLibrary from "knex";
import { generateUUID } from "../utils/uuidGenerator";

const knex = knexLibrary(knexConfig);

//Get all budgets
const getUserBudgets = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  try {
    //Fetch all budgets that match user id
    const budgetIds = await knex("budget_members")
      .where({ member_id: userId })
      .pluck("budget_id");

    const budgets = await knex("budgets").select("*").whereIn("id", budgetIds);

    return res.status(302).json(budgets);
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Get 1 budget by id
const getUserBudgetById = async (req: Request, res: Response) => {
  //Validate request params
  if (!req.params["id"]) return res.status(400).json("Missing id param");

  //Extract user id from request (middleware adds it), and id param
  const { userId } = req;
  const { id } = req.params;

  try {
    //Fetch budget that matches user id & budget id
    const matchingBudget: Budget = await knex("budget_members")
      .select("budget_id")
      .where({ member_id: userId, budget_id: id })
      .first();

    //Check if any budgets were found for id
    if (!matchingBudget?.["budget_id"])
      return res.status(404).json("No budget found for supplied id.");

    const budgetId = matchingBudget.budget_id;
    const budget = await knex("budgets")
      .select("*")
      .where({ id: budgetId })
      .first();

    //Fetch usernames of all members of the budget
    const userIds = await knex("budget_members")
      .where({ budget_id: budgetId })
      .pluck("member_id");

    const budgetMembers = await knex("users")
      .select("username", "id")
      .whereIn("id", userIds);
    return res.status(201).json({ ...budget, members: budgetMembers });
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Create new budget
const createBudget = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Validate request body
  if (!req.body["budgetName"])
    return res.status(400).json("Missing budget name.");

  //Extract values from request
  const budget_name = req.body.budgetName;

  //Generate budget uuid
  const uuid = await generateUUID();

  try {
    //Create budget
    const [createdBudgetId] = await knex("budgets").insert({
      budget_name,
      uuid,
    });

    //Add user to budget members table
    await knex("budget_members").insert({
      budget_id: createdBudgetId,
      member_id: userId,
    });

    //Fetch created budget
    const createdBudget = await knex("budgets")
      .select("id", "budget_name", "uuid")
      .where({ id: createdBudgetId })
      .first();

    //Fetch usernames of all members of the budget
    const userIds = await knex("budget_members")
      .where({ budget_id: createdBudgetId })
      .pluck("member_id");

    const budgetMembers = await knex("users")
      .select("username", "id")
      .whereIn("id", userIds);

    return res.status(201).json({ ...createdBudget, members: budgetMembers });
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Delete budget
const deleteBudget = async (req: Request, res: Response) => {
  //Validate request params
  if (!req.params["id"]) return res.status(400).json("Missing id param");

  //Extract user id from request (middleware adds it), and id param
  const { userId } = req;
  const { id } = req.params;

  //Verify user is member of budget
  const [authorizedBudgetId] = await knex("budget_members")
    .where({
      member_id: userId,
      budget_id: id,
    })
    .pluck("budget_id");

  //Check if user is authorized to delete
  if (!authorizedBudgetId)
    return res.status(404).json("Cannot find budget to delete.");

  //Delete record
  const deletedId = await knex("budgets")
    .where({ id: authorizedBudgetId })
    .delete();

  //Check if it was deleted
  if (!deletedId) return res.status(400).json("Server error.");

  return res.status(200).json("Successfully deleted.");
};

export default {
  getUserBudgets,
  getUserBudgetById,
  createBudget,
  deleteBudget,
};
