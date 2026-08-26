import type { CreateTodoParams, Todo, UpdateTodoParams } from "../types/todo";

const BASE_URL = "http://localhost:3000/api/todos";

async function handleFetch(url: string, RequestInit: RequestInit, errorInfo: string) {
  const res = await fetch(url, RequestInit);
  if (res.ok) {
    throw new Error(errorInfo);
  }

  return res.json();
}
// 获取所有Todo
export async function getTodos(): Promise<Todo[]> {

  let res = await fetch(BASE_URL);
  console.log(res);
  if (!res.ok) {
    throw new Error("获取Todo失败");
  }

  return res.json();
}

// 获取Todo
export async function getTodo(id: number): Promise<Todo> {
  let res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("获取Todo失败");
  }

  return res.json();
};
// 新增Todo
export async function createtTodo(data: CreateTodoParams) {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('创建Todo失败');

  return res.json();
};

// 修改Todo
export async function updateTodo_s(id: number, data: UpdateTodoParams) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('更新Todo失败');

  return res.json();
};

// 删除状态
export async function deleteTodo_s(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });

  console.log(res);
  if (!res.ok) throw new Error('删除Todo失败');
};