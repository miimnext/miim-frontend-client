"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store"; // 引入 Redux Store
import ThemeProvider from "./ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
