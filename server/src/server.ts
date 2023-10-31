import "dotenv/config";
import express from "express";
import ip from "ip";

//Middleware
import authMiddleware from "./middlewares/auth.middleware";

//Routers
import authRouter from "./routers/auth.router";
import budgetRouter from "./routers/budget.router";
import categoryRouter from "./routers/category.router";
import transactionRouter from "./routers/transaction.router";

const port: string = process.env.PORT || "8080";
const app = express();

app.use(express.json());

//Middlewares
app.use("/api", authMiddleware);

//Routers
app.use("/auth", authRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/transactions", transactionRouter);

app.listen(port, () => {
  console.log(`Server started on: http://${ip.address()}:${port}`);
});
