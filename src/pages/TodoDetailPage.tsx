import { useNavigate, useParams } from "react-router-dom";

import { useQueryTodo } from "../hooks/useQueryTodo";
import { useTodoMutation } from "../hooks/useTodoMutation";

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { deleteTodo, isDeteleing } = useTodoMutation();
  // 使用useQuery获取数据
  const { data: todo, isPending, isError, error, refetch } = useQueryTodo(Number(id));
  if (isError) {
    console.error("获取Todo详情失败:", error);
  };

  const handleDelete = async () => {
    if (!todo) return;
    if (!window.confirm(`确定要删除 "${todo.title}" 吗？`)) return;

    deleteTodo(Number(id));
  };

  const handleEdit = () => {
    navigate(`/todos/${id}/edit`);
  };

  // 加载中
  if (isPending) {
    return <div>加载中...</div>;
  }

  // 错误或数据不存在
  if (isError || !todo) {
    return (
      <div>
        <p style={{ color: "red" }}>{error?.message || "未找到该Todo"}</p>
        <button onClick={() => navigate("/todos")}>返回列表</button>
        {isError && <button onClick={() => refetch()}>重试</button>}
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
        <button onClick={handleEdit} disabled={isDeteleing}>
          编辑
        </button>
        <button onClick={handleDelete} disabled={isDeteleing}>
          {isDeteleing ? "删除中..." : "删除"}
        </button>
      </footer>
    </div>
  );
}