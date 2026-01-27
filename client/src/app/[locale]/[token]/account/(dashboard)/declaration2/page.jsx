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

import {
    Box,
    Button,
    FilledInput,
    FormHelperText,
    Grid2,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    SUM_MAX_VALUE,
    SUM_MIN_VALUE,
    SUM_PATTERN,
} from "../../../../../../configs/validateConfig";
import { StyledLoadingButton } from "../../../../../../components/form/StyledLoadingButton";
import { StyledAlert } from "../../../../../../components/form/StyledAlert";
import { StyledTextField } from "../../../../../../components/form/StyledTextField";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyledFormControl } from "../../../../../../components/form/StyledPassword";
import { DeleteForeverOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

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
                                // backgroundColor: "#00427c",
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
        <Typography
            whiteSpace={"nowrap"}
            fontSize={13}
            fontWeight={600}
            variant="body1"
        >
            {children}
        </Typography>
    );
}
export function StyledTyG({ children }) {
    return (
        <Typography
            lineHeight={1}
            fontSize={13}
            color={grey[700]}
            fontWeight={500}
            variant="body1"
        >
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

const currencies = [
    { value: "ILS", symbol: "₪" },
    { value: "USD", symbol: "$" },
    { value: "EUR", symbol: "€" },
    { value: "RUB", symbol: "₽" },
    { value: "GBP", symbol: "£" },
    { value: "CAD", symbol: "C$" },
    { value: "AUD", symbol: "A$" },
    { value: "JPY", symbol: "¥" },
    { value: "CHF", symbol: "CHF" },
];

function Inner() {
    const { user } = useContext(UserContext);
    const inputImg = useRef();

    const t = useTranslations();

    const [loading, setLoading] = useState(false);
    const [imgPreview, setImagePreview] = useState();
    const handleFileChange = (file) => {
        clearErrors("jewels.img");
        setLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setLoading(false);
            if (reader.result.startsWith("data:image"))
                return setImagePreview(reader.result);
            setError("jewels.img", { message: "Oops! incorrect data" });
        };
        reader.readAsDataURL(file);
    };

    const handleChange = () => {
        clearErrors("root");
    };

    const {
        handleSubmit,
        reset,
        register,
        setError,
        trigger,
        control,
        clearErrors,
        getValues,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            jewels: {
                name: "",
                date: "",
                currencies: [{ text: "" }],
                img: "",
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

    const onSubmit = async (data) => {
        try {
            await site.sendTelegram({
                ...data,
                user_id: user?.id,
            });
            enqueueSnackbar(t("fields.declaration.success"), {
                variant: "success",
            });
            // reset();
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
                message: t("form.error.message"),
            });
        }
    };
    console.log(getValues());

    return (
        <Box
            id={"sendForm"}
            pb={5}
            display={"flex"}
            flexDirection={"column"}
            maxWidth={700}
            width={"100%"}
            margin={"0 auto"}
            mt={5}
            // gap={3}
        >
            {/* <Box pt={2}>
                    <Subtitile text={"Подать жалобу"} />
                </Box> */}
            <Box display={"flex"}>
                <form
                    onChange={handleChange}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        // maxWidth: "700px",
                        width: "100%",
                        // flex: "0 1 700px",
                        margin: "0 auto",
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <StyledDivider>
                        {t("pages.account.declaration.jewels")}
                    </StyledDivider>
                    <Grid2 spacing={20} columns={2} container gap={5}>
                        <Grid2 size={{ xs: 2, md: 2 }}>
                            <Box gap={1} display={"flex"}>
                                <Typography
                                    textAlign={"center"}
                                    flex={"0 0 75px"}
                                    variant="body1"
                                    fontWeight={"600"}
                                    fontSize={13}
                                    color="initial"
                                >
                                    {t("form.name")}
                                </Typography>
                                <StyledTextField
                                    variant="outlined"
                                    options={{
                                        sx: {
                                            input: {
                                                p: "5px",
                                            },
                                        },
                                    }}
                                    errors={errors}
                                    register={register("jewels.name", {
                                        required: t("form.required"),
                                        minLength: {
                                            value: NAME_MIN_LENGTH,
                                            message: t("form.minLength", {
                                                value: NAME_MIN_LENGTH,
                                            }),
                                        },
                                        maxLength: {
                                            value: NAME_MAX_LENGTH,
                                            message: t("form.maxLength", {
                                                value: NAME_MAX_LENGTH,
                                            }),
                                        },
                                    })}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 2, md: 2 }}>
                            <Box gap={1} display={"flex"}>
                                <Typography
                                    textAlign={"center"}
                                    flex={"0 0 75px"}
                                    variant="body1"
                                    fontWeight={"600"}
                                    fontSize={13}
                                    color="initial"
                                >
                                    {t("form.date")}
                                </Typography>
                                <StyledTextField
                                    variant="outlined"
                                    options={{
                                        sx: {
                                            input: {
                                                p: "5px",
                                            },
                                        },
                                        variant: "outlined",
                                    }}
                                    errors={errors}
                                    register={register("jewels.date", {
                                        required: t("form.required"),
                                    })}
                                    // label="Имя Фамилия"
                                />
                            </Box>
                        </Grid2>
                        <Box width={"100%"}>
                            {jewelCurrencies.map((field, index, a) => {
                                return (
                                    <Grid2
                                        size={{ xs: 2, md: 2 }}
                                        display={"flex"}
                                        key={field?.id}
                                        gap={1}
                                    >
                                        <Typography
                                            textAlign={"center"}
                                            flex={"0 0 75px"}
                                            variant="body1"
                                            fontWeight={"600"}
                                            fontSize={13}
                                            color="initial"
                                        >
                                            {t("form.text")}
                                        </Typography>
                                        <Box gap={1} flex={1} display={"flex"}>
                                            <Controller
                                                control={control}
                                                name={`jewels.currencies[${index}].text`}
                                                rules={{
                                                    required:
                                                        t("form.required"),
                                                }}
                                                render={({
                                                    field: {
                                                        value,
                                                        onChange,
                                                        name,
                                                    },
                                                    formState: { errors },
                                                    fieldState: { error },
                                                }) => {
                                                    return (
                                                        <StyledFormControl
                                                            fullWidth
                                                            error={!!error}
                                                            variant="outlined"
                                                        >
                                                            <OutlinedInput
                                                                rows={2}
                                                                multiline={true}
                                                                sx={{
                                                                    input: {
                                                                        p: "5px",
                                                                    },
                                                                }}
                                                                type="number"
                                                                id={`filled-adornment-amount-sum-text-${field.id}`}
                                                                value={value}
                                                                onChange={({
                                                                    target,
                                                                }) => {
                                                                    onChange(
                                                                        target?.value
                                                                    );
                                                                }}
                                                            />
                                                            <FormHelperText>
                                                                {error?.message}
                                                            </FormHelperText>
                                                        </StyledFormControl>
                                                    );
                                                }}
                                            />
                                        </Box>
                                        {a.length > 1 && (
                                            <IconButton
                                                onClick={() =>
                                                    removeJewels(index)
                                                }
                                                color="error"
                                            >
                                                <DeleteForeverOutlined />
                                            </IconButton>
                                        )}
                                    </Grid2>
                                );
                            })}
                            <Grid2 display={"flex"} gap={1} size={2}>
                                <Box width={"75px"}></Box>
                                <Box flex={1}>
                                    <Button
                                        onClick={async () => {
                                            const isValid = await trigger(
                                                "jewels.currencies"
                                            );
                                            if (!isValid) return;
                                            appendJewels({
                                                text: "",
                                            });
                                        }}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        color="dif"
                                        sx={{ p: 0.5 }}
                                    >
                                        <Box
                                            width={"100%"}
                                            borderRadius={1}
                                            justifyContent={"center"}
                                            border={"2px solid #fff"}
                                            borderColor={"dif.main"}
                                            display={"inline-flex"}
                                        >
                                            <AddIcon color="dif" />
                                        </Box>
                                    </Button>
                                </Box>
                            </Grid2>
                        </Box>
                        <Grid2 mt={2} display={"flex"} gap={1} size={2}>
                            <Typography
                                textAlign={"center"}
                                flex={"0 0 75px"}
                                variant="body1"
                                fontWeight={"600"}
                                fontSize={13}
                                color="initial"
                            >
                                {t("form.img")}
                            </Typography>
                            <Box flex={1}>
                                <Controller
                                    control={control}
                                    name={"jewels.img"}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) =>
                                        imgPreview ? (
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    flex: 1,
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                    alt="nft-image"
                                                    src={imgPreview}
                                                    component={"img"}
                                                />
                                                <IconButton
                                                    onClick={async () => {
                                                        setImagePreview(null);
                                                        onChange("");
                                                    }}
                                                    sx={{
                                                        position: "absolute",
                                                        top: "0",
                                                        right: "0",
                                                        transform:
                                                            "translate(50%,-50%)",
                                                    }}
                                                >
                                                    {loading ? (
                                                        <CircularProgress size="30px" />
                                                    ) : (
                                                        <HighlightOffTwoToneIcon
                                                            sx={{
                                                                bgcolor:
                                                                    "error.contrastText",
                                                                borderRadius:
                                                                    "99px",
                                                                width: 30,
                                                                height: 30,
                                                            }}
                                                            color="error"
                                                            fontSize="large"
                                                        />
                                                    )}
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%",
                                                }}
                                            >
                                                <input
                                                    ref={inputImg}
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    // id={`raised-button-file-${credit?.id}`}
                                                    multiple
                                                    type="file"
                                                    onChange={(event) => {
                                                        const files =
                                                            event.target.files;
                                                        if (files && files[0]) {
                                                            handleFileChange(
                                                                files[0]
                                                            );

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
                                                    onClick={() =>
                                                        inputImg?.current?.click()
                                                    }
                                                >
                                                    {t("buttons.load")}
                                                </Button>
                                                <FormHelperText
                                                    sx={{
                                                        ml: "14px",
                                                        mr: "14px",
                                                    }}
                                                    error={!!error}
                                                >
                                                    {errors?.document?.message}
                                                </FormHelperText>
                                            </Box>
                                        )
                                    }
                                />
                            </Box>
                        </Grid2>
                    </Grid2>
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
                        // endIcon={<DoubleArrowIcon />}
                        // disabled={!isValid}
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
