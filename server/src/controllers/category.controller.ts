import Category from "../models/category";
import Budget from "../models/budget";

import { Request, Response } from "express";
import knexConfig from "../../knexfile";
import knexLibrary from "knex";

const knex = knexLibrary(knexConfig);

//Get all categories in budget
const getAllBudgetCategories = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Check if request query include budget id
  if (!req.query["budgetId"]) return res.status(400).json("Missing budget id.");

  //Extract budget_id from query
  const { budgetId } = req.query;

  try {
    //Fetch budget that matches user id & budget id
    const matchingBudget: Budget = await knex("budget_members")
      .select("budget_id")
      .where({ member_id: userId, budget_id: budgetId })
      .first();

    //Check if any budgets were found for id
    if (
      !matchingBudget?.["budget_id"] ||
      Number(budgetId) !== matchingBudget?.["budget_id"]
    )
      return res.status(404).json("No budget found for supplied id.");

    //Get all categories for budget id
    const budgetCategories = await knex("categories").where({
      budget_id: budgetId,
    });
    return res.status(302).json(budgetCategories);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Server error.");
  }
};

export default { getAllBudgetCategories };
