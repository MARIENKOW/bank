export const he = {
    pages: {
        main: {
            name: "דף הבית",
            buttons: {
                signin: "כניסה לחשבון אישי",
            },
            phones: "מרכז קשר",
            blocks: {
                top: {
                    title: "רמת אינפלציה צפויה, מחושבת על בסיס מקורות שונים",
                    subtitle:
                        'ציפיות אינפלציה הנגזרות מנתוני שוק ההון מוגדרות כיחס בין תשואת אג"ח ממשלתיות שאינן צמודות לתשואת אג"ח ממשלתיות צמודות מדד מחירי הצרכן (אינפלציית ברייק אבן).',
                    left: {
                        percent: "4.25%",
                        text: "ריבית הבנק",
                    },
                    right: {
                        percent: "2.4%",
                        text: "אינפלציה",
                    },
                },
                gra: {
                    name: "אִינפלַצִיָה",
                },
            },
        },
        account: {
            name: "חשבון אישי",
            text: "תא בטוח מיועד לשמירה בטוחה של הכספים שלכם במערכת בנק ישראל במקרה של דליפת מידע. כאן תוכלו לראות מידע על תא הבטוח, חומרי התיק ותנועות בחשבון האחיד",
            buttons: {
                banker: "יצירת קשר עם הבנקאי",
            },
            insurance: {
                name: "הפקדות ביטוח",
            },
            document: {
                name: "מסמכים",
            },
            bank: {
                elc: "מספר חשבון",
                limit: "מגבלה",
                name: "מוצרים בנקאיים",
                status: "סטטוס",
                info: "פרטים נוספים",
                statusCheck: { 0: "פעיל", 1: "בתהליך הנפקה מחדש" },
            },
            insurance_1: {
                elc: "מספר חשבון",
                limit: "מגבלות",
                status: "סטטוס",
                name: "חסכונות ביטוחיים / פנסיוניים",
                statusCheck: { 0: "פעיל", 1: "בתהליך הנפקה מחדש" },
            },

            declaration: {
                name: "הצהרה",
                cash: "מזומן",
                jewels: "מתכות יקרות",
            },
            credit: {
                name: "הלוואות",
                statement: "בקשות פעילות",
                active: "הלוואות פעילות",
                cancel: "הלוואות מבוטלות",
            },

            banker: {
                name: "שם",
                job: "תפקיד",
                whatsup: "לעבור",
                phone: "מספר טלפון:",
            },
            header: "תנועות בחשבון",
        },
        signin: {
            name: "כניסה לחשבון",
            success: `הכניסה בוצעה בהצלחה!`,
            text: "בנק ישראל מתחייב לשמור על ביטחון חשבונך. כדי להיכנס לאתר, הבנקר האישי שלך מבנק ישראל חייב לספק לך סיסמת כניסה חד-פעמית לחשבון",
        },
        logout: {
            name: "יציאה",
        },
        notFound: {
            name: "404",
        },
    },
    form: {
        submit: "אשר",
        password: "סיסמה",
        username: "שם משתמש",
        name: "שם",
        date: "תאריך",
        elc: "חשבון אחיד",
        insurance_elc: "חשבון בנק אישי",
        bankNumber: "מספר תא בטוח",
        valute: "מטבע",
        sum: "סכום",
        balance: "יתרת תא הבטוח",
        events: "מידע על פעולות בחשבון האחיד",
        maxLength: "מקסימום {value} תווים",
        minLength: "מינימום {value} תווים",
        pattern: "הערך חייב להיות בפורמט - 99 או 99.99",
        min: `מינימום {value}`,

        required: "שדה חובה",
        error: {
            message: "אופס, משהו השתבש. נסה שוב מאוחר יותר",
        },
    },
    fields: {
        password: {
            success: `הסיסמה עודכנה!`,
        },
        username: {
            success: `שם המשתמש עודכן!`,
        },
        name: {
            success: `השם עודכן!`,
        },
        elc: {
            success: `חשבון אחיד עודכן!`,
        },
        document: {
            success: `מסמך חתום!`,
        },
        declaration: {
            success: `ההצהרה נשלחה!`,
        },

        bankNumber: {
            success: `מספר תא הבטוח עודכן!`,
        },
        credit: {
            elc: "חשבון אישי",
            bank: "בנק",
            comment: "מטרת ההלוואה",
            time: "זמן",
        },
    },
    api: {
        ERR_NETWORK: "אין חיבור לרשת. נסה שוב מאוחר יותר.",
        FALLBACK_ERR: "אופס! משהו השתבש, נסה שוב מאוחר יותר",
    },
    currency: " {value}₪",
    name: "בנק ישראל",
    CurrencyRates: {
        currency: "מטבע",
        cur: " ₪",
        title: "שערי מטבעות",
        per_unit: "₪ עבור 1 יחידה",
    },
    empty: "כאן עדיין ריק.",
    error: {
        title: "אופס!",
        subtitle: "משהו השתבש",
    },
    buttons: {
        close: "סגור",
        clear: "נקה",
        sign: "חתום",
    },
};
