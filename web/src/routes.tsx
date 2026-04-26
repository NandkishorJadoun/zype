/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
const AuthPage = lazy(() => import("./pages/Auth.page"));
const UserProfilePage = lazy(() => import("./pages/UserProfile.page"));
const UserPage = lazy(() => import("./pages/User.page"));
const AppLayout = lazy(() => import("./layouts/App.layout"));
const ChatListPage = lazy(() => import("./pages/ChatList.page"));
const ChatPage = lazy(() => import("./pages/Chat.page"));

import { authMiddleware } from "./utils/authMiddleware";

import { userProfileLoader } from "./loaders/UserProfile.loader";
import { userLoader } from "./loaders/User.loader";
import { appLoader } from "./loaders/App.loader";
import { chatLoader } from "./loaders/Chat.loader";

import { deleteChatAction } from "./actions/deleteChatAction";
import { createChatAction } from "./actions/createChatAction";
import { sendMessageAction } from "./actions/sendMessageAction";

const routes = [
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    Component: AppLayout,
    loader: appLoader,
    action: deleteChatAction,
    middleware: [authMiddleware],
    children: [
      {
        index: true,
        Component: ChatListPage,
      },
      {
        path: "chats/:chatId",
        Component: ChatPage,
        loader: chatLoader,
        action: sendMessageAction,
      },
      {
        path: "chats/user/:userId",
        Component: UserPage,
        loader: userLoader,
        action: createChatAction,
      },
      {
        path: "users/:userId",
        loader: userProfileLoader,
        Component: UserProfilePage,
      },
    ],
  },
];

export default routes;
