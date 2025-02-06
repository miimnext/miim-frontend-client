import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Locale } from "@/enum/locales";
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Check if the locale is valid; fall back to default if it's not
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  try {
    const messages = await import(`./messages/${locale}.json`);
    return {
      locale,
      messages: messages.default,
    };
  } catch (error) {
    console.error(`Error loading messages for locale "${locale}":`, error);
    throw new Error("Messages not found for the selected locale");
  }
});
