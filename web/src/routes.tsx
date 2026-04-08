import { AuthPage } from "./pages/AuthPage";
import { UserListPage } from "./pages/UsersListPage";

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
