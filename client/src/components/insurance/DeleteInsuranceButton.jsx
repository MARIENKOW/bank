import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { DeleteForever } from "@mui/icons-material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import InsuranceService from "../../services/InsuranceService";

const insurance = new InsuranceService();

export default function DeleteInsuranceButton({ item }) {
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const handleDeleteEvent = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить страховую?")) return;
            await insurance.delete(item.id);
            await queryClient.invalidateQueries({
                queryKey: ["insurances", String(item.user_id)],
            });
            enqueueSnackbar(`страховая удалён!`, { variant: "success" });
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
