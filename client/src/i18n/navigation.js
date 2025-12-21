import { routing } from "./routing";
import { createNavigation } from "next-intl/navigation";

export const { usePathname, useRouter, redirect, Link, getPathname } =
    createNavigation(routing);
