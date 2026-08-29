import { useQuery } from "@tanstack/react-query";

import { getTodo } from "../services/todo";

export function useQueryTodo(id: number) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => {
      return getTodo(id);
    },
    staleTime: 1000 * 60 * 5, // 缓存5分钟
  });
}