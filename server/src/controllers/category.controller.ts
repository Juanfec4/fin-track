import Category from "../models/category";
import Budget from "../models/budget";

import { Request, Response } from "express";
import knexConfig from "../../knexfile";
import knexLibrary from "knex";

const knex = knexLibrary(knexConfig);

//Get category by id in budget
const getBudgetCategory = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Check if request query include budget id & category id
  if (!req.query["budgetId"]) return res.status(400).json("Missing budget id.");
  if (!req.params["id"]) return res.status(400).json("Missing category id.");

  //Extract budget_id from query & category id from params
  const { budgetId } = req.query;
  const categoryId = req.params.id;

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
    const budgetCategory = await knex("categories")
      .where({
        budget_id: budgetId,
        id: categoryId,
      })
      .first();
    return res.status(302).json(budgetCategory);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Server error.");
  }
};

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

//Create new category
const createNewCategory = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Check for request body
  if (!req.body["budgetId"]) return res.status(400).json("Missing budget id.");
  if (!req.body["type"]) return res.status(400).json("Missing category type.");
  if (!req.body["categoryName"])
    return res.status(400).json("Missing category name.");
  if (!req.body["allocatedAmount"])
    return res.status(400).json("Missing allocated amount.");

  //Extract values from request body
  const { budgetId, type, allocatedAmount, categoryName } = req.body;

  //Check if type is valid
  if (
    type !== "income" &&
    type !== "expense" &&
    type !== "saving" &&
    type !== "investment"
  )
    return res
      .status(400)
      .json("Invalid type, must be: income, expense, saving or investment.");

  //Check if user has access to budget with id
  const matchingBudget = await knex("budget_members")
    .where({
      budget_id: budgetId,
      member_id: userId,
    })
    .first();

  //Check if any budgets were found for id
  if (
    !matchingBudget?.["budget_id"] ||
    Number(budgetId) !== matchingBudget?.["budget_id"]
  )
    return res.status(404).json("No budget found for supplied id.");

  //Create new category
  const newCategory: Category = {
    category_name: categoryName,
    budget_id: budgetId,
    type,
    allocated_amount: allocatedAmount,
  };
  const [createdCategoryId] = await knex("categories").insert(newCategory);

  //Select category to send it back in response
  const createdCategory = await knex("categories")
    .where({
      id: createdCategoryId,
    })
    .first();

  return res.status(201).json(createdCategory);
};

//Delete category
const deleteCategory = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Check if request query include budget id & category id
  if (!req.query["budgetId"]) return res.status(400).json("Missing budget id.");
  if (!req.params["id"]) return res.status(400).json("Missing category id.");

  //Extract budget_id from query & category id from params
  const { budgetId } = req.query;
  const categoryId = req.params.id;

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
    await knex("categories")
      .where({
        budget_id: budgetId,
        id: categoryId,
      })
      .delete();
    return res.status(302).json("Successfully deleted.");
  } catch (e) {
    console.log(e);
    return res.status(500).json("Server error.");
  }
};

export default {
  getAllBudgetCategories,
  createNewCategory,
  getBudgetCategory,
  deleteCategory,
};
