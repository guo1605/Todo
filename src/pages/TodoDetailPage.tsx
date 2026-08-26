import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo } from "../services/todo";
import type { Todo } from "../types/todo";
import { useTodo } from "../context/TodoContext";

export default function TodoDetailPages() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { deleteTodo } = useTodo();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 获取数据
  useEffect(() => {
    const fecthTodo = async () => {
      if (!id) {
        setError("ID 缺失");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTodo(Number(id));
        setTodo(data);

      } catch (error) {
        console.error("获取Todo详情失败:", error);
        setError("加载失败，请重试");
        setTodo(null);
      } finally {
        setIsLoading(false);
      }
    };

    fecthTodo();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTodo(Number(id));
      navigate(`/todos`);
    } catch (err) {
      console.error("删除失败:", err);
      alert("删除失败，请重试"); // 可替换为 Toast
      setIsDeleting(false);
    };
  };

  const handleEdit = () => {
    navigate(`/todos/${id}/edit`);
  };

  // 加载中
  if (isLoading) {
    return <div>加载中...</div>;
  }

  // 错误或数据不存在
  if (error || !todo) {
    return (
      <div>
        <p style={{ color: "red" }}>{error || "未找到该Todo"}</p>
        <button onClick={() => navigate("/todos")}>返回列表</button>
        {error && <button onClick={() => window.location.reload()}>重试</button>}
      </div>
    );
  }

  return (
    <div>
      <h1>Todo详情</h1>
      <main>
        <p>标题：{todo.title}</p>
        <p>状态：{todo.completed ? "已完成" : "进行中"}</p>
      </main>
      <footer>
        <button onClick={handleEdit} disabled={isDeleting}>
          编辑
        </button>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "删除中..." : "删除"}
        </button>
      </footer>
    </div>
  );
}