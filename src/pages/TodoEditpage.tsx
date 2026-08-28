import { useEffect, useState } from "react";
import { getTodo, updateTodo_s } from "../services/todo";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TodoForm } from "../components/TodoForm";

export default function TodoEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [newTitle, setNewTitle] = useState<string>('');
  // const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // 使用useQuery获取数据
  const { data: todo, isPending, isError, error, refetch } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => {
      if (!id) throw new Error("ID 缺失");
      return getTodo(Number(id));
    },
    enabled: !!id, // 只有当id存在时才执行查询
  });

  useEffect(() => {
    if (todo) {
      setNewTitle(todo.title);
    }
  }, [todo]);

  if (isError) {
    console.error("获取Todo失败:", error);
  }

  // 使用useMutation处理保存操作
  const mutation = useMutation({
    mutationFn: ({ id, title }: { id: number, title: string }) => {
      return updateTodo_s(id, { title });
    },
    onSuccess: () => {
      // 在成功更新Todo后，刷新Todo列表数据
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate(`/todos`);
    },
    onError: (err: Error) => {
      console.error("更新失败:", err);
      // setErrorInfo("保存失败，请重试");
    }
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTitle(e.target.value);
  //   if (errorInfo) {
  //     setErrorInfo(null);
  //   }
  // }

  const handleUpdate = async (title: string) => {
    // const trimmed = newTitle.trim();
    // if (!trimmed) {
    //   setErrorInfo("请输入Todo内容");
    //   return;
    // }
    // if (todo && trimmed === todo.title) {
    //   // 标题未变，直接返回列表或给出提示
    //   navigate("/todos");
    //   return;
    // }

    // setErrorInfo(null);
    mutation.mutate({ id: Number(id), title: title });
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