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
import DragAndDrop from "../../components/form/DragAndDrop";

const site = new SiteService();

export const BankerForm = ({ value, getData }) => {
    const {
        handleSubmit,
        register,
        setError,
        reset,

        formState: { errors, isValid, isSubmitting, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: { value },
    });

    useEffect(() => {
        console.log(value);
        reset({ name: value }, { keepDirty: false });
    }, [value]);

    const onSubmit = async (data) => {
        try {
            await site.setBanker(data);
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

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box flexDirection={"column"} gap={1} display={"flex"}>
                    {/* <DragAndDrop
                        clearErrors={clearErrors}
                        setError={setError}
                        control={control}
                        name={"img"}
                        rules={{
                            required: "required field",
                        }}
                        sx={{ borderRadius: "10px" }}
                        resetField={resetField}
                        setValue={setValue}
                        imgdefault={data?.img?.path}
                    /> */}
                    <FormControl error={!!errors["value"]} variant="outlined">
                        <InputLabel
                            htmlFor={`filled-adornment-amount-${value}`}
                        >
                            Номер
                        </InputLabel>
                        <OutlinedInput
                            label={"Номер"}
                            errors={errors}
                            {...register("value")}
                            // endAdornment={
                            //     <InputAdornment
                            //         sx={{ display: "flex", gap: 1 }}
                            //         position="end"
                            //     >
                            //         <StyledLoadingButton
                            //             type="submit"
                            //             sx={{ height: "100%" }}
                            //             loading={isSubmitting}
                            //             disabled={!isValid || !isDirty}
                            //             endIcon={<DoubleArrowIcon />}
                            //             variant="contained"
                            //         ></StyledLoadingButton>
                            //     </InputAdornment>
                            // }
                            id={`filled-adornment-amount-${value}`}
                        />
                        <FormHelperText>
                            {errors?.["value"]?.message}
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
