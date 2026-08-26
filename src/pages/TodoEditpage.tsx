import { useEffect, useState } from "react";
import { getTodo } from "../services/todo";
import type { Todo } from "../types/todo";
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../context/TodoContext";

export default function TodoEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateTodo } = useTodo();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取数据
  useEffect(() => {
    const fetchTodo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTodo(Number(id))
        setTodo(data);
        setNewTitle(data.title);
      } catch (error) {
        console.error("获取Todo失败:", error);
        setError("加载失败，请重试");
        setTodo(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id]);


  const handleUpdate = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setError("请输入Todo内容");
      return;
    }
    if (todo && trimmed === todo.title) {
      // 标题未变，直接返回列表或给出提示
      navigate("/todos");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await updateTodo(Number(id), trimmed)
      navigate('/');

    } catch (err) {
      console.error("更新失败:", err);
      setError("保存失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  }

  // 取消
  const handleCancal = () => {
    navigate(-1);
  };

  // 渲染加载状态
  if (isLoading) {
    return <div>加载中...</div>;
  }

  // 渲染错误状态（可提供重试按钮）
  if (error && !todo) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>重试</button>
      </div>
    );
  }

  return (
    <div>
      <h1>编辑Todo</h1>
      <div>
        <label>
          Todo内容
          <input type="text" value={newTitle}
            onChange={(e) => { setNewTitle(e.target.value); }}
            disabled={isSubmitting}
            placeholder="请输入Todo内容"
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <footer>
        <button onClick={handleCancal} disabled={isSubmitting}>
          取消
        </button>
        <button onClick={handleUpdate} disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存修改"}
        </button>
      </footer>
    </div>
  );
}