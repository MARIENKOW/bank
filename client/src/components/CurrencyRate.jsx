import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";
import axios from "axios";
import { getLocale, getTranslations } from "next-intl/server";

const CURRENCIES = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "CHF",
    "CZK",
    "ILS",
    "RUB",
];

export default async function CurrencyRatesRUB() {
    const t = await getTranslations("CurrencyRates");

    const locale = await getLocale();

    try {
        const { data } = await axios.get(
            "https://api.exchangerate-api.com/v4/latest/usd"
        );

        const cur = locale == "il" ? data.rates.ILS : data.rates.RUB;

        const rates = CURRENCIES.map((code) => ({
            CharCode: code,
            Name: code,
            RatePerUnit: cur / data.rates[code], // Сколько рублей за 1 единицу валюты
        })).filter(Boolean);

        return (
            <>
                <Typography mb={2} variant="h6" gutterBottom>
                    {t("title")}
                </Typography>
                <TableContainer
                    component={Paper}
                    sx={{
                        maxWidth: 600,
                        //  ml: "auto", mr: "auto"
                    }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell width="50%">
                                    {t("currency")}
                                </TableCell>
                                <TableCell align="right" width="50%">
                                    {t("per_unit")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rates.map((rate) => (
                                <TableRow key={rate.CharCode} hover>
                                    <TableCell>{rate.CharCode}</TableCell>
                                    <TableCell align="right">
                                        {rate.RatePerUnit.toFixed(4)}
                                        {t("cur")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    } catch (error) {
        console.log(error);
    }
}
