"use client";

import {
    Box,
    Button,
    FilledInput,
    FormHelperText,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import { StyledLoadingButton } from "../../../../../../../components/form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
    SUM_MAX_VALUE,
    SUM_MIN_VALUE,
    SUM_PATTERN,
} from "../../../../../../../configs/validateConfig";
import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useQueryClient } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";
import { StyledFormControl } from "../../../../../../../components/form/StyledPassword";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import CreditService from "../../../../../../../services/CreditService";

const credit = new CreditService();

export default function CreditAdd({}) {
    const { id } = useParams();
    const t = useTranslations();
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
        control,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: { increment: "", date: null },
    });

    const onSubmit = async (data) => {
        try {
            await credit.create({
                ...data,
                id,
                date: data?.date?.format("YYYY-MM-DD") || null,
            });
            // queryClient.invalidateQueries({ queryKey: ["user", id] });
            queryClient.invalidateQueries({
                queryKey: ["credits", id],
            });
            enqueueSnackbar(`кредит создано!`, { variant: "success" });
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
                Создать
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box flexDirection={"row"} gap={1} display={"flex"}>
                            <Controller
                                control={control}
                                name={"date"}
                                rules={{
                                    required: "обязательное поле",
                                }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => {
                                    return (
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                            adapterLocale="ru"
                                            localeText={
                                                ruRU.components
                                                    .MuiLocalizationProvider
                                                    .defaultProps.localeText
                                            }
                                        >
                                            <DatePicker
                                                slotProps={{
                                                    textField: {
                                                        // component:<STF/>,
                                                        sx: {
                                                            width: "100%",
                                                            "& .MuiPickersInputBase-root":
                                                                {
                                                                    bgcolor:
                                                                        "#fff",
                                                                },
                                                        },
                                                        // color:'secondary',
                                                        variant: "filled",
                                                        error: !!errors?.date,
                                                        helperText:
                                                            errors?.date
                                                                ?.message || "",
                                                    },
                                                }}
                                                onChange={(v) => {
                                                    onChange(v);
                                                }}
                                                value={value}
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        md: "100%",
                                                    },
                                                }}
                                                format="DD.MM.YYYY"
                                            />
                                        </LocalizationProvider>
                                    );
                                }}
                            />
                            <Controller
                                control={control}
                                name="sum"
                                rules={{
                                    required: "required field",
                                    pattern: {
                                        value: SUM_PATTERN,
                                        message:
                                            "value must be in the format - 99 or 99.99",
                                    },
                                    min: {
                                        value: SUM_MIN_VALUE,
                                        message: `minimum ${SUM_MIN_VALUE}`,
                                    },
                                    max: {
                                        value: SUM_MAX_VALUE,
                                        message: `maximum ${SUM_MAX_VALUE}`,
                                    },
                                }}
                                render={({
                                    field: { value, onChange, name },
                                    formState: { errors },
                                }) => {
                                    return (
                                        <StyledFormControl
                                            fullWidth
                                            error={!!errors?.sum}
                                            variant="filled"
                                        >
                                            <InputLabel
                                                htmlFor={`filled-adornment-amount-sum`}
                                            >
                                                Сумма
                                            </InputLabel>
                                            <FilledInput
                                                type="number"
                                                id={`filled-adornment-amount-sum`}
                                                value={value}
                                                onChange={({ target }) => {
                                                    onChange(target?.value);
                                                }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        {t("currency", {
                                                            value: "",
                                                        })}
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText>
                                                {errors?.sum?.message}
                                            </FormHelperText>
                                        </StyledFormControl>
                                    );
                                }}
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
