
import type { Todo, Action } from "../types/todo";

export function todoReducer(state: Todo[], action: Action): Todo[] {
  console.log('todoReducer  ', action);
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter(item => item.id !== action.payload);

    case "toggle":
      return state.map(item =>
        item.id === action.payload ? { ...item, completed: !item.completed } : item);

    case "update":
      return state.map(item =>
        item.id === action.payload.id ? { ...item, title: action.payload.title } : item);

    case "updateTodos":
      return [...action.payload];
  }
}