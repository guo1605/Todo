// Day 7 
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoFormProps {
  onAdd: (title: string) => void;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onPageJump: (id: number) => void;
  // onDelete: (id: number) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onPageJump: (id: number) => void;
  // onToggle: (id: number, completed: boolean) => void;
  // onDelete: (id: number) => void;
}

export interface TodoStatsProps {
  total: number;
  completed: number;
}

export type Action = {
  type: "add";
  payload: Todo;
} | {
  type: "delete";
  payload: Number;
} | {
  type: "toggle";
  payload: number;
} | {
  type: "update";
  payload: {
    id: number;
    title: string;
  }
} | {
  type: "updateTodos",
  payload: Todo[]
}

export interface CreateTodoParams {
  title: string;
}

export interface UpdateTodoParams {
  title?: string;
  completed?: boolean;
}