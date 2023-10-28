import User from "../models/user";
import Budget from "../models/budget";
import BudgetMembers from "../models/budget";

import { Request, Response } from "express";
import knexConfig from "../../knexfile";
import knexLibrary from "knex";

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
    const budgetId = await knex("budget_members")
      .select("budget_id")
      .where({ member_id: userId, budget_id: id })
      .first();

    //Check if any budgets were found for id
    if (!budgetId)
      return res.status(404).json("No budget found for supplied id.");

    const budget = await knex("budgets").select("*").where({ id: budgetId });

    return res.status(302).json(budget);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Server error.");
  }
};

export default { getUserBudgets, getUserBudgetById };
