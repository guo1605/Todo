import { z } from "zod";

export const todoTitleSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "请输入Todo")
    .max(20, "Todo长度不能超过20个字符")
});

export type TodoFormValues = z.infer<typeof todoTitleSchema>; 