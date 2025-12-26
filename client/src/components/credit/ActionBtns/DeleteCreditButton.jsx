import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { DeleteForever } from "@mui/icons-material";
import CreditService from "../../../services/CreditService";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";

const creditF = new CreditService();

export default function DeleteCreditButton({ credit }) {
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const handleDeleteEvent = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить кредит?")) return;
            await creditF.delete(credit.id);
            await queryClient.invalidateQueries({
                queryKey: ["user", String(credit.user_id)],
            });
            await queryClient.invalidateQueries({
                queryKey: ["credits", String(credit.user_id)],
            });
            enqueueSnackbar(`кредит удалён!`, { variant: "success" });
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
