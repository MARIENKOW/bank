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
import { StyledFormControl } from "../../../../../../../components/form/StyledPassword";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { StyledTextField } from "../../../../../../../components/form/StyledTextField";
import BankService from "../../../../../../../services/BankService";

const bank = new BankService();

export default function BankAdd({}) {
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
        defaultValues: {
            status: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await bank.create({
                ...data,
                id,
            });
            queryClient.invalidateQueries({
                queryKey: ["banks", id],
            });
            enqueueSnackbar(`банк создано!`, { variant: "success" });
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
                        <Box
                            flexDirection={"row"}
                            flexWrap={"wrap"}
                            gap={1}
                            display={"flex"}
                        >
                            <StyledTextField
                                errors={errors}
                                label={"название"}
                                register={register("name", {
                                    required: "обязательное поле",
                                })}
                            />
                            <StyledTextField
                                errors={errors}
                                label={"Номер счета"}
                                register={register("elc", {})}
                            />
                            <StyledTextField
                                errors={errors}
                                label={"Ограничения"}
                                register={register("limit", {})}
                            />
                            <Controller
                                control={control}
                                name="status"
                                rules={{ required: "обязательное поле" }}
                                render={({
                                    field: { value, onChange, name },
                                    formState: { errors },
                                }) => (
                                    <StyledFormControl
                                        error={!!errors?.status}
                                        variant="filled"
                                        fullWidth
                                    >
                                        <InputLabel
                                            id={`demo-simple-select-standard-status`}
                                        >
                                            Статус
                                        </InputLabel>
                                        <Select
                                            // sx={{}}}
                                            labelId={`demo-simple-select-standard-status`}
                                            value={value}
                                            onChange={({ target }) => {
                                                onChange(target?.value);
                                            }}
                                            label={"Тип события"}
                                            MenuProps={{
                                                sx: {
                                                    "& .MuiPaper-root": {
                                                        bgcolor: "#fff",
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value={0}>
                                                Активный
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                проходит перевыпуск
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {errors?.status?.message}
                                        </FormHelperText>
                                    </StyledFormControl>
                                )}
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
