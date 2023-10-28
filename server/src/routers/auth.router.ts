import express from "express";
import authController from "../controllers/auth.controller";

//Auth router
const router = express.Router();

//Login
router.post("/login", (req, res) => {
  return authController.loginUser(req, res);
});

//Register
router.post("/register", (req, res) => {
  return authController.registerUser(req, res);
});

//Refresh token
router.post("/refresh", (req, res) => {
  return authController.refreshToken(req, res);
});

export default router;
