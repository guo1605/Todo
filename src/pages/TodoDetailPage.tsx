import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo_s, getTodo } from "../services/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 使用useQuery获取数据
  const { data: todo, isPending, isError, error, refetch } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => {
      if (!id) throw new Error("ID 缺失");
      return getTodo(Number(id));
    },
    // staleTime: 1000 * 60 * 5, // 缓存5分钟
    enabled: !!id, // 只有当id存在时才执行查询
  });

  if (isError) {
    console.error("获取Todo详情失败:", error);
  };

  // 使用useMutation处理删除操作 
  const mutation = useMutation({
    mutationFn: deleteTodo_s,
    onSuccess: () => {
      // 在成功删除Todo后，刷新Todo列表数据
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate(`/todos`);
    },
    onError: (err: Error) => {
      console.error("删除失败:", err);
    }
  });

  const handleDelete = async () => {
    if (!todo) return;
    if (!window.confirm(`确定要删除 "${todo.title}" 吗？`)) return;

    mutation.mutate(Number(id));
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
        <button onClick={handleEdit} disabled={mutation.isPending}>
          编辑
        </button>
        <button onClick={handleDelete} disabled={mutation.isPending}>
          {mutation.isPending ? "删除中..." : "删除"}
        </button>
      </footer>
    </div>
  );
}