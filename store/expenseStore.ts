import { addExpense, deleteExpense, getExpenses } from "@/db/expences";
import { Expense } from "@/types/";
import { create } from "zustand";

type ExpenseStore = {
  expenses: Expense[];
  load: () => void;
  add: (amount: number, category: string, note?: string) => void;
  remove: (id: string) => void;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],

  load: () => {
    set({ expenses: getExpenses() });
  },

  add: (amount, category, note) => {
    addExpense(amount, category, note);
    set({ expenses: getExpenses() });
  },

  remove: (id) => {
    deleteExpense(id);
    set({ expenses: getExpenses() });
  },
}));
