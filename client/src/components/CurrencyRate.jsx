import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";
import axios from "axios";
import { getLocale, getTranslations } from "next-intl/server";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StraightSharpIcon from "@mui/icons-material/StraightSharp";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "CHF", "CZK"];

export default async function CurrencyRatesRUB() {
    const t = await getTranslations("CurrencyRates");

    const locale = await getLocale();

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    try {
        const { data } = await axios.get(
            "https://api.frankfurter.app/latest?from=USD"
        );
        const { data: yesterdayData } = await axios.get(
            `https://api.frankfurter.app/${yesterday}?from=USD`
        );

        console.log(data);

        console.log(yesterdayData);

        const cur = data.rates.ILS;

        const rates = CURRENCIES.map((code) => {
            // const yesterdayData.rates[code];
            console.log(data.rates[code]);
            const today = code === "USD" ? cur : cur / data.rates[code];
            const yesterday =
                code === "USD"
                    ? yesterdayData.rates.ILS
                    : yesterdayData.rates.ILS / yesterdayData.rates[code];
            return {
                CharCode: code,
                Name: code,
                RatePerUnit: today,
                RatePerUnitYesterday: yesterday,
                Rate: ((today - yesterday) / yesterday) * 100,
            };
        }).filter(Boolean);

        console.log(rates);

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
                        {/* <TableHead>
                            <TableRow>
                                <TableCell width="50%">
                                    {t("currency")}
                                </TableCell>
                                <TableCell align="right" width="50%">
                                    {t("rate")}
                                </TableCell>
                            </TableRow>
                        </TableHead> */}
                        <TableBody>
                            {rates.map((rate) => (
                                <TableRow key={rate.CharCode} hover>
                                    <TableCell>
                                        <Typography variant="body1" color="dif">
                                            {rate.CharCode}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                        >
                                            {rate.RatePerUnit.toFixed(4)}
                                            {t("cur")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box
                                            display={"flex"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                        >
                                            {rate.Rate === 0 ? (
                                                ""
                                            ) : rate.Rate > 0 ? (
                                                <>
                                                    <StraightSharpIcon color="success" />
                                                    <Typography
                                                        variant="body1"
                                                        color="success"
                                                    >
                                                        {rate.Rate.toFixed(3)}%
                                                    </Typography>
                                                </>
                                            ) : (
                                                <>
                                                    <StraightSharpIcon
                                                        color="error"
                                                        sx={{
                                                            transform:
                                                                "rotate(180deg)",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body1"
                                                        color="error"
                                                    >
                                                        {rate.Rate.toFixed(3)}%
                                                    </Typography>
                                                </>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        {rate.Rate === 0 ? (
                                            ""
                                        ) : rate.Rate > 0 ? (
                                            <TrendingUpIcon  color="dif" />
                                        ) : (
                                            <TrendingDownIcon color="dif" />
                                        )}
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
