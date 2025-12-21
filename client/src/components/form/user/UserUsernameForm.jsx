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
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../../configs/validateConfig";
import { CanceledError } from "axios";
import UserService from "../../../services/UserService";
import { useTranslations } from "next-intl";
import { StyledLoadingButton } from "../StyledLoadingButton";
import { useQueryClient } from "@tanstack/react-query";

const user = new UserService();

export const UserUsernameForm = ({ item }) => {
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
        defaultValues: { username: item.username },
    });

    useEffect(() => {
        reset({ username: item.username }, { keepDirty: false });
    }, [item.username]);

    console.log(isDirty);

    const onSubmit = async (data) => {
        try {
            await user.updateUsername({ ...data, id: item.id });
            await quertClient.invalidateQueries(["user", item.id]);

            enqueueSnackbar(t("fields.username.success"), {
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
                        error={!!errors["username"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${item.id}-username`}
                        >
                            {t("form.username")}
                        </InputLabel>
                        <OutlinedInput
                            label={t("form.username")}
                            errors={errors}
                            {...register("username", {
                                required: t("form.required"),
                                maxLength: {
                                    value: USERNAME_MAX_LENGTH,
                                    message: t("form.maxLength", {
                                        value: USERNAME_MAX_LENGTH,
                                    }),
                                },
                                minLength: {
                                    value: USERNAME_MIN_LENGTH,
                                    message: t("form.minLength", {
                                        value: USERNAME_MIN_LENGTH,
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
                            id={`filled-adornment-amount-${item.id}-username`}
                        />
                        <FormHelperText>
                            {(errors?.["username"] &&
                                errors?.["username"]?.message) ||
                                ""}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
