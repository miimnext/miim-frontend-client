import dynamic from "next/dynamic";

const ModalMaps = {
  LoginModal: dynamic(() => import("@/app/[locale]/(pages)/login/login")),
  SignupModal: dynamic(() => import("@/app/[locale]/(pages)/login/signup")),
};

export default ModalMaps;
