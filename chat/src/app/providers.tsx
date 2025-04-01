"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store"; // 引入 Redux Store
import { usePathname } from "@/i18n/routing";
import { openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
import UserInit from "@/hooks/useUserInit";
interface ProvidersProps {
  children: ReactNode;
  token: string | undefined;
}
export default function Providers({ children, token }: ProvidersProps) {
  const pathname = usePathname();
  useEffect(() => {
    UserInit(token);
  }, [token]);
  useEffect(() => {
    if (pathname == "/chat") {
      openPersistentModal(ModalEnum.LoginModal);
    }
  }, [pathname]);
  return <Provider store={store}>{children}</Provider>;
}
