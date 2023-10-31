import express from "express";
import categoryController from "../controllers/category.controller";

//Budget router
const router = express.Router();

//Get category
router.get("/:id", (req, res) => {});

//Get all categories for budget
router.get("/", (req, res) => {
  return categoryController.getAllBudgetCategories(req, res);
});

//Create category
router.post("/", (req, res) => {});

//Delete category
router.delete("/:id", (req, res) => {});

//Edit budget
router.patch("/:id", (req, res) => {});

export default router;
