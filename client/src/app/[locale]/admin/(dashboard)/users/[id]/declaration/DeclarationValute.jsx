import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { StyledLoadingButton } from "../../../../../../../components/form/StyledLoadingButton";
import DeclarationService from "../../../../../../../services/DeclarationService";
import { useState } from "react";
import { DeleteForever } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const declaration = new DeclarationService();

export default function DeclarationValute({ item }) {
    const [loading, setLoading] = useState(false);
    console.log(item);

    const queryClient = useQueryClient();
    const handleDeleteEvent = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить валюту?")) return;
            await declaration.delete(item.id);
            await queryClient.invalidateQueries({
                queryKey: ["declarations", String(item.user_id)],
            });
            enqueueSnackbar(`валюта удалена!`, { variant: "success" });
        } catch (error) {
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                },
            );
        } finally {
            setLoading(false);
        }
        console.log(item);
    };
    return (
        <Box display={"flex"}  gap={2} alignItems={"center"}>
            <Typography variant="body1" fontSize={18} color="initial">
                {item.name}
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
    );
}
