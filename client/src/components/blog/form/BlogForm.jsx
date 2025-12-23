"use client";

import { List } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DragAndDrop from "../../form/DragAndDrop";
import { StyledAlert } from "../../form/StyledAlert";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";
import { StyledTextField } from "../../form/StyledTextField";
import Grid from "@mui/material/Grid2";
import TextEditor from "./TextEditor/TextEditor";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { languages } from "../../../i18n";
import { useLocale } from "next-intl";

import {
    POST_BODY_MAX_LENGTH,
    POST_BODY_MIN_LENGTH,
    POST_TITLE_MAX_LENGTH,
    POST_TITLE_MIN_LENGTH,
} from "../../../configs/validateConfig";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const VideosIdContext = createContext();

const BlogForm = ({ data = {}, onSubmit, btn = "Опубликовать", blogsData }) => {
    const locale = useLocale();
    const [blogLocale, setBlogLocale] = useState(locale);
    const [body, setBody] = useState(data?.body || null);
    const [videos_id, setVideos_id] = useState(data?.videos_id || []);

    // const defaultValues = {
    //     body: data?.body || "",
    //     img: data?.img || null,
    //     title: data?.title || "",
    //     date: dayjs(data?.date),
    // };

    const {
        handleSubmit,
        register,
        setError,
        clearErrors,
        control,
        resetField,
        getValues,
        reset,
        setValue,
        formState: {
            errors,
            isValid,
            isSubmitting,

            isDirty,
            dirtyFields,
            validatingFields,
        },
    } = useForm({
        mode: "onChange",
        // defaultValues: { ...data, date: dayjs(data?.date) },
        defaultValues: blogsData[blogLocale],
    });

    const handleChangeLanguage = ({ target }) => {
        setBlogLocale(target?.value);
        reset(blogsData[target?.value]);
    };

    blogsData[blogLocale] = getValues();

    useEffect(() => {
        // resetField();
        console.log(blogsData);
    }, [blogLocale]);
    // blogsData[blogLocale] = getValues();

    const handleChange = () => {
        clearErrors("root");
    };

    return (
        <form
            onChange={handleChange}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={handleSubmit(onSubmit({ body, videos_id }, setError))}
        >
            <FormControl
                size="small"
                sx={{ display: "inline-block", minWidth: 25, mb: 3 }}
                fullWidth
            >
                <Select
                    variant="standard"
                    sx={{ width: "100%" }}
                    value={blogLocale}
                    onChange={handleChangeLanguage}
                    MenuProps={{
                        sx: {
                            "& .MuiPaper-root": {
                                bgcolor: "secondary.main",
                            },
                        },
                    }}
                >
                    {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            {/* <ReactCountryFlag
                            svg
                            style={{ width: "1.5em", height: "1.5em" }}
                            countryCode={lang === "en" ? "us" : lang}
                        /> */}
                            <Typography variant="body1" color="primary">
                                {lang}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={{ xs: 3, md: 2 }} columns={10}>
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 200,
                    }}
                    size={{ xs: 10, md: 5 }}
                >
                    <DragAndDrop
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
                    />
                </Grid>
                <Grid
                    display={"flex"}
                    flexDirection={"column"}
                    flex={1}
                    justifyContent={"space-between"}
                    gap={3}
                    alignItems={"end"}
                    size={{ xs: 10, md: 5 }}
                >
                    <List sx={{ width: "100%" }}>
                        <StyledTextField
                            errors={errors}
                            register={register("title", {
                                required: "обовязательное поле",
                                maxLength: {
                                    value: POST_TITLE_MAX_LENGTH,
                                    message: `максимум ${POST_TITLE_MAX_LENGTH} символов`,
                                },
                                minLength: {
                                    value: POST_TITLE_MIN_LENGTH,
                                    message: `минимум ${POST_TITLE_MIN_LENGTH} символов`,
                                },
                            })}
                            options={{ fullWidth: true }}
                            label="Заголовок"
                        />
                    </List>
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
                                        ruRU.components.MuiLocalizationProvider
                                            .defaultProps.localeText
                                    }
                                >
                                    <DatePicker
                                        onChange={(v) => {
                                            onChange(v);
                                        }}
                                        slotProps={{
                                            textField: {
                                                error: !!error,
                                                helperText:
                                                    error?.message || "",
                                            },
                                        }}
                                        value={value}
                                        sx={{
                                            width: { xs: "100%", md: "auto" },
                                        }}
                                        label="Дата"
                                        format="DD.MM.YYYY"
                                    />
                                </LocalizationProvider>
                            );
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 10 }}>
                    <Controller
                        control={control}
                        name={"body"}
                        rules={{
                            required: "обов'язкове поле",
                            maxLength: {
                                value: POST_BODY_MAX_LENGTH,
                                message: `максимум ${POST_BODY_MAX_LENGTH} символів`,
                            },
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <VideosIdContext.Provider value={{ setVideos_id }}>
                                <TextEditor
                                    onChange={onChange}
                                    error={error}
                                    // setVideos_id={setVideos_id}
                                    value={value}
                                    setBody={setBody}
                                />
                            </VideosIdContext.Provider>
                        )}
                    />
                </Grid>
            </Grid>
            {errors?.root?.server && (
                <StyledAlert severity="error" variant="filled" hidden={true}>
                    {errors?.root?.server?.message}
                </StyledAlert>
            )}
            <StyledLoadingButton
                loading={isSubmitting}
                endIcon={<DoubleArrowIcon />}
                // disabled={!isValid || !isDirty}
                type="submit"
                sx={{ mt: errors?.root?.server ? 0 : 3 }}
                variant="contained"
            >
                {btn}
            </StyledLoadingButton>
        </form>
    );
};

export default BlogForm;
