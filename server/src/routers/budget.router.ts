import express from "express";
import budgetController from "../controllers/budget.controller";

//Budget router
const router = express.Router();

//Get budget
router.get("/:id", (req, res) => {
  return budgetController.getUserBudgetById(req, res);
});

//Get all budgets
router.get("/", (req, res) => {
  return budgetController.getUserBudgets(req, res);
});

//Create budget
router.post("/", (req, res) => {
  return budgetController.createBudget(req, res);
});

//Delete budget
router.delete("/:id", (req, res) => {
  return budgetController.deleteBudget(req, res);
});

//Edit budget
router.patch("/:id", (req, res) => {
  return budgetController.editBudget(req, res);
});

export default router;
