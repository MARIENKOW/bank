import { defineRouting } from "next-intl/routing";
import { defaultLanguage, languages } from ".";

export const routing = defineRouting({
    locales: languages,
    defaultLocale: defaultLanguage,
    localePrefix: "as-needed",
    localeDetection: false,
    // localeDetection:false
});
