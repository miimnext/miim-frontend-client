import Modal from "@/components/utils/Modal";
import PwaServiceWorker from "./PwaServiceWorker";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
interface Params {
  locale: string;
}
export async function initFuc(params: Params) {
  const { locale } = await params;
  const messages = await getMessages();
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system";
  const token = cookieStore.get("SSSID")?.value;
  const settting = {
    locale,
    theme,
    messages,
  };
  return {
    settting,
    token,
  };
}
export default function InitializeApp() {
  return (
    <>
      <Modal />
      <PwaServiceWorker />
    </>
  );
}
