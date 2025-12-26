"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ADMIN_ROUTE, MAIN_ROUTE } from "../configs/routerLinks";
import { StyledLink } from "./StyledLink";
import style from "./breadcrumbs.module.scss";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";

export default function BreadcrumbsComponent({
    main = true,
    options,
    user,
    sx = {},
}) {
    const t = useTranslations();
    const { token } = useParams();
    const theme = useTheme();
    return (
        <Breadcrumbs
            maxItems={3}
            separator={<NavigateNextIcon color="secondary" fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
                bgcolor: theme.palette.primary.main,
                ...sx,
                "& ol": { flexWrap: "nowrap !important" },
                borderRadius: 2,
                maxWidth: "100%",
                overflow: "hidden",
            }}
        >
            {main &&
                (user ? (
                    <Link href={MAIN_ROUTE(token)}>
                        <StyledLink>
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                            {t("pages.main.name")}
                        </StyledLink>
                    </Link>
                ) : (
                    <Link href={ADMIN_ROUTE}>
                        <StyledLink>
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                            Главная
                        </StyledLink>
                    </Link>
                ))}
            {options?.map((e, i, arr) =>
                i !== arr.length - 1 ? (
                    <Link href={e?.link} key={new Date()}>
                        <StyledLink>
                            {e?.icon}
                            {e?.name}
                        </StyledLink>
                    </Link>
                ) : (
                    <Typography
                        className={style.breadcrumbs}
                        key={new Date()}
                        color={theme.palette.secondary.light}
                    >
                        {e?.name}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
}
