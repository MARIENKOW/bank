"use client";

import {
    Box,
    FormHelperText,
    InputAdornment,
    InputLabel,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { CanceledError } from "axios";
import SiteService from "../../services/SiteService";

const site = new SiteService();

export const WhatsUpForm = ({ value, getData }) => {
    const {
        handleSubmit,
        register,
        setError,
        getValues,
        reset,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: { value },
    });

    console.log(value);

    useEffect(() => {
        console.log(value);
        reset({ name: value }, { keepDirty: false });
    }, [value]);

    console.log(isDirty);

    const onSubmit = async (data) => {
        try {
            await site.setWhatsUp(data);
            await getData();

            enqueueSnackbar(`WhatsUp изменено!`, { variant: "success" });
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
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display={"flex"}>
                    <FormControl error={!!errors["value"]} variant="outlined">
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${value}`}
                        >
                            ссылка
                        </InputLabel>
                        <OutlinedInput
                            label={"ссылка"}
                            errors={errors}
                            {...register("value")}
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
                            id={`filled-adornment-amount-${value}`}
                        />
                        <FormHelperText>
                            {errors?.["value"]?.message}
                        </FormHelperText>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
};
