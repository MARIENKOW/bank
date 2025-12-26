import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useTranslations } from "next-intl";

import DeleteCreditButton from "./ActionBtns/DeleteCreditButton";

export default function AproveCreditItemAdmin({ credit }) {
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
                    <Typography fontWeight={400} variant="body1">
                        {credit.comment}
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
                        <DeleteCreditButton credit={credit} />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
