import { NextIntlClientProvider } from "next-intl";
import Providers from "../providers";
import InitializeApp, { initFuc } from "../initializeApp";
import "@/styles/global.css";
import Header from "./(layout)/Header";
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
            <InitializeApp></InitializeApp>
            {/* {token && <Header />} */}
            <Header />
            <main>{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
