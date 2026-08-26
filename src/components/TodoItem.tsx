// TODO: 单个 Todo 行（完成切换 + 删除）
import type { Todo, TodoItemProps } from "../types/todo";
import { useTodo } from "../context/TodoContext"
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export function TodoItem(_props: TodoItemProps) {
  const { todo } = _props;
  const { toggleTodo } = useTodo();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (todo: Todo) => {
      toggleTodo(todo.id, !todo.completed);
    },
    // onSuccess: () => {
    //   // 成功后刷新数据
    //   queryClient.invalidateQueries({ queryKey: ['todos'] });
    // }
  });

  const handleDetail = () => {
    navigate(`${todo.id}`)
  }

  return (
    <div style={{}}>
      <input id='{todo.id}' type="checkbox" checked={todo.completed} onChange={() => { mutation.mutate(todo) }} />
      <label htmlFor="{todo.id}"></label>
      {todo.title}
      <button onClick={handleDetail}>&gt;</button>
    </div>
  );
}
