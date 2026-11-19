"use client";

import { useActionState } from "react";
import { addTodo } from "@/app/actions";

export function TodoForm() {
  const [state, formAction, pending] = useActionState(addTodo, {});

  return (
    <form action={formAction} className="todo-form">
      <label className="visually-hidden" htmlFor="todo-title">
        할 일 제목
      </label>
      <input
        autoComplete="off"
        id="todo-title"
        maxLength={200}
        name="title"
        placeholder="새로운 할 일을 입력하세요"
        required
      />
      <button disabled={pending} type="submit">
        {pending ? "추가 중..." : "추가"}
      </button>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
