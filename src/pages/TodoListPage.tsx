import { useEffect, useMemo, useState } from "react";
import { TodoList } from "../components/TodoList";
import { useTodo } from "../context/TodoContext";
import { getTodos } from "../services/todo";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function TodoListPage() {
  const { todos, updateTodos } = useTodo();
  const [isLoading, setIsLoading] = useState(true);
  const [isSucceed, setIsSucceed] = useState(true);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    const fetchTodos = async () => {
      // 改变状态
      setIsLoading(true);
      setIsSucceed(true);
      try {
        // 获取
        const res = await getTodos();
        updateTodos(res);
      } catch (error) {
        console.error('error', error);
        setIsSucceed(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [])
  // 使用useQuery获取数据
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  });
  console.log('----', data);


  // useEffect(() => {
  //   if (status === null) {
  //     setCurrTodos(todos);
  //   } else {
  //     const isCompleted = status === 'completed';
  //     const newTodos = todos.filter(item => item.completed === isCompleted);
  //     setCurrTodos(newTodos);
  //   }
  // }, [status, todos]);
  // 使用useMemo替代本地状态+过滤Effect
  const filteredTodos = useMemo(() => {
    if (status === 'completed') return todos.filter(t => t.completed === true);
    if (status === 'active') return todos.filter(t => t.completed === false);
    // 其他情况都返回todos
    return todos;
  }, [todos, status]);

  //重试函数 
  const refetch = () => {
    // 可直接重新触发 effect，或将 fetch 逻辑提取为函数再调用
    // 这里简单重新加载页面或再次调用 getTodos，但推荐将 fetch 逻辑提取
    window.location.reload();
  };

  const renderContent = () => {
    if (isLoading) return <div>正在加载</div>;
    if (!isSucceed) return <div>加载失败，<button onClick={refetch}>重试</button></div>;
    if (filteredTodos.length === 0) return <div>暂无Todo</div>;
    return <TodoList todos={filteredTodos} />;
  }

  return (
    <div>
      {renderContent()}
    </div>
  );
}