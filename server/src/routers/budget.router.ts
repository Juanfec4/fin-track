import express from "express";

//Auth router
const router = express.Router();

//Get budget
router.get("/:id", (req, res) => {});

//Get all budgets
router.get("/", (req, res) => {});

//Create budget
router.post("/", (req, res) => {});

//Delete budget
router.delete("/:id", (req, res) => {});

//Edit budget
router.patch("/:id", (req, res) => {});

export default router;
