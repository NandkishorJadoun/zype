/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Navigate } from "react-router";

const AuthPage = lazy(() => import("./pages/Auth.page"));
const UserListPage = lazy(() => import("./pages/UserList.page"));
const UserProfilePage = lazy(() => import("./pages/UserProfile.page"));
const UserPage = lazy(() => import("./pages/User.page"));
const ChatListPage = lazy(() => import("./pages/ChatList.page"));
const ChatPage = lazy(() => import("./pages/Chat.page"));

import { authMiddleware } from "./utils/authMiddleware";
import { deleteChatAction } from "./utils/deleteChatAction";
import { userListLoader } from "./loaders/UserList.loader";
import { userProfileLoader } from "./loaders/UserProfile.loader";
import { userLoader } from "./loaders/User.loader";
import { chatListLoader } from "./loaders/ChatList.loader";
import { chatLoader } from "./loaders/Chat.loader";

const routes = [
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
        children: [
          {
            index: true,
            loader: userListLoader,
            Component: UserListPage,
          },
          {
            path: ":userId",
            loader: userProfileLoader,
            Component: UserProfilePage,
          },
        ],
      },
      {
        path: "chats",
        children: [
          {
            index: true,
            Component: ChatListPage,
            loader: chatListLoader,
            action: deleteChatAction,
          },
          {
            path: ":chatId",
            Component: ChatPage,
            loader: chatLoader,
          },
          {
            path: "user/:userId",
            Component: UserPage,
            loader: userLoader,
          },
        ],
      },
    ],
  },
];

export default routes;
