import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/TodoContext";

export default function TodoCreatePage() {

  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { addTodo } = useTodo();

  const handleSubmit = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError('请输入Todo内容');
      return;
    }
    setError(null);
    try {
      await addTodo(title)
      navigate(`/todos`);
    } catch (error) {
      console.error("创建失败:", error);
      setError("创建失败，请重试");
    } finally {
      setIsSubmitting(false);
    };
  };

  return (
    <div>
      <h1>新建Todo</h1>
      <div>
        <label>
          Todo内容
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入Todo内容"
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <footer>
        <button onClick={() => { navigate(-1); }} disabled={isSubmitting}>取消</button>
        <button onClick={handleSubmit}>
          {isSubmitting ? "创建中..." : '创建Todo'}
        </button>
      </footer>
    </div>
  );
}