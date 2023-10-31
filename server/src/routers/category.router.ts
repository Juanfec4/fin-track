import express from "express";
import categoryController from "../controllers/category.controller";

//Budget router
const router = express.Router();

//Get category
router.get("/:id", (req, res) => {
  return categoryController.getBudgetCategory(req, res);
});

//Get all categories for budget
router.get("/", (req, res) => {
  return categoryController.getAllBudgetCategories(req, res);
});

//Create category
router.post("/", (req, res) => {
  return categoryController.createNewCategory(req, res);
});

//Delete category
router.delete("/:id", (req, res) => {
  return categoryController.deleteCategory(req, res);
});

//Edit category
router.patch("/:id", (req, res) => {});

export default router;
