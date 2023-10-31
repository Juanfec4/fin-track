export default interface Category {
  category_name: string;
  budget_id: number;
  type: "income" | "expense" | "saving" | "investment";
  allocated_amount: number;
}
