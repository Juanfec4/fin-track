import express from "express";
import cors from "cors";

const middleware = express.Router();

middleware.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ["Authorization", "Refresh"],
  })
);

export default middleware;
