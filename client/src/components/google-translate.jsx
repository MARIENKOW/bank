"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactCountryFlag from "react-country-flag";

<ReactCountryFlag
    countryCode="US"
    svg
    style={{ width: "1.5em", height: "1.5em" }}
/>;
// Список языков
const LANGUAGES = [
    {
        code: "ru",
        label: (
            <ReactCountryFlag
                countryCode="RU"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
            />
        ),
        rtl: false,
    },
    {
        code: "iw",
        label: (
            <ReactCountryFlag
                countryCode="IL"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
            />
        ),
        rtl: false,
    },
    {
        code: "en",
        label: (
            <ReactCountryFlag
                countryCode="US"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
            />
        ),
        rtl: false,
    },
    {
        code: "pl",
        label: (
            <ReactCountryFlag
                countryCode="PL"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
            /> 
        ),
        rtl: false,
    },
    {
        code: "de",
        label: (
            <ReactCountryFlag
                countryCode="DE"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
            />
        ),
        rtl: false,
    },
    {
        code: "fr",
        label: (
            <ReactCountryFlag
                countryCode="FR"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
            />
        ),
        rtl: false,
    },
];

function getCurrentGoogleTranslateLang() {
    if (typeof document === "undefined") return "ru";
    const cookie = document?.cookie?.match(/googtrans=\/[^/]+\/([^;]+)/);
    const cookieLang = cookie ? cookie[1] : null; // например "en" или "he"
    const findObj = LANGUAGES.find((e) => e.code == cookieLang);
    return findObj ? findObj.code : "ru";
}

// const currentLang = getCurrentGoogleTranslateLang();

export default function GoogleTranslate() {
    useEffect(() => {
        // Загружаем Google Translate Script один раз
        if (!document.getElementById("google-translate-script")) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src =
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            document.body.appendChild(script);
        }

        // Инициализация Google Translate
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "ru",
                    includedLanguages: LANGUAGES.map((l) => l.code).join(","),
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };
    }, []);

    const handleChange = (event) => {
        const lang = event.target.value;

        const currentObj = LANGUAGES.find((e) => e.code == lang);
        const select = document.querySelector(".goog-te-combo");

        if (select) {
            const option = Array.from(select.options).find(
                (o) => o.value === lang
            );

            if (option) {
                select.value = lang;
                select.dispatchEvent(new Event("change"));

                // Если RTL язык, меняем направление текста
                document.body.dir = currentObj?.rtl ? "rtl" : "ltr";
            } else {
                // fallback для редких случаев
                document.body.dir = currentObj?.rtl ? "rtl" : "ltr";
            }
        }
    };

    return (
        <Box display={"inline-block"} sx={{ minWidth: 70 }}>
            <div id="google_translate_element" className="hidden"></div>
            <FormControl
                size="small"
                sx={{ display: "inline-block", minWidth: 70 }}
                fullWidth
            >
                <Select
                    labelId="demo-simple-select-label-size"
                    id="demo-simple-select-size"
                    // value={"ru"}
                    sx={{ width: "100%" }}
                    // displayEmpty
                    // defaultValue={currentLang}
                    defaultValue={getCurrentGoogleTranslateLang()}
                    onChange={handleChange}
                    // onClick={() => handleLanguageChange(lang.code, lang.rtl)}
                >
                    {LANGUAGES.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                            {lang.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
