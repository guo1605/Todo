import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/todo";

export function useQueryTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 1000 * 60 * 5,// 缓存5分钟
  });
}