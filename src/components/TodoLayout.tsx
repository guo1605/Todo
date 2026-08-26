import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function TodoLayout() {
  const navigate = useNavigate();

  return (
    <div className="todo-layout">
      {/* 顶部导航 */}
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
      <div className="todo-body">
        {/* 侧边栏 */}
        <aside className="todo-sidebar">
          <nav className="todo-nav">
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

        {/* 页面内容 */}
        <main className="todo-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}