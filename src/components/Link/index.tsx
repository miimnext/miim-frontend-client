// src/components/CustomLink.tsx
"use client";
import { Link as NextLink } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "@/i18n/routing";
import { openPersistentModal } from "@/store/modalSlice";
import { ModalEnum } from "@/enum/ModalEnum";
import { RootState } from "@/store";
import React from "react";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  needLogin?: boolean;
}

const Link = ({
  href,
  children,
  className,
  needLogin,
  ...props
}: CustomLinkProps) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isLogin && needLogin) {
      e.preventDefault(); // 阻止默认行为
      dispatch(openPersistentModal(ModalEnum.LoginModal)); // 打开登录弹窗
      return;
    } else {
      router.push(href); // 如果已登录，跳转到目标地址
    }
  };

  return (
    <NextLink
      href={href}
      passHref
      onClick={handleClick}
      className={className || ""}
      {...props} // 将所有其他属性传递给 NextLink 组件
    >
      {children}
    </NextLink>
  );
};

export default Link;
