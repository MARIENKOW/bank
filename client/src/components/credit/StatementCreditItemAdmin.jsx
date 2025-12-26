import { StyledLoadingButton } from "../form/StyledLoadingButton";
import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useTranslations } from "next-intl";


import DeleteCreditButton from "./ActionBtns/DeleteCreditButton";
import CancelCreditButton from "./ActionBtns/CancelCreditButton";
import AproveCreditButton from "./ActionBtns/AproveCreditButton";

export default function StatementCreditItemAdmin({ credit }) {
    const t = useTranslations();

    return (
        <Paper sx={{ bgcolor: "#ddd" }} variant="elevation">
            <Box
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                p={1}
                gap={2}
            >
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Typography fontWeight={500} variant="body1">
                        {formatDate(credit.date)}
                    </Typography>
                </Box>
                <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Typography
                        fontWeight={500}
                        color={"success"}
                        variant="body1"
                    >
                        {t("currency", { value: credit?.sum })}
                    </Typography>
                    <Box display={"flex"} gap={1}>
                        <AproveCreditButton credit={credit} />
                        <CancelCreditButton credit={credit} />
                        <DeleteCreditButton credit={credit} />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
