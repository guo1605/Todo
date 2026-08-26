// TODO: 受控表单组件
// 练习：useState 管理输入值 + onChange 受控 + 表单 onSubmit 调 onAdd
import type { TodoFormProps } from "../types/todo";
import { useState, useRef } from "react"

export function TodoForm(_props: TodoFormProps) {
  // TODO
  const [value, setValue] = useState('');
  const { onAdd } = _props;

  return (
    <div>
      <input type="text" onChange={(e) => { setValue(e.target.value); }} value={value} />
      <button onClick={() => { onAdd(value); if (value.trim() !== '') { setValue('') } }}>添加</button>
    </div>
  )
}
