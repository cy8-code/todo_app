import { Suspense } from "react";
import { connection } from "next/server";
import { deleteTodo, toggleTodo } from "@/app/actions";
import { listTodos } from "@/lib/todos";
import { TodoForm } from "./todo-form";

async function TodoList() {
  await connection();
  const todos = await listTodos();
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      <div className="list-heading">
        <h2>할 일</h2>
        <p aria-live="polite">남은 할 일 {remainingCount}개</p>
      </div>
      {todos.length === 0 ? (
        <p className="empty-state">아직 할 일이 없어요. 새로운 할 일을 추가해 보세요.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              className={`todo-item${todo.completed ? " todo-item-completed" : ""}`}
              key={todo.id}
            >
              <form action={toggleTodo}>
                <input name="id" type="hidden" value={todo.id} />
                <button
                  aria-label={
                    todo.completed
                      ? `${todo.title} 완료 취소`
                      : `${todo.title} 완료 표시`
                  }
                  aria-pressed={todo.completed}
                  className="todo-toggle"
                  type="submit"
                >
                  {todo.completed ? "✓" : ""}
                </button>
              </form>
              <span className="todo-title">{todo.title}</span>
              <form action={deleteTodo}>
                <input name="id" type="hidden" value={todo.id} />
                <button
                  aria-label={`${todo.title} 삭제`}
                  className="todo-delete"
                  type="submit"
                >
                  삭제
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function Home() {
  return (
    <main className="todo-app">
      <header className="page-header">
        <p className="eyebrow">MY TODO LIST</p>
        <h1>할 일 목록</h1>
        <p>해야 할 일을 적고 하나씩 완료해 보세요.</p>
      </header>

      <section aria-label="Todo 목록" className="todo-card">
        <TodoForm />
        <Suspense
          fallback={<p className="loading-state">목록을 불러오는 중...</p>}
        >
          <TodoList />
        </Suspense>
      </section>
    </main>
  );
}
