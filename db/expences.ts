import { db } from "@/db/index";
import { Expense } from "@/types/index";
import { randomUUID } from "expo-crypto";

export const addExpense = (amount: number, category: string, note?: string) => {
  const now = Date.now();

  db.runSync(
    `
    INSERT INTO expenses (
      id,
      amount,
      category,
      note,
      created_at,
      updated_at,
      needs_sync
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [
      randomUUID(),
      amount,
      category,
      note ?? null,
      now,
      now,
      1, // mark for sync later
    ]
  );
};

export const getExpenses = (): Expense[] => {
  return db.getAllSync<Expense>(
    `
    SELECT * FROM expenses
    WHERE is_deleted = 0
    ORDER BY created_at DESC
  `
  );
};

export const deleteExpense = (id: string) => {
  db.runSync(
    `
    UPDATE expenses
    SET is_deleted = 1,
        needs_sync = 1,
        updated_at = ?
    WHERE id = ?
  `,
    [Date.now(), id]
  );
};
