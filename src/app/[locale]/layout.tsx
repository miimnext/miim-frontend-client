import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Providers from "../providers";
import Modal from "@/app/components/utils/Modal";
import PwaServiceWorker from "../PwaServiceWorker";
import { NextIntlClientProvider } from "next-intl";
import "@/styles/global.css";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { Locale } from "@/enum/locales";
// import Loading from "../components/Loading";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params; // **先解构 params**

  if (!routing.locales.includes(locale as Locale)) {
    notFound(); // 语言无效时返回 404
  }

  const cookieStore = await cookies(); // **这里不需要 await**
  const theme = cookieStore.get("theme")?.value || "system";
  const messages = await getMessages();
  return (
    <html lang={locale} data-theme={theme}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          id="theme-stylesheet"
          rel="stylesheet"
          href={`/styles/${theme}.css`}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {/* <Loading /> */}
            {children}
            <Footer />
            <Modal />
          </Providers>
        </NextIntlClientProvider>
        <PwaServiceWorker></PwaServiceWorker>
      </body>
    </html>
  );
}
