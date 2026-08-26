import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoStats } from "./components/TodoStats";
import type { Todo, Action } from "./types/todo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { todoReducer } from "./reducer/todoReducer";
import { useTodo } from "./context/TodoContext";

export default function App() {

  // const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  // const [todos, disptch] = useLocalStorage<Todo[], Action>(todoReducer, 'todos', []);

  const { todos, addTodo: onAdd, toggleTodo: onToggle, deleteTodo: onDelete } = useTodo();

  // const onAdd = (title: string) => {
  //   title = title.trim();
  //   if (title === '') return;
  //   const id = Date.now();
  //   const completed = false;

  //   const newTodo = {
  //     id,
  //     title,
  //     completed
  //   };

  //   // setTodos((prev: Todo[]) => [newTodo, ...prev]);
  //   disptch({ type: 'add', payload: newTodo });
  // };

  // const onToggle = (id: number) => {
  //   // setTodos(prev => prev.map(item =>
  //   //   item.id === id ? { ...item, completed: !item.completed } : item));
  //   disptch({ type: 'toggle', payload: id });
  // }

  // const onDelete = (id: number) => {
  //   // setTodos(prev => prev.filter(item => item.id !== id));
  //   disptch({ type: 'delete', payload: id });
  // }

  console.log('-----', useTodo());


  return (
    <div>
      <TodoForm onAdd={onAdd} />
      <TodoList todos={todos} onDelete={onDelete} onToggle={onToggle} />
      <TodoStats total={todos.length} completed={todos.filter(item => item.completed).length} />
    </div>
  );
}
