import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import ArticleIcon from "@mui/icons-material/Article";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import DeleteCreditButton from "./ActionBtns/DeleteCreditButton";
import InfoCreditButton from "../../components/credit/ActionBtns/InfoCreditButton";

export default function CancelCreditItem({ credit, i }) {
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
                pt={1.5}
                pb={1.5}
                pr={1.5}
                pl={1.5}
                gap={1.5}
            >
                <Box ml={1} display={"flex"} alignItems={"center"} gap={2}>
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
                    <Box
                        component={"a"}
                        target="_blank"
                        href={credit?.document?.path}
                    >
                        <Button
                            color={"error"}
                            sx={{ minWidth: 0, p: 0.5 }}
                            variant="contained"
                        >
                            <OpenInNewIcon
                                fontSize={"medium"}
                                color="secondary"
                            />
                        </Button>
                    </Box>
                    <InfoCreditButton credit={credit} />
                </Box>
            </Box>
        </Box>
    );
}
