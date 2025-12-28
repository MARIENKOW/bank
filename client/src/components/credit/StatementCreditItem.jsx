import { StyledLoadingButton } from "../form/StyledLoadingButton";
import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import InfoCreditButton from "../../components/credit/ActionBtns/InfoCreditButton";

export default function StatementCreditItem({ credit, i }) {
    const t = useTranslations();

    return (
        <Box
            sx={{ bgcolor: i % 2 ? "#fff" : "secondary.main" }}
            variant="elevation"
        >
            <Box
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                p={2}
                gap={2}
            >
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Typography fontWeight={500} variant="body1">
                        {formatDate(credit.date)}
                    </Typography>
                </Box>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Typography
                        fontWeight={500}
                        color={"success"}
                        variant="body1"
                    >
                        {t("currency", { value: credit?.sum })}
                    </Typography>
                    <InfoCreditButton credit={credit} />
                </Box>
            </Box>
        </Box>
    );
}
