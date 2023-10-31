export default interface Category {
  budget_id: number;
  type: "income" | "expense" | "saving" | "investment";
  allocated_amount: number;
}
