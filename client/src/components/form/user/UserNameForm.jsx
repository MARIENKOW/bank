"use client";

import {
    Box,
    FormHelperText,
    InputAdornment,
    InputLabel,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
} from "../../../configs/validateConfig";
import { CanceledError } from "axios";
import UserService from "../../../services/UserService";
import { useTranslations } from "next-intl";
import { StyledLoadingButton } from "../../../components/form/StyledLoadingButton";
import { useQueryClient } from "@tanstack/react-query";

const user = new UserService();

export const UserNameForm = ({ item }) => {
    const quertClient = useQueryClient();
    const t = useTranslations();
    const {
        handleSubmit,
        register,
        setError,
        reset,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: { name: item.name },
    });

    useEffect(() => {
        reset({ name: item.name }, { keepDirty: false });
    }, [item.name]);

    console.log(isDirty);

    const onSubmit = async (data) => {
        try {
            await user.updateName({ ...data, id: item.id });
            await quertClient.invalidateQueries(["user", item.id]);

            enqueueSnackbar(`Имя изменено!`, { variant: "success" });
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
            enqueueSnackbar("Упс, что-то пошло не так. Попробуйте позже", {
                variant: "error",
            });
        }
    };

    return (
        <Box width={"100%"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display={"flex"}>
                    <FormControl
                        fullWidth
                        error={!!errors["name"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${item.id}-name`}
                        >
                            Имя
                        </InputLabel>
                        <OutlinedInput
                            label={"Имя"}
                            errors={errors}
                            {...register("name", {
                                required: "обязательное поле",
                                maxLength: {
                                    value: NAME_MAX_LENGTH,
                                    message: `максимум ${NAME_MAX_LENGTH} символов`,
                                },
                                minLength: {
                                    value: NAME_MIN_LENGTH,
                                    message:`минимум ${NAME_MIN_LENGTH} символов`,
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
                                </InputAdornment>
                            }
                            id={`filled-adornment-amount-${item.id}-name`}
                        />
                        <FormHelperText>
                            {(errors?.["name"] && errors?.["name"]?.message) ||
                                ""}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
