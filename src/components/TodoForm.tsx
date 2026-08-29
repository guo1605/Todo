import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { todoTitleSchema, type TodoFormValues } from "../schemas/todoSchema";
import { useEffect, useRef } from "react";

interface TodoFormProps {
  defaultValues?: Partial<TodoFormValues>;
  isPending: boolean;
  onSubmit: (values: TodoFormValues) => void;
  onCancel?: () => void;
}

export function TodoForm({
  defaultValues = { title: '' },
  onSubmit,
  onCancel,
  isPending
}: TodoFormProps) {
  // TODO: 使用 react-hook-form 和 zod 进行表单验证
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TodoFormValues>({
    resolver: zodResolver(todoTitleSchema),
    defaultValues,
  });

  // ✅ 关键：标记是否是首次渲染（跳过首次 reset，因为 useForm 已经初始化了）
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 跳过首次渲染
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (defaultValues.title?.length !== 0) {
      reset(defaultValues);
    }

  }, [defaultValues]);

  const handleClick = () => {
    console.log('++++++', isSubmitting || isPending);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Todo内容</label>
        <input
          type="text"
          id="title"
          {...register("title")}
          placeholder="请输入Todo"
          disabled={isSubmitting || isPending}
        />

        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <button type="button" onClick={onCancel} disabled={isSubmitting || isPending}>
        取消
      </button>
      <button type="submit" disabled={isSubmitting || isPending} onClick={handleClick}>
        {isPending ? "提交中..." : "添加"}
      </button>
    </form>
  )
}
