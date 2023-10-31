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

  const { budgetId, categoryId } = req.query;

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

    //Get all transactions for budget id, if a category id is specified, filter by that too.
    const budgetTransactions = await knex("transactions").where(
      categoryId
        ? { budget_id: budgetId, category_id: categoryId }
        : {
            budget_id: budgetId,
          }
    );
    return res.status(302).json(budgetTransactions);
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Get transaction by id
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
  if (!req.body["dateTime"]) return res.status(400).json("Missing date.");

  //Extract values from request body
  const { budgetId, categoryId, amount, description, dateTime } = req.body;

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
      date: dateTime,
      description: description || "",
    };
    const [createdTransactionId] = await knex("transactions").insert(
      newTransaction
    );
    //Select category to send it back in response
    const createdTransaction = await knex("transactions")
      .where({
        id: createdTransactionId,
      })
      .first();
    return res.status(201).json(createdTransaction);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Sever error.");
  }
};

//Delete transaction
const deleteTransaction = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Check if request query include budget id & transaction id
  if (!req.query["budgetId"]) return res.status(400).json("Missing budget id.");
  if (!req.params["id"]) return res.status(400).json("Missing transaction id.");

  //Extract budget_id from query & category id from params
  const { budgetId } = req.query;
  const transactionId = req.params.id;

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

    //Get all categories for budget id
    const result = await knex("transactions")
      .where({
        budget_id: budgetId,
        id: transactionId,
      })
      .delete();
    if (!result) return res.status(404).json("No transaction found for id.");
    return res.status(302).json("Successfully deleted.");
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Edit transactions
const editTransaction = async (req: Request, res: Response) => {
  //Extract user id from request (middleware adds it)
  const { userId } = req;

  //Check if request query include category id
  if (!req.params["id"]) return res.status(400).json("Missing transaction id.");

  //Extract budget_id from query & category id from params
  const transactionId = req.params.id;

  //Extract values from request body
  const { budgetId, categoryId, amount, date, description } = req.body;

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

    //Get prev transaction
    const prevTransaction = await knex("transactions")
      .where({
        budget_id: budgetId,
        id: transactionId,
      })
      .first();

    //If there is no previous transaction theres a logic error, probably race conditions.
    if (!prevTransaction) return res.status(500).json("Server error.");

    //Create new transaction
    const newTransaction: Transaction = {
      category_id: categoryId || prevTransaction.category_id,
      budget_id: prevTransaction.budget_id,
      amount: amount || prevTransaction.amount,
      description: description || prevTransaction.description,
      date: date || prevTransaction.date,
    };

    //Update record
    await knex("transactions")
      .where({
        id: transactionId,
      })
      .update(newTransaction);

    //Get updated record
    const updatedTransaction = await knex("transactions").where({
      id: transactionId,
    });

    return res.status(200).json(updatedTransaction);
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};
export default {
  getAllTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  editTransaction,
};
