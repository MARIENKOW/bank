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
import { ELC_MAX_LENGTH } from "../../../configs/validateConfig";
import { CanceledError } from "axios";
import UserService from "../../../services/UserService";
import { useTranslations } from "next-intl";
import { StyledLoadingButton } from "../StyledLoadingButton";
import { useQueryClient } from "@tanstack/react-query";

const user = new UserService();

export const UserInsuranceElcForm = ({ item }) => {
    const quertClient = useQueryClient();
    const {
        handleSubmit,
        register,
        setError,
        reset,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: { insurance_elc: item.insurance_elc },
    });

    useEffect(() => {
        reset({ insurance_elc: item.insurance_elc }, { keepDirty: false });
    }, [item.insurance_elc]);

    const onSubmit = async (data) => {
        try {
            await user.updateInsuranceElc({ ...data, id: item.id });
            await quertClient.invalidateQueries(["user", item.id]);

            enqueueSnackbar(`Личный счет изменен!`, {
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
                        error={!!errors["insurance_elc"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${item.id}-insurance_elc`}
                        >
                            Личный счет
                        </InputLabel>
                        <OutlinedInput
                            label={"Личный счет"}
                            errors={errors}
                            {...register("insurance_elc", {
                                maxLength: {
                                    value: ELC_MAX_LENGTH,
                                    message: `максимум ${ELC_MAX_LENGTH} символов`,
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
                            id={`filled-adornment-amount-${item.id}-insurance_elc`}
                        />
                        <FormHelperText>
                            {(errors?.["insurance_elc"] &&
                                errors?.["insurance_elc"]?.message) ||
                                ""}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
