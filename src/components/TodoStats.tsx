// TODO: 统计总数量 / 已完成数量
import type { TodoStatsProps } from "../types/todo";

export function TodoStats(_props: TodoStatsProps) {
  // TODO
  const { total, completed} = _props;

  return (
    <div>
      总数：{total}<br/>
      已完成：{completed}<br/>
    </div>
  );
}
