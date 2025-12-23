"use client";

import { usePathname, useRouter } from "../i18n/navigation";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useLocale } from "next-intl";
import { languages, defaultLanguage } from "../i18n";

export function LanguageChange() {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    const handleChange = (event) => {
        const lang = languages.includes(event.target.value)
            ? event.target.value
            : defaultLanguage;
        router.replace(pathname, { locale: lang });
    };

    return (
        <FormControl
            size="small"
            sx={{ display: "inline-block", minWidth: 25 }}
            fullWidth
        >
            <Select
                variant="standard"
                sx={{ width: "100%" }}
                defaultValue={locale}
                onChange={handleChange}
                MenuProps={{
                    sx: {
                        "& .MuiPaper-root": {
                            bgcolor: "secondary.main",
                        },
                    },
                }}
            >
                {languages.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                        {/* <ReactCountryFlag
                            svg
                            style={{ width: "1.5em", height: "1.5em" }}
                            countryCode={lang === "en" ? "us" : lang}
                        /> */}
                        <Typography variant="body1" color="primary">
                            {lang}
                        </Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
