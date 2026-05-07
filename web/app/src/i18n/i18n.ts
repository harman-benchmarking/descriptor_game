import en from "./en.json";
import zhHans from "./zh-Hans.json";
import de from "./de.json";
import ja from "./ja.json";

export type Locale = "en" | "zh-Hans" | "de" | "ja";

const dictionaries: Record<Locale, Record<string, string>> = {
  en,
  "zh-Hans": { ...en, ...zhHans },
  de: { ...en, ...de },
  ja: { ...en, ...ja }
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-Hans": "简体中文",
  de: "Deutsch",
  ja: "日本語"
};

export function createTranslator(locale: Locale) {
  const dictionary = dictionaries[locale] ?? dictionaries.en;
  return (key: string) => dictionary[key] ?? dictionaries.en[key] ?? key;
}
