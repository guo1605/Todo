import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TodoLayout from "../components/TodoLayout";
import TodoListPage from "../pages/TodoListPage";
import TodoCreatePage from "../pages/TodoCreatePage";
import TodoDetailPage from "../pages/TodoDetailPage";
import TodoEditPage from "../pages/TodoEditpage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      {/* 根路由 */}
      <Route
        path="/"
        element={<Navigate to="/todos" replace />}
      />

      {/* 父路由 */}
      <Route path="/todos" element={<TodoLayout />}>
        {/* 子路由 */}
        <Route index element={<TodoListPage />} />

        <Route
          path="new"
          element={<TodoCreatePage />}
        />

        <Route
          path=":id"
          element={<TodoDetailPage />}
        />

        <Route
          path=":id/edit"
          element={<TodoEditPage />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default AppRouter;