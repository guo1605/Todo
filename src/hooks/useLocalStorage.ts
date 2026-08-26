
import React, { useEffect, useReducer, useState } from "react";

// export function useLocalStorage<T>(
//   key: string, 
//   initValue: T 
// ): [T, (value: T | ((prev: T) => T)) => void] {
//   // 
//   const [value,setValue] = useState<T>(() => {
//     try{
//       const raw = localStorage.getItem(key);
//       return raw ? JSON.parse(raw) : initValue;
//     }catch{
//       return initValue;
//     }
//   });

//   // 
//   useEffect(()=>{
//     localStorage.setItem(key,JSON.stringify(value));
//   },[key,value])

//   return [value, setValue];
// }

// 结合reducer
export function useLocalStorage<T, A>(
  reducer: (state: T,action: A) => T,
  key: string,
  defaultValue: T
): [T,React.Dispatch<A>]{
  // 惰性读取
  const init = () => {
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    }catch{
      return defaultValue;
    }
  }

  // 用useReducer管理状态
  const [state, dispatch] = useReducer(reducer, init());

  // 自动存盘
  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(state));
  },[state]);

  return [state, dispatch]
}