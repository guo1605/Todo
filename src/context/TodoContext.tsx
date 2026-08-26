import { createContext, useContext, type ReactNode } from "react";
import { todoReducer } from "../reducer/todoReducer";
import type { Action, Todo } from "../types/todo";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createtTodo, deleteTodo_s, updateTodo_s } from "../services/todo";

interface TodoContextValue {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => Promise<void>;
  updateTodos: (todos: Todo[]) => void;
}

interface TodoProviderProps {
  children: ReactNode
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

const initialTodos: Todo[] = [];

export function TodoProvider({ children }: TodoProviderProps) {
  // const [todos, disptch] = useReducer(todoReducer, initialTodos);
  const [todos, disptch] = useLocalStorage<Todo[], Action>(todoReducer, 'todos', initialTodos);

  const updateTodos = async (todos: Todo[]) => {
    // 更新本地数据
    disptch({
      type: 'updateTodos',
      payload: todos
    });

  };

  const addTodo = async (title: string) => {
    title = title.trim();
    if (title === '') return;

    let res = await createtTodo({ title });
    console.log(res);
    disptch({
      type: 'add',
      payload: res
    });
    // 失败处理
  };

  const toggleTodo = (id: number, completed: boolean) => {
    // if (completed === undefined) return;

    updateTodo_s(id, { completed });

    disptch({
      type: 'toggle',
      payload: id
    });
  };

  const deleteTodo = (id: number) => {
    deleteTodo_s(id).then(() => {
      disptch({
        type: 'delete',
        payload: id
      });
    });
  };

  const updateTodo = async (id: number, title: string) => {

    await updateTodo_s(id, { title });

    disptch({
      type: 'update',
      payload: {
        id,
        title,
      }
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        updateTodos
      }} >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) throw new Error("useTodo必须在TodoProvider内部使用");

  return context;
}