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
import {
    PHONE_NUMBER_MAX_LENGTH,
    PHONE_NUMBER_MIN_LENGTH,
    PHONE_NUMBER_PATTERN,
} from "../../configs/validateConfig";
import PhoneService from "../../services/PhoneService";
import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useQueryClient } from "@tanstack/react-query";

const phone = new PhoneService();

export default function PhoneAdd() {
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
            await phone.create(data);
            await queryClient.invalidateQueries(["phones"]);
            enqueueSnackbar(`Номер добавлено!`, { variant: "success" });
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
                            <FormControl
                                error={!!errors["number"]}
                                variant="outlined"
                            >
                                <InputLabel
                                    htmlFor={`filled-adornment-amountt`}
                                >
                                    номер
                                </InputLabel>
                                <OutlinedInput
                                    label={"номер"}
                                    errors={errors}
                                    {...register("number", {
                                        required: "обязательное поле",
                                        pattern: {
                                            value: PHONE_NUMBER_PATTERN,
                                            message: "некорректный формат",
                                        },
                                        maxLength: {
                                            value: PHONE_NUMBER_MAX_LENGTH,
                                            message: `максимум ${PHONE_NUMBER_MAX_LENGTH} символов`,
                                        },
                                        minLength: {
                                            value: PHONE_NUMBER_MIN_LENGTH,
                                            message: `минимум ${PHONE_NUMBER_MIN_LENGTH} символов`,
                                        },
                                    })}
                                    id={`filled-adornment-amountt`}
                                />
                                <FormHelperText>
                                    {(errors?.["number"] &&
                                        (errors?.["number"]?.message ||
                                            "ошибка")) ||
                                        ""}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <StyledLoadingButton
                            type="submit"
                            sx={{ height: "100%" }}
                            loading={isSubmitting}
                            disabled={!isValid || !isDirty}
                            endIcon={<DoubleArrowIcon />}
                            variant="contained"
                        >
                            Добавить
                        </StyledLoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
