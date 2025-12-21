"use client";

import {
    Box,
    FilledInput,
    FormHelperText,
    InputAdornment,
    InputLabel,
    Button,
    FormControl,
    TextField,
    OutlinedInput,
} from "@mui/material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useEffect, useMemo, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
    PHONE_NUMBER_MAX_LENGTH,
    PHONE_NUMBER_MIN_LENGTH,
    PHONE_NUMBER_PATTERN,
} from "../../configs/validateConfig";
import PhoneService from "../../services/PhoneService";
import { CanceledError } from "axios";

const phone = new PhoneService();

export const PhoneForm = ({ item, getData }) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState();
    const {
        handleSubmit,
        register,
        setError,
        getValues,
        reset,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: { number: item.number },
    });

    useEffect(() => {
        console.log(item.number);
        reset({ name: item.number }, { keepDirty: false });
    }, [item]);

    console.log(isDirty);

    const onSubmit = async (data) => {
        try {
            await phone.update(item.id, data);
            await getData();

            enqueueSnackbar(`Номер изменено!`, { variant: "success" });
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

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            if (!confirm(`Удалить ${getValues().number}?`))
                return setIsDeleteLoading(false);
            await phone.delete(item.id);
            await getData();
            enqueueSnackbar(`Номер удален!`, { variant: "success" });
        } catch (error) {
            if (e instanceof CanceledError) return;
            console.log(error);
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                }
            );
        } finally {
            setIsDeleteLoading(false);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display={"flex"}>
                    <FormControl error={!!errors["number"]} variant="outlined">
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${item.id}`}
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
                            endAdornment={
                                <InputAdornment
                                    sx={{ display: "flex", gap: 1 }}
                                    position="end"
                                >
                                    <StyledLoadingButton
                                        type="submit"
                                        sx={{ height: "100%" }}
                                        loading={isSubmitting}
                                        disabled={!isValid || !isDirty}
                                        endIcon={<DoubleArrowIcon />}
                                        variant="contained"
                                    ></StyledLoadingButton>
                                    <StyledLoadingButton
                                        sx={{ height: "100%" }}
                                        loading={isDeleteLoading}
                                        variant="contained"
                                        color="error"
                                        onClick={handleDelete}
                                    >
                                        <DeleteForeverIcon />
                                    </StyledLoadingButton>
                                </InputAdornment>
                            }
                            id={`filled-adornment-amount-${item.id}`}
                        />
                        <FormHelperText>
                            {(errors?.["number"] &&
                                (errors?.["number"]?.message || "ошибка")) ||
                                ""}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
