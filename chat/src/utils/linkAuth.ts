import { ModalEnum } from "@/enum/ModalEnum";
import { useRouter } from "@/i18n/routing";
import { RootState } from "@/store";
import { openPersistentModal } from "@/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
const useClickLinkAuth = (href: string) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return (e: React.MouseEvent) => {
    if (!isLogin) {
      e.preventDefault(); // 阻止默认行为
      dispatch(openPersistentModal(ModalEnum.LoginModal)); // 打开登录弹窗
      return;
    }
    router.push(href); // 如果已登录，跳转到目标地址
  };
};

export default useClickLinkAuth;
