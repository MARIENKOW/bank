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
    SUM_MAX_VALUE,
    SUM_MIN_VALUE,
    SUM_PATTERN,
} from "../../../configs/validateConfig";
import { CanceledError } from "axios";
import UserService from "../../../services/UserService";
import { useTranslations } from "next-intl";
import { StyledLoadingButton } from "../StyledLoadingButton";
import { useQueryClient } from "@tanstack/react-query";

const user = new UserService();

export const UserReservedBalanceForm = ({ item }) => {
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
        defaultValues: { reservedBalance: item.reservedBalance },
    });

    useEffect(() => {
        reset({ reservedBalance: item.reservedBalance }, { keepDirty: false });
    }, [item.reservedBalance]);

    console.log(isDirty);

    const onSubmit = async (data) => {
        try {
            await user.updateReservedBalance({ ...data, id: item.id });
            await quertClient.invalidateQueries(["user", item.id]);

            enqueueSnackbar(`резерв изменено!`, {
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
                        error={!!errors["reservedBalance"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${item.id}-reservedBalance`}
                        >
                            Резерв
                        </InputLabel>
                        <OutlinedInput
                            label={"Резерв"}
                            errors={errors}
                            {...register("reservedBalance", {
                                required: "required field",
                                pattern: {
                                    value: SUM_PATTERN,
                                    message:
                                        "value must be in the format - 99 or 99.99",
                                },
                                max: {
                                    value: SUM_MAX_VALUE,
                                    message: `maximum ${SUM_MAX_VALUE}`,
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
                            id={`filled-adornment-amount-${item.id}-reservedBalance`}
                        />
                        <FormHelperText>
                            {(errors?.["reservedBalance"] &&
                                errors?.["reservedBalance"]?.message) ||
                                ""}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
