import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { openPersistentModal } from "../store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";

const useLinkInterceptor = (href: string) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return (e: React.MouseEvent) => {
    if (!isLogin) {
      e.preventDefault(); // 阻止默认行为
      dispatch(openPersistentModal(ModalEnum.LoginModal)); // 打开登录模态框
      return;
    }
    router.push(href); // 登录后跳转
  };
};

export default useLinkInterceptor;
