import { createBrowserRouter } from "react-router-dom";

import { privateRoutes, publicRoutes } from "@/constants/routes";

import { ProtectedRoutes } from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      ...privateRoutes.map(({ path, element: Element }) => ({
        path,
        element: <Element />,
      })),
    ],
  },
  ...publicRoutes.map(({ path, element: Element }) => ({
    path,
    element: <Element />,
  })),
]);
