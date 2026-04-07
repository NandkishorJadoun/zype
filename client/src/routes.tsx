import { AuthPage } from "./pages/AuthPage";
import { UserListPage } from "./pages/UserListPage";

export const routes = [
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/users",
    Component: UserListPage,
  },
];
