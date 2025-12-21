"use client";

import {
    Box,
    FormHelperText,
    InputLabel,
    Button,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { ACCESS_MAX_LENGTH } from "../../configs/validateConfig";
import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AccessService from "../../services/AccessService";
import { StyledTextField } from "../../components/form/StyledTextField";

const access = new AccessService();

export default function AccessAdd({ getData }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        register,
        setError,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            await access.newToken(data);
            await getData();
            enqueueSnackbar(`Новый доступ создано!`, { variant: "success" });
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
                }
            );
        } finally {
            handleClose();
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{ display: "inline-block" }}
                variant="contained"
            >
                Добавить
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box display={"flex"}>
                            <StyledTextField
                                errors={errors}
                                label={"Имя"}
                                helper={true}
                                register={register("name", {
                                    maxLength: {
                                        value: ACCESS_MAX_LENGTH,
                                        message: `максимум ${ACCESS_MAX_LENGTH} символов`,
                                    },
                                })}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <StyledLoadingButton
                            type="submit"
                            sx={{ height: "100%" }}
                            loading={isSubmitting}
                            endIcon={<DoubleArrowIcon />}
                            variant="contained"
                        >
                            Сгенерировать доступ
                        </StyledLoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
