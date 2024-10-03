import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { useAppSelector } from "@/hooks/redux";
import { getThemeSelector } from "@/redux/selectors/theme-selectors";
import { GlobalStyle } from "@/styles/global";
import { themeBase } from "@/styles/theme";

import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

export function App() {
  const theme = useAppSelector(getThemeSelector);

  useEffect(() => {
    document.querySelector(":root")!.className = theme.toString();
  }, [theme]);

  return (
    <ThemeProvider theme={themeBase}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}
