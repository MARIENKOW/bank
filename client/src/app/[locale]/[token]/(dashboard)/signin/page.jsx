"use client";

import { Box, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useContext } from "react";
// import { Context } from "../../../User";
import {
    PASSWORD_MAX_LENGTH,
    USERNAME_MAX_LENGTH,
} from "../../../../../configs/validateConfig";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@mui/material";
import { StyledLoadingButton } from "../../../../../components/form/StyledLoadingButton";
import { StyledAlert } from "../../../../../components/form/StyledAlert";
import { StyledPassword } from "../../../../../components/form/StyledPassword";
import { StyledTextField } from "../../../../../components/form/StyledTextField";
import { useTranslations } from "next-intl";
import InCenter from "../../../../../components/wrappers/InCenter";
import OnlyLogoutUser from "../../../../../components/wrappers/OnlyLogoutUser";
import { UserContext } from "../../../../../components/wrappers/UserContextProvider";
import BreadcrumbsComponent from "../../../../../components/BreadcrumbsComponent";
import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
const SignIn = () => {
    const t = useTranslations();

    const { signInUser } = useContext(UserContext);

    const {
        handleSubmit,
        resetField,
        register,
        setError,
        clearErrors,
        formState: { errors, isValid, isSubmitting },
    } = useForm({ mode: "onChange" });

    const handleChange = () => {
        clearErrors("root");
    };

    const onSubmit = async (data) => {
        try {
            await signInUser(data);
            enqueueSnackbar(t("pages.signin.success"), { variant: "success" });
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

    return (
        <OnlyLogoutUser>
            {/* <InCenter> */}
            <ContainerComponent>
                <Box mt={1}>
                    <BreadcrumbsComponent
                        user={true}
                        options={[{ name: t("pages.signin.name") }]}
                        sx={{
                            display: "inline-flex",
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                // backgroundColor: "#00427c",
                                padding: "5px 15px",
                            },
                        }}
                    />
                    {/* <Typography
                        mt={13}
                        fontWeight={600}
                        color={"primary"}
                        sx={{ textAlign: "center", mb: 3 }}
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {t("pages.signin.name")}
                    </Typography> */}
                    <InCenter
                        style={{ mt: 13 }}
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <form
                            onChange={handleChange}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                            }}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <StyledTextField
                                register={register("username", {
                                    required: t("form.required"),
                                    maxLength: {
                                        value: USERNAME_MAX_LENGTH,
                                        message: t("form.maxLength", {
                                            value: USERNAME_MAX_LENGTH,
                                        }),
                                    },
                                })}
                                errors={errors}
                                label={t("form.username")}
                            />

                            <StyledPassword
                                label={t("form.password")}
                                errors={errors}
                                register={register("password", {
                                    required: t("form.required"),
                                    maxLength: {
                                        value: PASSWORD_MAX_LENGTH,
                                        message: t("form.maxLength", {
                                            value: PASSWORD_MAX_LENGTH,
                                        }),
                                    },
                                })}
                            />
                            {errors?.root?.server && (
                                <StyledAlert severity="error" variant="filled">
                                    {t(errors?.root?.server?.message)}
                                </StyledAlert>
                            )}
                            <StyledLoadingButton
                                loading={isSubmitting}
                                endIcon={<DoubleArrowIcon />}
                                sx={{ mt: errors?.root?.server ? 0 : 3 }}
                                type="submit"
                                variant="contained"
                            >
                                {t("form.submit")}
                            </StyledLoadingButton>
                        </form>
                        <Box mt={4}>
                            <Typography
                                fontWeight={500}
                                variant="body1"
                                color="initial"
                            >
                                {t("pages.signin.text")}
                            </Typography>
                        </Box>
                    </InCenter>
                </Box>
            </ContainerComponent>
            {/* </InCenter> */}
        </OnlyLogoutUser>
    );
};

export default SignIn;
