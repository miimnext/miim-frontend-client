import { NextIntlClientProvider } from "next-intl";
import "@/styles/global.css";
import Header from "./(layout)/Header";
import Providers from "../providers";
import InitializeApp, { initFuc } from "../initializeApp";

import Sidebar from "./(layout)/Sidebar";
export default async function Layout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
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
          <Providers token={token} theme={settting.theme}>
            <InitializeApp></InitializeApp>
            <Header />
            <main className="flex max-w-[--max-w-main] mx-auto">
              <Sidebar></Sidebar>
              <div className="flex-1">{children}</div>
            </main>
            {modal}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
