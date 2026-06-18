// src/db/index.ts
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("minty.db");
