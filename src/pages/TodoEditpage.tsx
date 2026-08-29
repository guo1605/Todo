import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQueryTodo } from "../hooks/useQueryTodo";
import { useTodoMutation } from "../hooks/useTodoMutation";
import { TodoForm } from "../components/TodoForm";

export default function TodoEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { updateTodo, isUpdateing } = useTodoMutation();
  const [newTitle, setNewTitle] = useState<string>('');

  // 使用useQuery获取数据
  const { data: todo, isPending, isError, error, refetch } = useQueryTodo(Number(id));

  useEffect(() => {
    if (todo) {
      setNewTitle(todo.title);
    }
  }, [todo]);

  if (isError) {
    console.error("获取Todo失败:", error);
  }

  const handleUpdate = async (title: string) => {

    updateTodo({ id: Number(id), data: { title } });
  }

  // 取消
  const handleCancal = () => {
    navigate(-1);
  };

  // 渲染加载状态
  if (isPending) {
    return <div>加载中...</div>;
  }

  // 渲染错误状态（可提供重试按钮）
  if (isError) {
    return (
      <div>
        <p style={{ color: "red" }}>
          {error instanceof Error ? error.message : "加载失败，请重试"}
        </p>
        <button onClick={() => refetch()}>重试</button>
      </div>
    );
  }

  return (
    <div>
      <h1>编辑Todo</h1>
      <TodoForm
        defaultValues={{ title: newTitle }}
        isPending={isUpdateing}
        onSubmit={({ title }) => {
          handleUpdate(title);
        }}
        onCancel={handleCancal}
      />
      {/* <div>
        <label>
          Todo内容
          <input type="text" value={newTitle}
            onChange={handleChange}
            disabled={mutation.isPending}
            placeholder="请输入Todo内容"
          />
        </label>
        {errorInfo && <p style={{ color: "red" }}>{errorInfo}</p>}
      </div>
      <footer>
        <button onClick={handleCancal} disabled={mutation.isPending}>
          取消
        </button>
        <button onClick={handleUpdate} disabled={mutation.isPending}>
          {mutation.isPending ? "保存中..." : "保存修改"}
        </button>
      </footer> */}
    </div>
  );
}