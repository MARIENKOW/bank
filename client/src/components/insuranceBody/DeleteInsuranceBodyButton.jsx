import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { DeleteForever } from "@mui/icons-material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import InsuranceBodyService from "../../services/InsuranceBodyService";

const body = new InsuranceBodyService();

export default function DeleteInsuranceBodyButton({ item }) {
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const handleDeleteEvent = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить банк?")) return;
            await body.delete(item.id);
            await queryClient.invalidateQueries({
                queryKey: ["bodys", String(item.user_id)],
            });
            enqueueSnackbar(`список удалён!`, { variant: "success" });
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
        <StyledLoadingButton
            fullWidth
            variant="contained"
            size="small"
            sx={{ p: 1, minWidth: "10px" }}
            color="error"
            loading={loading}
            onClick={handleDeleteEvent}
        >
            <DeleteForever />
        </StyledLoadingButton>
    );
}
