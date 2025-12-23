export const en = {
    pages: {
        main: {
            name: "Home",
            buttons: {
                signin: "Log in to account",
            },
            phones: "Contact center",
            blocks: {
                top: {
                    title: "Expected inflation level calculated based on various sources",
                    subtitle:
                        "Inflation expectations derived from capital market data are defined as the ratio of the yield on non-indexed government bonds to the yield on government bonds indexed to the consumer price index (breakeven inflation).",
                    left: {
                        percent: "4.25%",
                        text: "BOI interest rate",
                    },
                    right: {
                        percent: "2.4%",
                        text: "Inflation",
                    },
                },
                gra: {
                    name: "Inflation",
                },
            },
        },
        account: {
            name: "Account",
            text: "The safe deposit box is intended for secure storage of your funds in the Bank of Israel system in case of a data leak. Here you can see information about the safe deposit box, case materials, and movements on the unified personal account.",
            buttons: {
                banker: "Contact the banker",
            },
            header: "Account operations",
        },
        signin: {
            name: "Open an account",
            success: "Authorization was successful!",
            text: "The Bank of Israel undertakes to ensure the security of your account. To log in to the site, your personal Bank of Israel banker must provide you with a one-time password to access your account.",
        },
        logout: {
            name: "Log out",
        },
        notFound: {
            name: "404",
        },
    },
    form: {
        submit: "Confirm",
        password: "Password",
        username: "Login",
        name: "Name",
        elc: "Unified personal account",
        bankNumber: "Safe deposit box number",
        balance: "Safe deposit box balance",
        events: "Information about operations on the unified personal account",
        maxLength: "maximum {value} characters",
        minLength: "minimum {value} characters",
        required: "required field",
        error: {
            message: "Oops, something went wrong. Please try again later.",
        },
    },
    fields: {
        password: {
            success: "Password has been changed!",
        },
        username: {
            success: "Login has been changed!",
        },
        name: {
            success: "Name has been changed!",
        },
        elc: {
            success: "Unified personal account has been changed!",
        },
        bankNumber: {
            success: "Safe deposit box number has been changed!",
        },
    },
    api: {
        ERR_NETWORK: "No network connection. Please try again later.",
        FALLBACK_ERR: "Oops! Something went wrong, please try again later.",
    },
    currency: " ₪{value}",
    name: "Bank of Israel",
    CurrencyRates: {
        currency: "Currency",
        cur: " ₪",
        title: "Exchange rates",
        per_unit: "₪ per 1 unit",
    },
};
