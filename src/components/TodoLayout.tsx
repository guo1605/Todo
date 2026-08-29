import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUIStore } from "../stores/UIStore";

export default function TodoLayout() {
  const navigate = useNavigate();
  // const [isUnfold, setIsUnfold] = useState(true);
  const { sidebarOpen } = useUIStore();
  const toggleSidebar = useUIStore(state => state.toggleSidebar);

  return (
    <div className="todo-layout">
      {/* 左部导航 */}
      <header className="todo-header">
        <div className="todo-header__inner">
          <button
            type="button"
            className="todo-logo"
            onClick={() => navigate("/todos")}
          >
            Todo App
          </button>

          <button
            type="button"
            className="todo-create-button"
            onClick={() => navigate("/todos/new")}
          >
            + 新建 Todo
          </button>
        </div>
      </header>

      {/* 主体 */}
      <div className="todo-body" style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "20px" }}>
        {/* 侧边栏 */}
        <aside className="todo-sidebar" style={{ display: sidebarOpen ? "block" : "none" }}>
          <nav className="todo-nav" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <NavLink
              to="/todos"
              end
              className={({ isActive }) =>
                `todo-nav__item ${isActive ? "active" : ""}`
              }
            >
              <span>📋</span>
              <span>全部 Todo</span>
            </NavLink>

            <NavLink
              to="/todos?status=active"
              className="todo-nav__item"
            >
              <span>○</span>
              <span>未完成</span>
            </NavLink>

            <NavLink
              to="/todos?status=completed"
              className="todo-nav__item"
            >
              <span>✓</span>
              <span>已完成</span>
            </NavLink>
          </nav>
        </aside>
        <button onClick={() => toggleSidebar()} style={{ width: "30px", height: "100px" }}>
          {sidebarOpen ? "收起" : "展开"}导航
        </button>
        {/* 页面内容 */}
        <main className="todo-main">
          <Outlet />
        </main>
      </div>
    </div >
  );
}