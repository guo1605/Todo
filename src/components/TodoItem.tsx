// TODO: 单个 Todo 行（完成切换 + 删除）
import type { TodoItemProps } from "../types/todo";

export default function TodoItem({ todo, onToggle, onPageJump }: TodoItemProps) {

  return (
    <div style={{ textAlign: "left" }}>
      <input id={String(todo.id)} type="checkbox" checked={todo.completed} onChange={() => { onToggle(todo.id, !todo.completed) }} />
      <label htmlFor={String(todo.id)}>{todo.title}</label>
      <button onClick={() => { onPageJump(todo.id) }}>&gt;</button>
    </div>
  );
}
