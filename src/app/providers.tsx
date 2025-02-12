"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store"; // 引入 Redux Store
import { initializeAuth } from "@/store/authSlice";
import { connectWebSocket } from "@/utils/websocket";
import { usePathname } from "@/i18n/routing";
import { openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
interface ProvidersProps {
  children: ReactNode;
  token: string | undefined;
}
export default function Providers({ children, token }: ProvidersProps) {
  connectWebSocket();
  const pathname = usePathname();
  useEffect(() => {
    store.dispatch(initializeAuth(token));
    if (pathname == "/chat") {
      openPersistentModal(ModalEnum.LoginModal);
    }
  }, [pathname, token]);
  return <Provider store={store}>{children}</Provider>;
}
