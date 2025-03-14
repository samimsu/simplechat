import { format, isToday, isYesterday, type Locale } from "date-fns";
import { enUS, fr, es, de } from "date-fns/locale";

const locales: { [key: string]: Locale } = {
  "en-US": enUS,
  "fr-FR": fr,
  "es-ES": es,
  "de-DE": de,
};

export function formatChatTimestamp(
  timestamp: number | string,
  userLocale: string = navigator.language
) {
  const date = new Date(timestamp);

  console.log("navigator.language", navigator.language);

  const locale = locales[userLocale] || locales["en-US"];

  if (isToday(date)) {
    return `Today, ${format(date, "p", { locale })}`;
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "p", { locale })}`;
  }

  return format(date, "MMM d, yyyy, p", { locale });
}
