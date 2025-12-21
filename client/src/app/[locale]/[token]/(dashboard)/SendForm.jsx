"use client";

import {
    Box,
    FormHelperText,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    useTheme,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
    PHONE_MAX_LENGTH,
    PHONE_MIN_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    EMAIL_PATTERN,
    EMAIL_MAX_LENGTH,
    DESCRIPTION_MAX_LENGTH,
    PHONE_PATTERN,
} from "../../../../configs/validateConfig";
import { StyledLoadingButton } from "../../../../components/form/StyledLoadingButton";
import { StyledAlert } from "../../../../components/form/StyledAlert";
import { StyledTextField } from "../../../../components/form/StyledTextField";
import { StyledNumberField } from "../../../../components/form/StyledNumberField";
import SiteServise from "../../../../services/SiteService";
import { Subtitile } from "../../../../components/Subtitle";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";
import { StyledFormControl } from "../../../../components/form/StyledPassword";

const site = new SiteServise();

export default function SendForm({ children }) {
    const {
        handleSubmit,
        reset,
        register,
        setError,
        control,
        clearErrors,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: { appeal: "Стандартная жалоба" },
    });

    const handleChange = () => {
        clearErrors("root");
    };

    const onSubmit = async (data) => {
        try {
            await site.sendTelegram({
                ...data,
                birthday: data?.birthday?.format("YYYY-MM-DD") || null,
            });
            enqueueSnackbar(`жалобу отправлено!`, { variant: "success" });
            reset();
        } catch (e) {
            console.error(e);
            if (e?.response?.status === 400) {
                const errors = e?.response?.data || {};
                for (let key in errors) {
                    setError(key, { type: "server", message: errors[key] });
                }
                return;
            }
            setError("root.server", {
                type: "server",
                message: "Упс! что-то пошло не так, попробуйте позже",
            });
        }
    };

    return (
        <ContainerComponent>
            <Box
                id={"sendForm"}
                pb={5}
                display={"flex"}
                flexDirection={"column"}
                gap={3}
            >
                <Box pt={2}>
                    <Subtitile text={"Подать жалобу"} />
                </Box>
                <Box display={"flex"}>
                    <form
                        onChange={handleChange}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            // maxWidth: "700px",
                            width: "100%",
                            flex: "0 1 700px",
                            margin: "0 auto",
                        }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* <StyledTextField
                            errors={errors}
                            register={register("name", {
                                required: "обязательное поле",
                                minLength: {
                                    value: NAME_MIN_LENGTH,
                                    message: `минимум ${NAME_MIN_LENGTH} символов`,
                                },
                                maxLength: {
                                    value: NAME_MAX_LENGTH,
                                    message: `максимум ${NAME_MAX_LENGTH} символов`,
                                },
                            })}
                            label="ФИО"
                        />
                        <Grid2 spacing={2} columns={2} container gap={"15px"}>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <StyledTextField
                                    options={{ fullwidth: false }}
                                    errors={errors}
                                    register={register("email", {
                                        required: "обязательное поле",
                                        maxLength: {
                                            value: EMAIL_MAX_LENGTH,
                                            message: `максимум ${EMAIL_MAX_LENGTH} символов`,
                                        },
                                        pattern: {
                                            value: EMAIL_PATTERN,
                                            message:
                                                "почта должна быть формата - example@mail.com",
                                        },
                                    })}
                                    label="Email"
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <StyledNumberField
                                    label="Номер телефона"
                                    register={register("phone", {
                                        required: "обовязательное поле",
                                        maxLength: {
                                            value: PHONE_MAX_LENGTH,
                                            message: `максиум ${PHONE_MAX_LENGTH} символов`,
                                        },
                                        minLength: {
                                            value: PHONE_MIN_LENGTH,
                                            message: `минимум ${PHONE_MIN_LENGTH} символов`,
                                        },
                                        pattern: {
                                            value: PHONE_PATTERN,
                                            message: "некорректный формат",
                                        },
                                    })}
                                    errors={errors}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 spacing={2} columns={2} container gap={"15px"}>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <StyledTextField
                                    errors={errors}
                                    register={register("address", {
                                        required: "обязательное поле",
                                    })}
                                    label="Адрес"
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Controller
                                    control={control}
                                    name={"birthday"}
                                    rules={{
                                        required: "обязательное поле",
                                    }}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => {
                                        console.log(error);
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
                                                            sx: {
                                                                width: "100%",
                                                                "& .MuiPickersInputBase-root":
                                                                    {
                                                                        bgcolor:
                                                                            "#fff !important",
                                                                    },
                                                            },
                                                            variant: "filled",
                                                            error: !!errors?.birthday,
                                                            helperText:
                                                                errors?.birthday
                                                                    ?.message ||
                                                                "",
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
                                                    label="Дата рождения"
                                                    format="DD.MM.YYYY"
                                                />
                                            </LocalizationProvider>
                                        );
                                    }}
                                />
                            </Grid2>
                        </Grid2>
                        <StyledTextField
                            errors={errors}
                            register={register("price", {
                                required: "обязательное поле",
                            })}
                            label="Баланс (сумма возможного ущерба)"
                        /> */}
                        <Grid2 spacing={2} columns={2} container gap={"15px"}>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <StyledTextField
                                    errors={errors}
                                    register={register("name", {
                                        required: "обязательное поле",
                                        minLength: {
                                            value: NAME_MIN_LENGTH,
                                            message: `минимум ${NAME_MIN_LENGTH} символов`,
                                        },
                                        maxLength: {
                                            value: NAME_MAX_LENGTH,
                                            message: `максимум ${NAME_MAX_LENGTH} символов`,
                                        },
                                    })}
                                    label="Имя Фамилия"
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <StyledNumberField
                                    label="Номер телефона"
                                    register={register("phone", {
                                        required: "обовязательное поле",
                                        maxLength: {
                                            value: PHONE_MAX_LENGTH,
                                            message: `максиум ${PHONE_MAX_LENGTH} символов`,
                                        },
                                        minLength: {
                                            value: PHONE_MIN_LENGTH,
                                            message: `минимум ${PHONE_MIN_LENGTH} символов`,
                                        },
                                        pattern: {
                                            value: PHONE_PATTERN,
                                            message: "некорректный формат",
                                        },
                                    })}
                                    errors={errors}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 spacing={2} columns={2} container gap={"15px"}>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <StyledTextField
                                    errors={errors}
                                    register={register("address", {
                                        required: "обязательное поле",
                                    })}
                                    label="Адрес"
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 2, md: 1 }}>
                                <Controller
                                    control={control}
                                    name={"birthday"}
                                    rules={{
                                        required: "обязательное поле",
                                    }}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => {
                                        console.log(error);
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
                                                            sx: {
                                                                width: "100%",
                                                                "& .MuiPickersInputBase-root":
                                                                    {
                                                                        bgcolor:
                                                                            "#fff !important",
                                                                    },
                                                            },
                                                            variant: "filled",
                                                            error: !!errors?.birthday,
                                                            helperText:
                                                                errors?.birthday
                                                                    ?.message ||
                                                                "",
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
                                                    label="Дата рождения"
                                                    format="DD.MM.YYYY"
                                                />
                                            </LocalizationProvider>
                                        );
                                    }}
                                />
                            </Grid2>
                        </Grid2>
                        <Controller
                            control={control}
                            name={"appeal"}
                            rules={{
                                required: "обязательное поле",
                            }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => {
                                console.log(value);
                                return (
                                    <StyledFormControl
                                        error={!!errors?.appeal}
                                        variant="filled"
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Вид обращения
                                        </InputLabel>
                                        <Select
                                            onChange={(v) => {
                                                onChange(v);
                                            }}
                                            value={value}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={age}
                                            label="Вид обращения"

                                            // onChange={handleChange}
                                        >
                                            <MenuItem
                                                value={"Стандартная жалоба"}
                                            >
                                                Стандартная жалоба
                                            </MenuItem>
                                            <MenuItem
                                                value={"Экстренная жалоба"}
                                            >
                                                Экстренная жалоба
                                            </MenuItem>
                                        </Select>
                                        {errors?.appeal && (
                                            <FormHelperText>
                                                {errors?.appeal?.message}
                                            </FormHelperText>
                                        )}
                                    </StyledFormControl>
                                );
                            }}
                        />

                        <StyledTextField
                            errors={errors}
                            register={register("description", {
                                // required: "обовязательное поле",
                                maxLength: {
                                    value: DESCRIPTION_MAX_LENGTH,
                                    message: `максимум ${DESCRIPTION_MAX_LENGTH} символов`,
                                },
                            })}
                            options={{
                                multiline: true,
                                rows: 3,
                            }}
                            label="Описание"
                            helper={true}
                        />
                        {errors?.root?.server && (
                            <StyledAlert
                                severity="error"
                                variant="filled"
                                hidden={true}
                            >
                                {errors?.root?.server?.message}
                            </StyledAlert>
                        )}
                        <StyledLoadingButton
                            loading={isSubmitting}
                            endIcon={<DoubleArrowIcon />}
                            // disabled={!isValid}
                            type="submit"
                            sx={{ mt: errors?.root?.server ? 0 : 3 }}
                            variant="outlined"
                            color="secondary"
                        >
                            отправить
                        </StyledLoadingButton>
                    </form>
                </Box>
            </Box>
        </ContainerComponent>
    );
}
