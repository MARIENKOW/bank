import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { DeleteForever } from "@mui/icons-material";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";
import UserDocumentService from "../../../services/UserDocumentService";

const docF = new UserDocumentService();

export default function DocumentDeleteButton({ doc }) {
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const handleDeleteEvent = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить документ?")) return;
            await docF.delete(doc.id);
            await queryClient.invalidateQueries({
                queryKey: ["documents", String(doc.user_id)],
            });
            enqueueSnackbar(`документ удалён!`, { variant: "success" });
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
            endIcon={<DeleteForever />}
            onClick={handleDeleteEvent}
        >
            Удалить
        </StyledLoadingButton>
    );
}
