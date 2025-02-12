import Header from "./(layout)/Header";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import Providers from "../providers";
import InitializeApp from "../initializeApp";
import { getMessages } from "next-intl/server";
import { Locale } from "@/enum/locales";
import "@/styles/global.css";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  // init.1 设置语言
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound(); // 语言无效时返回 404
  }
  const messages = await getMessages();

  //init.2 获取 cookie 中的主题
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system";
  return (
    <html lang={locale} data-theme={theme}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main>{children}</main>

            { /* init.3 初始化应用 */}
            <InitializeApp />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
