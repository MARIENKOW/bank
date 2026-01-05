"use client";

import {
    Box,
    FormHelperText,
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
import DragAndDrop from "../../components/form/DragAndDrop";
import UserService from "../../services/UserService";
import { useQueryClient } from "@tanstack/react-query";

const user = new UserService();

export const BankerForm = ({ value, id }) => {
    const queryClient = useQueryClient();
    const defaultValues = {
        banker_name: value.banker_name,
        banker_phone: value.banker_phone,
        banker_job: value.banker_job,
        banker_whatsup: value.banker_whatsup,
        banker_img_id: value.banker_img_id,
    };
    const {
        handleSubmit,
        register,
        control,
        setError,
        resetField,
        clearErrors,
        getValues,
        reset,
        setValue,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues,
    });

    useEffect(() => {
        console.log("reset");
        reset(defaultValues, { keepDirty: false });
    }, [value]);
    console.log(getValues());

    const onSubmit = async (data) => {
        try {
            await user.bankerUpdate({ ...data, id });
            await queryClient.invalidateQueries({ queryKey: ["user", id] });

            enqueueSnackbar(`сотрудник изменен!`, { variant: "success" });
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
                <Box flexDirection={"column"} gap={1} display={"flex"}>
                    <DragAndDrop
                        clearErrors={clearErrors}
                        setError={setError}
                        control={control}
                        name={"banker_img_id"}
                        rules={{}}
                        sx={{ borderRadius: "10px" }}
                        resetField={resetField}
                        setValue={setValue}
                        imgdefault={value?.img?.path}
                    />
                    <FormControl
                        error={!!errors["banker_name"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-banker_name`}
                        >
                            Имя
                        </InputLabel>
                        <OutlinedInput
                            label={"Имя"}
                            errors={errors}
                            {...register("banker_name")}
                            id={`filled-adornment-amount-banker_name`}
                        />
                        <FormHelperText>
                            {errors?.["banker_name"]?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        error={!!errors["banker_phone"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-banker_phone`}
                        >
                            Телефон
                        </InputLabel>
                        <OutlinedInput
                            label={"Телефон"}
                            errors={errors}
                            {...register("banker_phone")}
                            id={`filled-adornment-amount-banker_phone`}
                        />
                        <FormHelperText>
                            {errors?.["banker_phone"]?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        error={!!errors["banker_job"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-banker_job`}
                        >
                            Должность
                        </InputLabel>
                        <OutlinedInput
                            label={"Должность"}
                            errors={errors}
                            {...register("banker_job")}
                            id={`filled-adornment-amount-banker_job`}
                        />
                        <FormHelperText>
                            {errors?.["banker_job"]?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        error={!!errors["banker_whatsup"]}
                        variant="outlined"
                    >
                        <InputLabel
                            htmlFor={`filled-adornment-amount-banker_whatsup`}
                        >
                            WhatsUp
                        </InputLabel>
                        <OutlinedInput
                            label={"WhatsUp"}
                            errors={errors}
                            {...register("banker_whatsup")}
                            id={`filled-adornment-amount-banker_whatsup`}
                        />
                        <FormHelperText>
                            {errors?.["banker_whatsup"]?.message}
                        </FormHelperText>
                    </FormControl>
                    <StyledLoadingButton
                        type="submit"
                        sx={{ height: "100%" }}
                        loading={isSubmitting}
                        disabled={!isValid || !isDirty}
                        endIcon={<DoubleArrowIcon />}
                        variant="contained"
                    ></StyledLoadingButton>
                </Box>
            </form>
        </Box>
    );
};
