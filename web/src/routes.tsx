import { Navigate } from "react-router";

import { AuthPage } from "./pages/AuthPage";
import { authMiddleware } from "./utils/authMiddleware";

import { UserListPage } from "./pages/UserListPage";
import { userListLoader } from "./loaders/UserList.loader";

import { UserProfilePage } from "./pages/UserProfilePage";
import { userProfileLoader } from "./loaders/UserProfile.loader";

import { userLoader } from "./loaders/User.loader";
import { UserPage } from "./pages/UserPage";

import { chatListLoader } from "./loaders/ChatList.loader";
import { ChatListPage } from "./pages/ChatListPage";
import { chatLoader } from "./loaders/Chat.loader";
import { ChatPage } from "./pages/ChatPage";
import { deleteChatAction } from "./utils/deleteChatAction";

export const routes = [
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    middleware: [authMiddleware],
    HydrateFallback: () => <p>LOADING...</p>,
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
