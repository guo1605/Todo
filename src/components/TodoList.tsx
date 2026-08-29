// TODO: 列表渲染（map + key），下传 onToggle/onDelete
import type { TodoListProps } from "../types/todo";
import TodoItem from "./TodoItem";

import { useTodoMutation } from "../hooks/useTodoMutation";

export default function TodoList({ todos, onPageJump }: TodoListProps) {
  const { updateTodo } = useTodoMutation();

  const onToggle = (id: number, completed: boolean) => {
    console.log('-----', id, completed);
    updateTodo({ id, data: { completed } });
  };

  return (
    <div>
      {/* {todos.map(item => <TodoItem key={item.id} todo={item} onDelete={onDelete} onToggle={onToggle} />)} */}
      {todos.map(item => <TodoItem key={item.id} todo={item} onToggle={onToggle} onPageJump={onPageJump} />)}
    </div>
  );
}
