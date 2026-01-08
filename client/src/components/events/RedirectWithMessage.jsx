"use client";

import { useRouter } from "../../i18n/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useTranslations } from "use-intl";

export default function RedirectWithMessage({
    link,
    message = "api.FALLBACK_ERR",
    variant = "error",
}) {
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        enqueueSnackbar(t(message), {
            variant,
        });
        router.push(link);
    }, []);

    return null;
}
