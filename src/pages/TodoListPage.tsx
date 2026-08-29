import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { useQueryTodos } from "../hooks/useQueryTodos";
import TodoList from "../components/TodoList";

export default function TodoListPage() {
  const navigte = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const { todos, updateTodos } = useTodo();
  // 使用useQuery获取数据
  const { data, isPending, isError, refetch } = useQueryTodos();

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

  // 跳转详情页面
  const onPageJump = (id: number) => {
    navigte(`/todos/${id}`)
  }

  const renderContent = () => {
    if (isPending) return <div>正在加载</div>;
    if (isError) return <div>加载失败，<button onClick={() => { refetch() }}>重试</button></div>;
    if (filteredTodos.length === 0) return <div>暂无Todo</div>;
    return <TodoList todos={filteredTodos} onPageJump={onPageJump} />;
  }

  return (
    <div>
      {renderContent()}
    </div>
  );
}