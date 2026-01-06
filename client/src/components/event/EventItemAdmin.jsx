import { StyledLoadingButton } from "../../components/form/StyledLoadingButton";
import formatDate from "../../helpers/formatDate";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import EventService from "../../services/EventService";
import { useState } from "react";
import { DeleteForever } from "@mui/icons-material";

const eventF = new EventService();

export default function EventItemAdmin({ event }) {
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    const t = useTranslations();
    const handleDeleteEvent = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить все события?")) return;
            await eventF.delete(event.id);
            await queryClient.invalidateQueries({
                queryKey: ["user", String(event.user_id)],
            });
            await queryClient.invalidateQueries({
                queryKey: ["events", String(event.user_id)],
            });
            enqueueSnackbar(`События удалены!`, { variant: "success" });
        } catch (error) {
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                }
            );
        } finally {
            setLoading(false);
        }
    };
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
                <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Typography
                        fontWeight={500}
                        color={event?.increment ? "success" : "error"}
                        sx={{whiteSpace:'nowrap'}}
                        variant="body1"
                    >
                        {(event?.increment ? "+" : "-") +
                            t("currency", { value: event?.sum })}
                    </Typography>
                    <StyledLoadingButton
                        variant="contained"
                        size="small"
                        sx={{ p: 1, minWidth: "10px" }}
                        color="error"
                        loading={loading}
                        onClick={handleDeleteEvent}
                    >
                        <DeleteForever />
                    </StyledLoadingButton>
                </Box>
            </Box>
        </Paper>
    );
}
