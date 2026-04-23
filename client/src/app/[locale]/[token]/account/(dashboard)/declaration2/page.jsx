"use client";

import { UserContext } from "../../../../../../components/wrappers/UserContextProvider";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import OnlyLoginUser from "../../../../../../components/wrappers/OnlyLoginUser";
import { useContext, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ACCOUNT_ROUTE } from "../../../../../../configs/routerLinks";
import { useParams } from "next/navigation";
import { $UserApi } from "../../../../../../http";
import SiteService from "../../../../../../services/SiteService";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { DeleteForeverOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import {
    Box,
    Button,
    CircularProgress,
    FormHelperText,
    Grid2,
    IconButton,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
} from "../../../../../../configs/validateConfig";
import { StyledLoadingButton } from "../../../../../../components/form/StyledLoadingButton";
import { StyledAlert } from "../../../../../../components/form/StyledAlert";
import { StyledTextField } from "../../../../../../components/form/StyledTextField";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyledFormControl } from "../../../../../../components/form/StyledPassword";

export default observer(function Page() {
    const t = useTranslations();
    const { token } = useParams();
    return (
        <OnlyLoginUser>
            <ContainerComponent>
                <Box display={"flex"}>
                    <BreadcrumbsComponent
                        user={true}
                        main={false}
                        options={[
                            {
                                name: t("pages.account.name"),
                                link: ACCOUNT_ROUTE(token),
                            },
                            { name: t("pages.account.declaration.jewels") },
                        ]}
                        sx={{
                            display: "inline-flex",
                            ol: {
                                borderRadius: 0.5,
                                display: "inline-flex",
                                padding: "5px 15px",
                            },
                        }}
                    />
                </Box>
                <Box
                    display={"flex"}
                    mt={4}
                    flexDirection={"column"}
                    flex={1}
                    mb={10}
                >
                    <Inner />
                </Box>
            </ContainerComponent>
        </OnlyLoginUser>
    );
});

export function StyledTyB({ children }) {
    return (
        <Typography whiteSpace={"nowrap"} fontSize={13} fontWeight={600} variant="body1">
            {children}
        </Typography>
    );
}

export function StyledTyG({ children }) {
    return (
        <Typography lineHeight={1} fontSize={13} color="text.secondary" fontWeight={500} variant="body1">
            {children}
        </Typography>
    );
}

export function StyledTab({ children }) {
    return (
        <Box columnGap={1} display={"flex"} alignItems={"center"}>
            {children}
        </Box>
    );
}

export function StyledDivider({ children }) {
    return (
        <Box
            sx={{
                border: "1px solid #000",
                borderColor: "secondary.dark",
                bgcolor: "secondary.main",
                borderRadius: 1,
            }}
        >
            <ContainerComponent>
                <Typography fontWeight={500} variant="body1" color="initial">
                    {children}
                </Typography>
            </ContainerComponent>
        </Box>
    );
}

const site = new SiteService($UserApi);

function ImagePreviewItem({ src, onRemove }) {
    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "100%",
                borderRadius: 1.5,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "action.hover",
            }}
        >
            <Box
                component="img"
                src={src}
                alt="preview"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <IconButton
                onClick={onRemove}
                size="small"
                sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    p: 0,
                    bgcolor: "background.paper",
                    borderRadius: "50%",
                    "&:hover": { bgcolor: "background.paper" },
                }}
            >
                <HighlightOffTwoToneIcon
                    color="error"
                    sx={{ width: 24, height: 24 }}
                />
            </IconButton>
        </Box>
    );
}

function ImageUploadField({ previews, onAdd, onRemove, error, loading, t }) {
    const inputRef = useRef();

    const handleInputChange = (event) => {
        const files = Array.from(event.target.files || []);
        if (files.length) onAdd(files);
        event.target.value = "";
    };

    return (
        <Box display="flex" flexDirection="column" gap={1.5}>
            {previews.length > 0 && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 1,
                    }}
                >
                    {previews.map((item, index) => (
                        <ImagePreviewItem
                            key={index}
                            src={item.preview}
                            loading={loading}
                            onRemove={() => onRemove(index)}
                        />
                    ))}
                </Box>
            )}
            <input
                ref={inputRef}
                accept="image/*"
                style={{ display: "none" }}
                multiple
                type="file"
                onChange={handleInputChange}
            />
            <Button
                endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <FileUploadIcon />}
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                onClick={() => inputRef.current?.click()}
            >
                {t("buttons.load")}
            </Button>
            {error && (
                <FormHelperText error sx={{ mx: "14px", mt: 0 }}>
                    {error.message}
                </FormHelperText>
            )}
        </Box>
    );
}

function Inner() {
    const { user } = useContext(UserContext);
    const t = useTranslations();

    const [imgPreviews, setImgPreviews] = useState([]);
    const [imgLoading, setImgLoading] = useState(false);

    const {
        handleSubmit,
        register,
        setError,
        trigger,
        control,
        clearErrors,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            jewels: {
                name: "",
                date: "",
                currencies: [{ text: "" }],
                img: [],
            },
        },
    });

    const {
        fields: jewelCurrencies,
        append: appendJewels,
        remove: removeJewels,
    } = useFieldArray({
        control,
        name: "jewels.currencies",
    });

    const handleChange = () => clearErrors("root");

    const handleAddImages = (files, onChange) => {
        clearErrors("jewels.img");
        setImgLoading(true);

        const readers = files.map(
            (file) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (reader.result.startsWith("data:image")) {
                            resolve({ preview: reader.result, file });
                        } else {
                            resolve(null);
                        }
                    };
                    reader.readAsDataURL(file);
                })
        );

        Promise.all(readers).then((results) => {
            setImgLoading(false);
            const valid = results.filter(Boolean);
            if (valid.length < files.length) {
                setError("jewels.img", { message: "Oops! incorrect data" });
            }
            setImgPreviews((prev) => [...prev, ...valid]);
            onChange([...(getValues("jewels.img") || []), ...valid.map((v) => v.file)]);
        });
    };

    const handleRemoveImage = (index, onChange) => {
        setImgPreviews((prev) => prev.filter((_, i) => i !== index));
        const current = getValues("jewels.img") || [];
        onChange(current.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        try {
            await site.sendTelegram({ ...data, user_id: user?.id });
            enqueueSnackbar(t("fields.declaration.success"), { variant: "success" });
        } catch (e) {
            console.error(e);
            if (e?.response?.status === 400) {
                const errs = e?.response?.data || {};
                for (let key in errs) {
                    setError(key, { type: "server", message: errs[key] });
                }
                return;
            }
            setError("root.server", {
                type: "server",
                message: t("form.error.message"),
            });
        }
    };

    return (
        <Box
            id="sendForm"
            pb={5}
            display="flex"
            flexDirection="column"
            maxWidth={700}
            width="100%"
            margin="0 auto"
            mt={5}
        >
            <Box display="flex">
                <form
                    onChange={handleChange}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        width: "100%",
                        margin: "0 auto",
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <StyledDivider>
                        {t("pages.account.declaration.jewels")}
                    </StyledDivider>

                    <Grid2 spacing={20} columns={2} container gap={5}>
                        <Grid2 size={{ xs: 2, md: 2 }}>
                            <Box gap={1} display="flex">
                                <Typography
                                    textAlign="center"
                                    flex="0 0 75px"
                                    variant="body1"
                                    fontWeight="600"
                                    fontSize={13}
                                >
                                    {t("form.name")}
                                </Typography>
                                <StyledTextField
                                    variant="outlined"
                                    options={{ sx: { input: { p: "5px" } } }}
                                    errors={errors}
                                    register={register("jewels.name", {
                                        required: t("form.required"),
                                        minLength: {
                                            value: NAME_MIN_LENGTH,
                                            message: t("form.minLength", { value: NAME_MIN_LENGTH }),
                                        },
                                        maxLength: {
                                            value: NAME_MAX_LENGTH,
                                            message: t("form.maxLength", { value: NAME_MAX_LENGTH }),
                                        },
                                    })}
                                />
                            </Box>
                        </Grid2>

                        <Grid2 size={{ xs: 2, md: 2 }}>
                            <Box gap={1} display="flex">
                                <Typography
                                    textAlign="center"
                                    flex="0 0 75px"
                                    variant="body1"
                                    fontWeight="600"
                                    fontSize={13}
                                >
                                    {t("form.date")}
                                </Typography>
                                <StyledTextField
                                    variant="outlined"
                                    options={{ sx: { input: { p: "5px" } }, variant: "outlined" }}
                                    errors={errors}
                                    register={register("jewels.date", {
                                        required: t("form.required"),
                                    })}
                                />
                            </Box>
                        </Grid2>

                        <Box width="100%">
                            {jewelCurrencies.map((field, index, a) => (
                                <Grid2
                                    size={{ xs: 2, md: 2 }}
                                    display="flex"
                                    key={field.id}
                                    gap={1}
                                >
                                    <Typography
                                        textAlign="center"
                                        flex="0 0 75px"
                                        variant="body1"
                                        fontWeight="600"
                                        fontSize={13}
                                    >
                                        {t("form.text")}
                                    </Typography>
                                    <Box gap={1} flex={1} display="flex">
                                        <Controller
                                            control={control}
                                            name={`jewels.currencies[${index}].text`}
                                            rules={{ required: t("form.required") }}
                                            render={({
                                                field: { value, onChange },
                                                fieldState: { error },
                                            }) => (
                                                <StyledFormControl
                                                    fullWidth
                                                    error={!!error}
                                                    variant="outlined"
                                                >
                                                    <OutlinedInput
                                                        rows={2}
                                                        multiline
                                                        sx={{ input: { p: "5px" } }}
                                                        type="number"
                                                        id={`filled-adornment-amount-sum-text-${field.id}`}
                                                        value={value}
                                                        onChange={({ target }) => onChange(target.value)}
                                                    />
                                                    <FormHelperText>{error?.message}</FormHelperText>
                                                </StyledFormControl>
                                            )}
                                        />
                                    </Box>
                                    {a.length > 1 && (
                                        <IconButton onClick={() => removeJewels(index)} color="error">
                                            <DeleteForeverOutlined />
                                        </IconButton>
                                    )}
                                </Grid2>
                            ))}

                            <Grid2 display="flex" gap={1} size={2}>
                                <Box width="75px" />
                                <Box flex={1}>
                                    <Button
                                        onClick={async () => {
                                            const valid = await trigger("jewels.currencies");
                                            if (!valid) return;
                                            appendJewels({ text: "" });
                                        }}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        color="dif"
                                        sx={{ p: 0.5 }}
                                    >
                                        <Box
                                            width="100%"
                                            borderRadius={1}
                                            justifyContent="center"
                                            border="2px solid #fff"
                                            borderColor="dif.main"
                                            display="inline-flex"
                                        >
                                            <AddIcon color="dif" />
                                        </Box>
                                    </Button>
                                </Box>
                            </Grid2>
                        </Box>

                        <Grid2 mt={2} display="flex" gap={1} size={2}>
                            <Typography
                                textAlign="center"
                                flex="0 0 75px"
                                variant="body1"
                                fontWeight="600"
                                fontSize={13}
                            >
                                {t("form.img")}
                            </Typography>
                            <Box flex={1}>
                                <Controller
                                    control={control}
                                    name="jewels.img"
                                    render={({ field: { onChange }, fieldState: { error } }) => (
                                        <ImageUploadField
                                            previews={imgPreviews}
                                            error={error}
                                            loading={imgLoading}
                                            t={t}
                                            onAdd={(files) => handleAddImages(files, onChange)}
                                            onRemove={(index) => handleRemoveImage(index, onChange)}
                                        />
                                    )}
                                />
                            </Box>
                        </Grid2>
                    </Grid2>

                    {errors?.root?.server && (
                        <StyledAlert severity="error" variant="filled" hidden>
                            {errors.root.server.message}
                        </StyledAlert>
                    )}

                    <StyledLoadingButton
                        loading={isSubmitting}
                        type="submit"
                        sx={{ mt: errors?.root?.server ? 0 : 3 }}
                        variant="contained"
                        color="primary"
                    >
                        {t("form.submit")}
                    </StyledLoadingButton>
                </form>
            </Box>
        </Box>
    );
}
