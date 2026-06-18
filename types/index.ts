export type Expense = {
  id: string;
  amount: number;
  category: string;
  note?: string | null;
  created_at: string;
  updated_at?: string;
  is_deleted?: string;
  needs_sync?: number;
};
export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  note?: string | null;
};
