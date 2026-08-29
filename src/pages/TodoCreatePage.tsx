import { useNavigate } from "react-router-dom";

import { TodoForm } from "../components/TodoForm";
import { useTodoMutation } from "../hooks/useTodoMutation";

export default function TodoCreatePage() {
  const navigate = useNavigate();;

  const { addTodo, isCreateing } = useTodoMutation();

  const handleSubmit = (title: string) => {
    addTodo({ title });
  };

  return (
    <div>
      <h1>新建Todo</h1>
      <TodoForm
        isPending={isCreateing}
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