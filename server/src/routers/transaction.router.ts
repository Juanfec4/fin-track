import express from "express";
import transactionController from "../controllers/transaction.controller";

//Transaction router
const router = express.Router();

//Get transaction for budget
router.get("/:id", (req, res) => {
  return transactionController.getTransaction(req, res);
});

//Get all transactions for budget
router.get("/", (req, res) => {
  return transactionController.getAllTransactions(req, res);
});

//Create transaction
router.post("/", (req, res) => {});

//Delete transaction
router.delete("/:id", (req, res) => {});

//Edit transaction
router.patch("/:id", (req, res) => {});

export default router;
