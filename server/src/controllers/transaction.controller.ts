import Budget from "../models/budget";
import { Request, Response } from "express";
import knexConfig from "../../knexfile";
import knexLibrary from "knex";
import Transaction from "../models/transaction";

const knex = knexLibrary(knexConfig);

//Get all transactions for budget
const getAllTransactions = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;
  //Check if request query include budget id
  if (!req.query["budgetId"]) return res.status(400).json("Missing budget id.");

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

    //Get all transactions for budget id
    const budgetTransactions = await knex("transactions").where({
      budget_id: budgetId,
    });
    return res.status(302).json(budgetTransactions);
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Gre transaction by id
const getTransaction = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Check if request has transaction id and query budget id
  if (!req.params["id"]) return res.status(400).json("Missing category id.");
  if (!req.query["budgetId"]) return res.status(400).json("Missing budget id.");
  //Extract budget_id from query & category id from params

  const transactionId = req.params.id;
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
      return res.status(403).json("No budget found for supplied id.");

    //Get transaction
    const budgetTransaction = await knex("transactions")
      .where({
        budget_id: budgetId,
        id: transactionId,
      })
      .first();
    return res.status(302).json(budgetTransaction);
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Create transaction
const createTransaction = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;
  //Check for request body
  if (!req.body["budgetId"]) return res.status(400).json("Missing budget id.");
  if (!req.body["categoryId"])
    return res.status(400).json("Missing category id.");
  if (!req.body["amount"]) return res.status(400).json("Missing amount.");

  //Extract values from request body
  const { budgetId, categoryId, amount, description } = req.body;

  try {
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
      return res.status(403).json("No budget found for supplied id.");

    //Create new transaction
    const newTransaction: Transaction = {
      category_id: categoryId,
      budget_id: budgetId,
      amount,
      date: new Date(Date.now()),
      description: description || "",
    };
    const [createdTransactionId] = await knex("transactions").insert(
      newTransaction
    );
    //Select category to send it back in response
    const createdTransaction = await knex("transaction")
      .where({
        id: createdTransactionId,
      })
      .first();
    return res.status(201).json(createdTransaction);
  } catch (e) {
    return res.status(500).json("Sever error.");
  }
};

export default { getAllTransactions, getTransaction };
