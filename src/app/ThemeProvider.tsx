"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { initTheme } from "@/store/themeSlice";
import { Theme } from "@/enum/common";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch, theme]);

  useEffect(() => {
    document.documentElement.classList.remove(
      Theme.Light,
      Theme.Dark,
      Theme.System
    );
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
