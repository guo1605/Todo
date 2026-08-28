// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TodoForm } from "../components/TodoForm";

export default function TodoCreatePage() {
  // const [title, setTitle] = useState('');
  // const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { addTodo } = useTodo();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // 在成功创建Todo后，刷新Todo列表数据
      queryClient.invalidateQueries({
        queryKey: ["todos"]
      });
      // 跳转回Todo列表页
      navigate(`/todos`);
    },
    // 处理创建失败的情况
    onError: (error: Error) => {
      console.error("创建失败:", error);
      // setError("创建失败，请重试");
    },
  });

  const handleSubmit = (title: string) => {
    // const trimmed = title.trim();
    // if (!trimmed) {
    //   setError('请输入Todo内容');
    //   return;
    // }

    // setError(null);
    mutation.mutate(title);
  };

  return (
    <div>
      <h1>新建Todo</h1>
      <TodoForm
        // defaultValues={{ title: '' }}
        onSubmit={({ title }) => { handleSubmit(title); }}
        onCancel={() => {
          navigate(-1);
        }}
      />
      {/* <div>
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
        <button onClick={() => { navigate(-1); }} disabled={mutation.isPending}>取消</button>
        <button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? "创建中..." : '创建Todo'}
        </button>
      </footer> */}
    </div>
  );
}