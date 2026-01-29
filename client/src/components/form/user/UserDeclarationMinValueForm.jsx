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
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { CanceledError } from "axios";
import UserService from "../../../services/UserService";
import { useTranslations } from "next-intl";
import { StyledLoadingButton } from "../StyledLoadingButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../../components/wrappers/UserContextProvider";
import { observer } from "mobx-react-lite";
import { useParams } from "next/navigation";
import Loading from "../../../components/loading/Loading";
import ErrorElement from "../../../components/ErrorElement";

const user = new UserService();

export const UserDeclarationMinValueForm = ({ item }) => {
    const quertClient = useQueryClient();

    console.log(item);

    const {
        handleSubmit,
        register,
        setError,
        reset,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: { declarationMinValue: item.declarationMinValue || 0 },
    });

    useEffect(() => {
        reset(
            { declarationMinValue: item.declarationMinValue },
            { keepDirty: false },
        );
    }, [item.declarationMinValue]);

    const onSubmit = async (data) => {
        try {
            await user.updateDeclarationMinValue({ ...data, id: item.id });
            await quertClient.invalidateQueries(["user", item.id]);

            enqueueSnackbar(`минимальная сумма изменено!`, {
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
                        error={!!errors["declarationMinValue"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${item.id}-declarationMinValue`}
                        >
                            Минимальная сумма
                        </InputLabel>
                        <OutlinedInput
                            label={"Минимальная сумма"}
                            errors={errors}
                            {...register("declarationMinValue", {})}
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
                            id={`filled-adornment-amount-${item.id}-declarationMinValue`}
                        />
                        <FormHelperText>
                            {(errors?.["declarationMinValue"] &&
                                errors?.["declarationMinValue"]?.message) ||
                                ""}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
