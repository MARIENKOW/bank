"use client";
import { useQueryClient } from "@tanstack/react-query";
import { StyledLoadingButton } from "../../../../../../../components/form/StyledLoadingButton";
import EventInsuranceService from "../../../../../../../services/EventInsuranceService";
import { useState } from "react";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const event = new EventInsuranceService();

export default function DeleteAllButton({ id }) {
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    const handleDeleteEvents = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить все события?")) return;
            await event.deleteAll(id);
            // await queryClient.invalidateQueries({ queryKey: ["user", id] });
            await queryClient.invalidateQueries({
                queryKey: ["eventsInsurance", id],
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
        <StyledLoadingButton
            loading={loading}
            onClick={handleDeleteEvents}
            variant="outlined"
            color="error"
        >
            удалить все
        </StyledLoadingButton>
    );
}
