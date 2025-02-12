import { NextIntlClientProvider } from "next-intl";
import Header from "./(layout)/Header";
import Providers from "../providers";
import { initFuc } from "../initializeApp";
import Modal from "@/components/utils/Modal";
import PwaServiceWorker from "../initializeApp/PwaServiceWorker";
import "@/styles/global.css";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 初始化设置
  const { settting, token } = await initFuc(params);
  return (
    <html lang={settting.locale} data-theme={settting.theme}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <NextIntlClientProvider messages={settting.messages}>
          <Providers token={token}>
            <Header />
            <main>{children}</main>
            <Modal />
            <PwaServiceWorker />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
