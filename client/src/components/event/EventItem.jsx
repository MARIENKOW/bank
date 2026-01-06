import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function EventItem({ event, i }) {
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
                    <Typography fontWeight={500} variant="body2">
                        {formatDate(event?.date)}
                    </Typography>
                    <Typography fontWeight={500} variant="body2">
                        {event?.comment}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        whiteSpace={"nowrap"}
                        fontWeight={500}
                        color={event?.increment ? "success" : "error"}
                        variant="body2"
                    >
                        {(event?.increment ? "+" : "-") +
                            t("currency", { value: event?.sum })}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
