"use client";

import {
    Box,
    Button,
    FilledInput,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { StyledLoadingButton } from "../../../../../../../components/form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { StyledTextField } from "../../../../../../../components/form/StyledTextField";
import DeclarationService from "../../../../../../../services/DeclarationService";

const declaration = new DeclarationService();

export default function DeclarationAdd({}) {
    const { id } = useParams();
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const {
        handleSubmit,
        register,
        control,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            status: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await declaration.create({
                ...data,
                id,
            });
            queryClient.invalidateQueries({
                queryKey: ["declarations", id],
            });
            enqueueSnackbar(`валюту создано!`, { variant: "success" });
            handleClose();
            reset();
        } catch (e) {
            if (e instanceof CanceledError) return;
            console.error(e);
            if (e?.response?.status === 400) {
                const errors = e?.response?.data || {};
                for (let key in errors) {
                    setError(key, { type: "server", message: errors[key] });
                }
                return;
            }
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                },
            );
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{ display: "inline-block" }}
                variant="outlined"
            >
                Создать
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box
                            flexDirection={"row"}
                            flexWrap={"wrap"}
                            gap={1}
                            display={"flex"}
                        >
                            <StyledTextField
                                errors={errors}
                                label={"валюта"}
                                register={register("name", {
                                    required: "обязательное поле",
                                })}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                        <StyledLoadingButton
                            type="submit"
                            sx={{ height: "100%" }}
                            loading={isSubmitting}
                            endIcon={<DoubleArrowIcon />}
                            variant="contained"
                            color="secondary"
                        >
                            Создать
                        </StyledLoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
