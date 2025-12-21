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
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from "../../../configs/validateConfig";
import { CanceledError } from "axios";
import UserService from "../../../services/UserService";
import { useTranslations } from "next-intl";
import { StyledLoadingButton } from "../StyledLoadingButton";
import { useQueryClient } from "@tanstack/react-query";

const user = new UserService();

export const UserPasswordForm = ({ item }) => {
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
        defaultValues: { password: item.password },
    });

    useEffect(() => {
        reset({ password: item.password }, { keepDirty: false });
    }, [item.password]);

    console.log(isDirty);

    const onSubmit = async (data) => {
        try {
            await user.updatePassword({ ...data, id: item.id });
            await quertClient.invalidateQueries(["user", item.id]);

            enqueueSnackbar(t("fields.password.success"), {
                variant: "success",
            });
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
            enqueueSnackbar(t("form.error.message"), {
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
                        error={!!errors["password"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${item.id}-password`}
                        >
                            {t("form.password")}
                        </InputLabel>
                        <OutlinedInput
                            label={t("form.password")}
                            errors={errors}
                            {...register("password", {
                                required: t("form.required"),
                                maxLength: {
                                    value: PASSWORD_MAX_LENGTH,
                                    message: t("form.maxLength", {
                                        value: PASSWORD_MAX_LENGTH,
                                    }),
                                },
                                minLength: {
                                    value: PASSWORD_MIN_LENGTH,
                                    message: t("form.minLength", {
                                        value: PASSWORD_MIN_LENGTH,
                                    }),
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
                            id={`filled-adornment-amount-${item.id}-password`}
                        />
                        <FormHelperText>
                            {(errors?.["password"] &&
                                errors?.["password"]?.message) ||
                                ""}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
