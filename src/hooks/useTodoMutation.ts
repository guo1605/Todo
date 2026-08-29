import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createtTodo, updateTodo_s, deleteTodo_s } from "../services/todo";
import type { UpdateTodoParams } from "../types/todo";

export function useTodoMutation() {
  const queruClient = useQueryClient();
  const navigation = useNavigate();

  const handleSuccess = async () => {
    // queruClient.invalidateQueries({
    //   queryKey: ["todos"]
    // });
    await queruClient.refetchQueries({ // 强制等待数据返回
      queryKey: ["todos"]
    });
    navigation("/todos");
  };
  const handleError = (context: string) => {
    return (err: Error) => {
      console.error(context, err);
    }
  };

  // 新增
  const createTodoMutation = useMutation({
    mutationFn: createtTodo,
    onSuccess: handleSuccess,
    onError: handleError("创建失败：")
  });

  // 修改
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: UpdateTodoParams }) => {
      return updateTodo_s(id, data);
    },
    onSuccess: handleSuccess,
    onError: handleError("修改失败：")
  });

  // 删除
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo_s,
    onSuccess: handleSuccess,
    onError: handleError("删除失败：")
  });

  return {
    // 方法
    addTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,

    // 状态
    isCreateing: createTodoMutation.isPending,
    isUpdateing: updateTodoMutation.isPending,
    isDeteleing: deleteTodoMutation.isPending,
  };
};