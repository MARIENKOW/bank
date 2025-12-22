import { blue, grey, red } from "@mui/material/colors";

const colors = {
    pinkRose: {
        DEFAULT: "#EC4899",
        50: "#FDEEF6",
        100: "#FBDCEB",
        200: "#F8B7D7",
        300: "#F492C2",
        400: "#F06DAE",
        500: "#EC4899",
        600: "#E4187D",
        700: "#B11261",
        800: "#7F0D45",
        900: "#4C0829",
        950: "#32051B",
    },
};

export const themeSettings = {
    typography: {
        fontFamily: "inherit",
    },
    palette: {
        primary: {
            // main: "#0058a5",
            main: "#3e5268",
            dark: "#2e3d50",
            light: "#6d8198",
            contrastText: "#e7f4ff",
        },
        secondary: {
            main: grey[100],
            dark: grey[300],
            // light: "#363636",
            light: grey[50],
            contrastText: grey[900],
        },
        dif: {
            main: "#1a8fa4",
            dark: "#186a78",
            // light: "#363636",
            light: '#73cddd',
            contrastText: grey[900],
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)", // ← ТЕКСТ на светлом фоне
            secondary: "rgba(0, 0, 0, 0.6)",
            disabled: "rgba(0, 0, 0, 0.38)",
        },
        form: {
            main: grey[900],
            dark: "#000",
            // light: "#363636",
            light: grey[700],
            contrastText: grey[50],
        },
        alert: {
            main: "rgb(22, 11, 11)",
            dark: "#391010",
            light: "rgb(244, 67, 54)",
            contrastText: "rgb(244, 199, 199)",
        },
        success: {
            main: "rgb(34, 100, 43)",
            dark: "rgb(12, 19, 13)",
            light: "rgb(28, 46, 31)",
            contrastText: "rgb(204, 232, 205)",
        },
        error: {
            main: "#d32f2f",
            dark: "#3c0c0c",
            light: "#3c0c0c",
            contrastText: "#ffffff",
        },
        background: {
            default: "#fff",
            paper: "#2e3d50",
            main: "#bebebe",
            dark: "#e9e9e9",
            light: "#fff",
            contrastText: "#202020",
        },
    },
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "&:hover": {
                        // backgroundColor: theme.palette.table.hover,
                    },
                    backgound: theme.palette.secondary.light,
                }),
                // head НЕ РАБОТАЕТ! Используйте MuiTableCell.head
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: ({ theme }) => ({
                    // borderColor: theme.palette.divider,
                    bgcolor: "#fff",
                    fontWeight: 500,
                    color: theme.palette.primary.dark,
                    backgroundColor: theme.palette.secondary.main, // ← ЗДЕСЬ!
                }),
                head: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.dark, // ← ЗДЕСЬ!
                    color: theme.palette.common.white, // белый текст
                    fontWeight: 700,
                }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    letterSpacing: "1.2px", // или '-0.01em' для более плотного
                },
            },
        },

        // Все Button
        MuiButton: {
            styleOverrides: {
                root: {
                    letterSpacing: "1.5px",
                },
            },
        },

        // Все TextField input
        MuiInputBase: {
            styleOverrides: {
                root: {
                    letterSpacing: "1.2px",
                    "& input, & textarea": {
                        letterSpacing: "1.2px",
                    },
                },
            },
        },
    },
};
