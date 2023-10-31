export default interface Transaction {
  amount: number;
  budget_id: number;
  category_id: number;
  date: Date;
  description: string | undefined;
}
