// locales.ts
export enum Locale {
  en = "en",
  zh = "zh",
}

// The locales array should only contain valid enum values
export const locales: Locale[] = [Locale.en, Locale.zh];
export function isValidLocale(locale: string): boolean {
  return Object.values(Locale).includes(locale as Locale);
}
