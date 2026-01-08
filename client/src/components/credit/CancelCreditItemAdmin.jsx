import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import ArticleIcon from "@mui/icons-material/Article";

import DeleteCreditButton from "./ActionBtns/DeleteCreditButton";
import InfoCreditButton from "./ActionBtns/InfoCreditButton";

export default function CancelCreditItemAdmin({ credit }) {
    const t = useTranslations();

    const commentString = credit?.comment || "";
    const bankString = credit?.bank || "";
    const elcString = credit?.elc || "";

    const comment = commentString + " " + bankString + " " + elcString;

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
                    {/* <Typography fontSize={12} fontWeight={400} variant="body1">
                        {comment}
                    </Typography> */}
                </Box>
                <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Typography
                        fontWeight={500}
                        color={"success"}
                        variant="body1"
                    >
                        {t("currency", { value: credit?.sum })}
                    </Typography>
                    {credit?.document?.path && (
                        <Box
                            component={"a"}
                            target="_blank"
                            href={credit?.document?.path}
                        >
                            <Button
                                sx={{ minWidth: "0px !important", p: 1 }}
                                variant="contained"
                            >
                                <ArticleIcon color="secondary" />
                            </Button>
                        </Box>
                    )}

                    <Box display={"flex"} gap={1}>
                        <DeleteCreditButton credit={credit} />
                        <InfoCreditButton credit={credit} />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
