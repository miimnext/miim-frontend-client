"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import { locales, Locale } from "@/enum/locales";
import React from "react";
export default React.memo(function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const localePattern = `^/(${Object.values(locales).join("|")})`;
  const changeLocale = (locale: Locale) => {
    const newPathname = `/${locale}` + pathname.replace(localePattern, "");
    router.push(newPathname);
  };

  return (
    <header>
      <button onClick={() => changeLocale(Locale.zh)}>中文</button>
      <button onClick={() => changeLocale(Locale.en)}>English</button>
    </header>
  );
});
