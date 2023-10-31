import Budget from "../models/budget";

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

    const budgets = await knex("budgets")
      .select("id", "budget_name", "uuid")
      .whereIn("id", budgetIds);

    return res.status(302).json(budgets);
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

//Get 1 budget by id
const getUserBudgetById = async (req: Request, res: Response) => {
  //Validate request params
  if (!req.params["id"]) return res.status(400).json("Missing id query param");

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
  const { budgetName } = req.body;

  //Generate budget uuid
  const uuid = await generateUUID();

  try {
    //Create budget
    const [createdBudgetId] = await knex("budgets").insert({
      budget_name: budgetName,
      uuid,
      owner_id: userId,
    });

    //Add user to budget members table
    await knex("budget_members").insert({
      budget_id: createdBudgetId,
      member_id: userId,
    });

    //Fetch created budget
    const createdBudget = await knex("budgets")
      .select("*")
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
    console.log(e);
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

  //Check if user is owner
  const record = await knex("budgets").where({ id: id }).first();

  if (!record) return res.status(404).json("Budget not found.");

  //Check if user can delete
  if (record?.owner_id !== userId) return res.status(401).json("Unauthorized.");

  //Delete record
  await knex("budgets").where({ id: id, owner_id: userId }).delete();

  return res.status(200).json("Successfully deleted.");
};

//Edit budget
const editBudget = async (req: Request, res: Response) => {
  //Validate request params
  if (!req.params["id"]) return res.status(400).json("Missing id param");

  //Extract user id from request (middleware adds it), and id param
  const { userId } = req;
  const { id } = req.params;

  try {
    //Check if budget exists
    const record = await knex("budgets").where({ id: id }).first();

    if (!record) return res.status(404).json("Budget not found.");

    //Check if user has access to budget as owner
    if (record.owner_id !== userId)
      return res.status(401).json("Unauthorized.");

    //Update name if request has a new name value
    let newBudgetName: string = "";
    if (req.body["budget_name"]) newBudgetName = req.body.budget_name;

    //If name is different update record
    if (newBudgetName !== record.budget_name) {
      await knex("budgets")
        .where({ id: id })
        .update({ budget_name: newBudgetName });
    }

    //Update members if request has a new members array value
    let newMembers: number[] = [];
    if (req.body["members"] && Array.isArray(req.body.members)) {
      newMembers = req.body.members;

      //Find members of the budget
      const existingMembers = await knex("budget_members")
        .where({ budget_id: id })
        .pluck("member_id");

      //Check which members are missing in the new members array
      const membersToDelete = existingMembers.filter((member) => {
        return newMembers.indexOf(member) < 0;
      });

      //If there are members to delete remove them.
      if (membersToDelete.length > 0) {
        await knex("budget_members")
          .whereIn("member_id", membersToDelete)
          .delete();
      }
    } else {
      //Get Updated budget
      const updatedBudget = await knex("budgets")
        .select("*")
        .where({ id: id })
        .first();

      //Fetch usernames of all members of the budget
      const userIds = await knex("budget_members")
        .where({ budget_id: id })
        .pluck("member_id");

      const budgetMembers = await knex("users")
        .select("username", "id")
        .whereIn("id", userIds);

      return res.status(200).json({ ...updatedBudget, members: budgetMembers });
    }
  } catch (e) {
    return res.status(500).json("Server error.");
  }
};

export default {
  getUserBudgets,
  getUserBudgetById,
  createBudget,
  deleteBudget,
  editBudget,
};
