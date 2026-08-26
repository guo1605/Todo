// TODO: 列表渲染（map + key），下传 onToggle/onDelete
import type { TodoListProps } from "../types/todo";
import { TodoItem } from "./TodoItem";

export function TodoList(_props: TodoListProps) {
  // TODO
  // const { todos, onDelete, onToggle } = _props;
  // 引入 Context
  const { todos } = _props;

  return (
    <div>
      {/* {todos.map(item => <TodoItem key={item.id} todo={item} onDelete={onDelete} onToggle={onToggle} />)} */}
      {todos.map(item => <TodoItem key={item.id} todo={item} />)}
    </div>
  );
}
