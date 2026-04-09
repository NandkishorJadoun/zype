import { Navigate } from "react-router";

import { AuthPage } from "./pages/AuthPage";
import { authMiddleware } from "./utils/authMiddleware";

import { UserListPage } from "./pages/UserListPage";
import { userListLoader } from "./loaders/UserList.loader";

import { chatListLoader } from "./loaders/ChatList.loader";
import { ChatListPage } from "./pages/ChatListPage";

export const routes = [
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    middleware: [authMiddleware],
    children: [
      {
        index: true,
        element: <Navigate to="/chats" replace />,
      },
      {
        path: "users",
        Component: UserListPage,
        loader: userListLoader,
      },
      {
        path: "chats",
        Component: ChatListPage,
        loader: chatListLoader,
      },
    ],
  },
];
