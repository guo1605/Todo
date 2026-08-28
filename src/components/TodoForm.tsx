import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { todoTitleSchema, type TodoFormValues } from "../schemas/todoSchema";
import { useEffect } from "react";

interface TodoFormProps {
  defaultValues?: Partial<TodoFormValues>;
  onSubmit: (values: TodoFormValues) => void;
  onCancel?: () => void;
}

export function TodoForm({
  defaultValues = { title: '' },
  onSubmit,
  onCancel }: TodoFormProps) {
  // TODO: 使用 react-hook-form 和 zod 进行表单验证
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TodoFormValues>({
    resolver: zodResolver(todoTitleSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);
  console.log('----', defaultValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Todo内容</label>
        <input
          type="text"
          id="title"
          {...register("title")}
          placeholder="请输入Todo"
        />

        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <button type="button" onClick={onCancel}>
        取消
      </button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "提交中..." : "添加"}
      </button>
    </form>
  )
}
