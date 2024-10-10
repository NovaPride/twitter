import { SignupPage } from "@/pages/signup-page/signup-page";
import { LoginPage } from "@/pages/login-page/login-page";
import { AuthPage } from "@/pages/auth-page/auth-page";
import { FeedPage } from "@/pages/feed-page/feed-page";
import { MessagesPage } from "@/pages/messages-page/messages-page";
import { BookmarksPage } from "@/pages/bookmarks-page/bookmarks-page";
import { ProfilePage } from "@/pages/profile-page/profile-page";
import { PostPage } from "@/pages/post-page/post-page";

export enum ROUTES {
  SIGNUP = "/signup",
  LOGIN = "/login",
  AUTH = "/auth",
  ALL = "*",
  HOME = "/",
  MESSAGES = "/messages",
  BOOKMARKS = "/bookmarks",
  PROFILE = "/profile",
  POST = "/post",
}

export const publicRoutes = [
  {
    path: ROUTES.SIGNUP,
    element: SignupPage,
  },
  {
    path: ROUTES.LOGIN,
    element: LoginPage,
  },
  {
    path: ROUTES.AUTH,
    element: AuthPage,
  },
  {
    path: ROUTES.ALL,
    element: AuthPage,
  },
];

export const privateRoutes = [
  {
    path: ROUTES.HOME,
    element: FeedPage,
  },
  {
    path: ROUTES.MESSAGES,
    element: MessagesPage,
  },
  {
    path: ROUTES.BOOKMARKS,
    element: BookmarksPage,
  },
  {
    path: ROUTES.PROFILE,
    element: ProfilePage,
  },
  {
    path: ROUTES.POST + "/:id",
    element: PostPage,
  },
];
