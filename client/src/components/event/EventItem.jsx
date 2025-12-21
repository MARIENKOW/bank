import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function EventItem({ event }) {
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
                        {formatDate(event?.date)}
                    </Typography>
                    <Typography variant="body2">{event?.comment}</Typography>
                </Box>
                <Box>
                    <Typography
                    whiteSpace={'nowrap'}
                        fontWeight={500}
                        color={event?.increment ? "success" : "error"}
                        variant="body1"
                    >
                        {(event?.increment ? "+" : "-") +
                            t("currency", { value: event?.sum })}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
