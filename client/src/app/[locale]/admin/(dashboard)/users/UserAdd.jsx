"use client";

import { Box, Button } from "@mui/material";
import { StyledLoadingButton } from "../../../../../components/form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../../../../configs/validateConfig";
import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import UserService from "../../../../../services/UserService";
import { StyledTextField } from "../../../../../components/form/StyledTextField";
import { useQueryClient } from "@tanstack/react-query";

const user = new UserService();

export default function UserAdd() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

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
            await user.signUp(data);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            enqueueSnackbar(`Новый клиент создан!`, { variant: "success" });
            handleClose();
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
                        <Box flexDirection={"column"} gap={1} display={"flex"}>
                            <StyledTextField
                                errors={errors}
                                label={"username"}
                                register={register("username", {
                                    required: "обязательное поле",
                                    maxLength: {
                                        value: USERNAME_MAX_LENGTH,
                                        message: `минимум ${USERNAME_MAX_LENGTH} символов`,
                                    },
                                    minLength: {
                                        value: USERNAME_MIN_LENGTH,
                                        message: `максимум ${USERNAME_MIN_LENGTH} символов`,
                                    },
                                })}
                            />
                            <StyledTextField
                                errors={errors}
                                label={"password"}
                                register={register("password", {
                                    required: "обязательное поле",
                                    maxLength: {
                                        value: PASSWORD_MAX_LENGTH,
                                        message: `минимум ${PASSWORD_MAX_LENGTH} символов`,
                                    },
                                    minLength: {
                                        value: PASSWORD_MIN_LENGTH,
                                        message: `максимум ${PASSWORD_MIN_LENGTH} символов`,
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
                            Создать Клиента
                        </StyledLoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
