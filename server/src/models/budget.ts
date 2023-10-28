export default interface BudgetMember {
  budget_id: number;
  member_id: number;
}

export default interface Budget {
  uuid: string;
  budget_name: string;
  owner_id: string;
}
