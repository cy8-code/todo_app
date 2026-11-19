import "server-only";

import { createClient } from "@libsql/client";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

let client: ReturnType<typeof createClient> | undefined;

function getClient() {
  if (client) {
    return client;
  }

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    throw new Error(
      "TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be configured.",
    );
  }

  client = createClient({ url, authToken });
  return client;
}

async function ensureSchema() {
  const db = getClient();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1))
    )
  `);
  return db;
}

export async function listTodos(): Promise<Todo[]> {
  const db = await ensureSchema();
  const result = await db.execute(
    "SELECT id, title, completed FROM todos ORDER BY id DESC",
  );

  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    completed: Number(row.completed) === 1,
  }));
}

export async function createTodo(title: string): Promise<void> {
  const db = await ensureSchema();
  const result = await db.execute({
    sql: "INSERT INTO todos (title) VALUES (?)",
    args: [title],
  });
  if (result.rowsAffected !== 1) {
    throw new Error("Todo could not be created.");
  }
}

export async function toggleTodoById(id: number): Promise<void> {
  const db = await ensureSchema();
  const result = await db.execute({
    sql: `
      UPDATE todos
      SET completed = CASE completed WHEN 0 THEN 1 ELSE 0 END
      WHERE id = ?
    `,
    args: [id],
  });
  if (result.rowsAffected !== 1) {
    throw new Error("Todo was not found.");
  }
}

export async function deleteTodoById(id: number): Promise<void> {
  const db = await ensureSchema();
  const result = await db.execute({
    sql: "DELETE FROM todos WHERE id = ?",
    args: [id],
  });
  if (result.rowsAffected !== 1) {
    throw new Error("Todo was not found.");
  }
}
