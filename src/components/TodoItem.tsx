// TODO: 单个 Todo 行（完成切换 + 删除）
import type { TodoItemProps } from "../types/todo";
import { useTodo } from "../context/TodoContext"
import { useNavigate } from "react-router-dom";

export function TodoItem(_props: TodoItemProps) {
  // TODO
  const { todo } = _props;
  // 
  const { toggleTodo } = useTodo();

  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(`${todo.id}`)
  }

  return (
    <div style={{}}>
      <input id='{todo.id}' type="checkbox" checked={todo.completed} onChange={() => { toggleTodo(todo.id, !todo.completed) }} />
      <label htmlFor="{todo.id}"></label>
      {todo.title}
      <button onClick={handleDetail}>&gt;</button>
    </div>
  );
}
