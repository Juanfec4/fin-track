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

export default { getUserBudgets };
