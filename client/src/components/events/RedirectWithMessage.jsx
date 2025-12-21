"use client";

import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

export default function RedirectWithMessage({
   link,
   message = "Упс! Что-то пошло не так, попробуйте позже",
   variant = "error",
}) {
   const router = useRouter();
   enqueueSnackbar(message, {
      variant,
   });
   return router.push(link);
}
