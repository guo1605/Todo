import { useEffect, useMemo } from "react";
import { TodoList } from "../components/TodoList";
import { useTodo } from "../context/TodoContext";
import { getTodos } from "../services/todo";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function TodoListPage() {
  const { todos, updateTodos } = useTodo();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  // 使用useQuery获取数据
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 1000 * 60 * 5, // 缓存5分钟
  });

  useEffect(() => {
    if (data) {
      updateTodos(data);
    }
  }, [data]);

  // 使用useMemo替代本地状态+过滤Effect
  const filteredTodos = useMemo(() => {
    if (status === 'completed') return todos.filter(t => t.completed === true);
    if (status === 'active') return todos.filter(t => t.completed === false);
    // 其他情况都返回todos
    return todos;
  }, [todos, status]);

  const renderContent = () => {
    if (isPending) return <div>正在加载</div>;
    if (isError) return <div>加载失败，<button onClick={() => { refetch() }}>重试</button></div>;
    if (filteredTodos.length === 0) return <div>暂无Todo</div>;
    return <TodoList todos={filteredTodos} />;
  }

  return (
    <div>
      {renderContent()}
    </div>
  );
}