"use client";

import { UserContext } from "../../../../../../components/wrappers/UserContextProvider";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import OnlyLoginUser from "../../../../../../components/wrappers/OnlyLoginUser";
import { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import {
    ACCOUNT_DOCUMENT_ROUTE,
    ACCOUNT_ROUTE,
} from "../../../../../../configs/routerLinks";
import { useParams } from "next/navigation";
import { $UserApi } from "../../../../../../http";
import SiteService from "../../../../../../services/SiteService";
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
import DeclarationService from "../../../../../../services/DeclarationService";
import Loading from "../../../../../../components/loading/Loading";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useRouter } from "../../../../../../i18n/navigation";

const declaration = new DeclarationService($UserApi);

export default observer(function Page() {
    const t = useTranslations();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const { user } = useContext(UserContext);
    useEffect(() => {
        (async function () {
            if (!user.id) return;
            setLoading(true);
            try {
                console.log(user.id);
                const { data } = await declaration.find(user.id);
                setData(data);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        })();
    }, [user]);

    if (loading) return <Loading />;

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
                            { name: t("pages.account.declaration.cash") },
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
                    <Inner user_id={user.id} data={data} />
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
    { name: "ILS" },
    { name: "USD" },
    { name: "EUR" },
    { name: "RUB" },
    { name: "GBP" },
    { name: "CAD" },
    { name: "AUD" },
    { name: "JPY" },
    { name: "CHF" },
];

function Inner({ user_id, data }) {
    const t = useTranslations();

    const { token } = useParams();
    const handleChange = () => {
        clearErrors("root");
    };

    const cR = !data || data?.length === 0 ? currencies : data;

    console.log(data);
    console.log(cR);
    const router = useRouter();

    const {
        handleSubmit,
        reset,
        register,
        setError,
        trigger,
        control,
        clearErrors,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            cash: {
                name: "",
                date: "",
                currencies: [{ currency: "", sum: 0 }],
            },
        },
    });

    const {
        fields: cashCurrencies,
        append: appendCash,
        remove: removeCash,
    } = useFieldArray({
        control,
        name: "cash.currencies",
    });

    const onSubmit = async (data) => {
        try {
            await site.sendTelegram({
                ...data,
                user_id,
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
    console.log(errors);

    return (
        <Box
            id={"sendForm"}
            pb={5}
            display={"flex"}
            flexDirection={"column"}
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
                        {t("pages.account.declaration.cash")}
                    </StyledDivider>
                    <Grid2 spacing={2} columns={2} container gap={"15px"}>
                        <Grid2 size={{ xs: 2, md: 1 }}>
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
                                    register={register("cash.name", {
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
                        <Grid2 size={{ xs: 2, md: 1 }}>
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
                                    register={register("cash.date", {
                                        required: t("form.required"),
                                    })}
                                />
                            </Box>
                        </Grid2>
                        {cashCurrencies.map((field, index, a) => {
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
                                        {t("form.sum")}
                                    </Typography>
                                    <Box gap={1} flex={1} display={"flex"}>
                                        <Controller
                                            control={control}
                                            name={`cash.currencies[${index}].currency`}
                                            rules={{
                                                required: t("form.required"),
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
                                                        error={!!error}
                                                        variant="outlined"
                                                    >
                                                        <Select
                                                            // sx={{}}}
                                                            value={value}
                                                            onChange={({
                                                                target,
                                                            }) => {
                                                                onChange(
                                                                    target?.value,
                                                                );
                                                            }}
                                                            sx={{
                                                                "& .MuiSelect-select":
                                                                    {
                                                                        p: "5px",
                                                                    },
                                                            }}
                                                            MenuProps={{
                                                                sx: {
                                                                    "& .MuiPaper-root":
                                                                        {
                                                                            bgcolor:
                                                                                "#fff",
                                                                        },
                                                                },
                                                            }}
                                                        >
                                                            {cR.map(
                                                                ({ name }) => (
                                                                    <MenuItem
                                                                        key={
                                                                            name
                                                                        }
                                                                        value={
                                                                            name
                                                                        }
                                                                    >
                                                                        {name}
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                        </Select>
                                                        <FormHelperText>
                                                            {error?.message}
                                                        </FormHelperText>
                                                    </StyledFormControl>
                                                );
                                            }}
                                        />
                                        <Box flex={1}>
                                            <Controller
                                                control={control}
                                                name={`cash.currencies[${index}].sum`}
                                                rules={{
                                                    required:
                                                        t("form.required"),
                                                    pattern: {
                                                        value: SUM_PATTERN,
                                                        message:
                                                            t("form.pattern"),
                                                    },
                                                    min: {
                                                        value: SUM_MIN_VALUE,
                                                        message: t("form.min", {
                                                            value: SUM_MIN_VALUE,
                                                        }),
                                                    },
                                                    // max: {
                                                    //     value: SUM_MAX_VALUE,
                                                    //     message: `maximum ${SUM_MAX_VALUE}`,
                                                    // },
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
                                                                sx={{
                                                                    input: {
                                                                        p: "5px",
                                                                    },
                                                                }}
                                                                type="number"
                                                                id={`filled-adornment-amount-sum-cash-${field.id}`}
                                                                value={value}
                                                                onChange={({
                                                                    target,
                                                                }) => {
                                                                    onChange(
                                                                        target?.value,
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
                                    </Box>
                                    {a.length > 1 && (
                                        <IconButton
                                            onClick={() => removeCash(index)}
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
                                        const isValid =
                                            await trigger("cash.currencies");
                                        console.log(isValid);
                                        if (!isValid) return;
                                        appendCash({
                                            currency: "",
                                            sum: 0,
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
                    </Grid2>
                    <Button
                        variant="outlined"
                        // sx={{ bgcolor: red[50] }}
                        onClick={(event) => {
                            router.push(ACCOUNT_DOCUMENT_ROUTE(token));
                        }}
                    >
                        <ReceiptLongIcon color="dif" />

                        <Typography color="dif" variant="body1">
                            {t("pages.account.document.name")}
                        </Typography>
                    </Button>
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
