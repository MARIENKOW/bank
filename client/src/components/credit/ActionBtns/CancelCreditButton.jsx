import CreditService from "../../../services/CreditService";
import CancelIcon from "@mui/icons-material/Cancel";

import {
    Box,
    Button,
    FilledInput,
    FormHelperText,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
    SUM_MAX_VALUE,
    SUM_MIN_VALUE,
    SUM_PATTERN,
} from "../../../configs/validateConfig";
import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { STF, StyledTextField } from "../../form/StyledTextField";
import { useQueryClient } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";
import { StyledFormControl } from "../../form/StyledPassword";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const creditF = new CreditService();

export default function CancelCreditButton({ credit }) {
    const input = useRef();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const t = useTranslations();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        register,
        control,
        reset,
        setError,
        trigger,
        getValues,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: { date: dayjs(credit?.date), sum: credit?.sum },
    });

    const onSubmit = async (data) => {
        try {
            console.log(data?.date?.format("YYYY-MM-DD"));
            await creditF.setCancel({
                ...data,
                id: credit?.id,
                user_id: credit?.user_id,
                date: data?.date?.format("YYYY-MM-DD") || null,
            });
            await queryClient.invalidateQueries({
                queryKey: ["user", String(credit.user_id)],
            });
            await queryClient.invalidateQueries({
                queryKey: ["credits", String(credit.user_id)],
            });
            enqueueSnackbar(`кредит отменено!`, {
                variant: "success",
            });
            handleClose();
            reset();
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


    // const handleFileChange = (file) => {
    //     clearErrors("document");
    //     setLoading(true);
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setLoading(false);
    //         // if (reader.result.startsWith("data:image"))
    //         //     return setImagePreview(reader.result);
    //         // setError("document", { message: "Oops! incorrect data" });
    //     };
    //     reader.readAsDataURL(file);
    // };

    return (
        <>
            <StyledLoadingButton
                variant="contained"
                size="small"
                sx={{ p: 1, minWidth: "10px" }}
                color="warning"
                onClick={handleClickOpen}
            >
                <CancelIcon />
            </StyledLoadingButton>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box
                            flexDirection={"row"}
                            flexWrap={"wrap"}
                            gap={1}
                            display={"flex"}
                        >
                            <Controller
                                control={control}
                                name={"date"}
                                rules={{
                                    required: "обязательное поле",
                                }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => {
                                    return (
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                            adapterLocale="ru"
                                            localeText={
                                                ruRU.components
                                                    .MuiLocalizationProvider
                                                    .defaultProps.localeText
                                            }
                                        >
                                            <DatePicker
                                                slotProps={{
                                                    textField: {
                                                        // component:<STF/>,
                                                        sx: {
                                                            width: "100%",
                                                            "& .MuiPickersInputBase-root":
                                                                {
                                                                    bgcolor:
                                                                        "#fff",
                                                                },
                                                        },
                                                        // color:'secondary',
                                                        variant: "filled",
                                                        error: !!errors?.date,
                                                        helperText:
                                                            errors?.date
                                                                ?.message || "",
                                                    },
                                                }}
                                                onChange={(v) => {
                                                    onChange(v);
                                                }}
                                                value={value}
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        md: "100%",
                                                    },
                                                }}
                                                format="DD.MM.YYYY"
                                            />
                                        </LocalizationProvider>
                                    );
                                }}
                            />
                            <Controller
                                control={control}
                                name="sum"
                                rules={{
                                    required: "required field",
                                    pattern: {
                                        value: SUM_PATTERN,
                                        message:
                                            "value must be in the format - 99 or 99.99",
                                    },
                                    min: {
                                        value: SUM_MIN_VALUE,
                                        message: `minimum ${SUM_MIN_VALUE}`,
                                    },
                                    max: {
                                        value: SUM_MAX_VALUE,
                                        message: `maximum ${SUM_MAX_VALUE}`,
                                    },
                                }}
                                render={({
                                    field: { value, onChange, name },
                                    formState: { errors },
                                }) => {
                                    return (
                                        <StyledFormControl
                                            fullWidth
                                            error={!!errors?.sum}
                                            variant="filled"
                                        >
                                            <InputLabel
                                                htmlFor={`filled-adornment-amount-sum`}
                                            >
                                                Сумма
                                            </InputLabel>
                                            <FilledInput
                                                type="number"
                                                id={`filled-adornment-amount-sum`}
                                                value={value}
                                                onChange={({ target }) => {
                                                    onChange(target?.value);
                                                }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        {t("currency", {
                                                            value: "",
                                                        })}
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText>
                                                {errors?.sum?.message}
                                            </FormHelperText>
                                        </StyledFormControl>
                                    );
                                }}
                            />
                            <Controller
                                control={control}
                                name={"document"}
                                rules={{ required: "required field" }}
                                render={({
                                    field: { onChange },
                                    fieldState: { error },
                                }) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width:'100%'
                                        }}
                                    >
                                        <input
                                            ref={input}
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf"
                                            style={{ display: "none" }}
                                            id={`raised-button-file-${credit?.id}`}
                                            multiple
                                            type="file"
                                            onChange={(event) => {
                                                const files =
                                                    event.target.files;
                                                if (files && files[0]) {
                                                    // handleFileChange(files[0]);

                                                    onChange(files[0]);
                                                }
                                            }}
                                        />

                                        <Button
                                        endIcon={<FileUploadIcon />}
                                        variant="contained"
                                            color={
                                                errors?.document
                                                    ? "error"
                                                    : "secondary"
                                            }
                                            fullWidth
                                            onClick={() => {
                                                console.log(
                                                    input.current.click()
                                                );
                                            }}
                                        >
                                            Документ
                                        </Button>
                                        <FormHelperText
                                            sx={{ ml: "14px", mr: "14px" }}
                                            error={!!error}
                                        >
                                            {errors?.document?.message}
                                        </FormHelperText>
                                    </Box>
                                )}
                            />
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <StyledLoadingButton
                            type="submit"
                            sx={{ height: "100%" }}
                            loading={isSubmitting}
                            endIcon={<DoubleArrowIcon />}
                            variant="contained"
                        >
                            Подтвердить
                        </StyledLoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
