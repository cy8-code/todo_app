"use server";

import { revalidatePath } from "next/cache";
import {
  createTodo as insertTodo,
  deleteTodoById,
  toggleTodoById,
} from "@/lib/todos";

export type AddTodoState = {
  error?: string;
};

export async function addTodo(
  _previousState: AddTodoState,
  formData: FormData,
): Promise<AddTodoState> {
  const rawTitle = formData.get("title");
  if (typeof rawTitle !== "string") {
    return { error: "할 일 제목을 입력해 주세요." };
  }

  const title = rawTitle.trim();
  if (!title) {
    return { error: "할 일 제목을 입력해 주세요." };
  }
  if (title.length > 200) {
    return { error: "제목은 200자 이내로 입력해 주세요." };
  }

  await insertTodo(title);
  revalidatePath("/");
  return {};
}

function getTodoId(formData: FormData): number {
  const rawId = formData.get("id");
  if (typeof rawId !== "string") {
    throw new Error("Todo ID is required.");
  }

  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("Todo ID must be a positive integer.");
  }

  return id;
}

export async function toggleTodo(formData: FormData): Promise<void> {
  await toggleTodoById(getTodoId(formData));
  revalidatePath("/");
}

export async function deleteTodo(formData: FormData): Promise<void> {
  await deleteTodoById(getTodoId(formData));
  revalidatePath("/");
}
