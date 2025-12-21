import { setRequestLocale } from "next-intl/server";
import "../globals.scss";
import { NextIntlClientProvider } from "next-intl";

export default async function Layout({ children, params }) {
    const { locale } = await params;
    console.log(locale);

    setRequestLocale(locale);
    return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
