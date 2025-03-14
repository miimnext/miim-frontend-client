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
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Your brief page summary here, ideally 150-160 characters."
          />

          <link rel="manifest" href="/manifest.json" />
          <title>miim</title>
        </>
      </head>
      <body>
        <NextIntlClientProvider messages={settting.messages}>
          <Providers token={token} theme={settting.theme}>
            <InitializeApp></InitializeApp>
            <Header />
            <main className="flex max-w-[--max-w-main]  mx-auto w-full">
              <Sidebar></Sidebar>
              <div className="mx-auto w-full max-w-5xl  md:max-w-[--max-w-content]">
                {children}
              </div>
            </main>
            {modal}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
