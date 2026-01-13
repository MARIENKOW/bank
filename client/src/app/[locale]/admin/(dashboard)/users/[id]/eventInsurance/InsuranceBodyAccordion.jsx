import {
    Box,
    Button,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "../../../../../../../i18n/navigation";
import { ADMIN_USER_BANK_ROUTE } from "../../../../../../../configs/routerLinks";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { CanceledError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { StyledLoadingButton } from "../../../../../../../components/form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { StyledTextField } from "../../../../../../../components/form/StyledTextField";
import { StyledFormControl } from "../../../../../../../components/form/StyledPassword";
import BankService from "../../../../../../../services/BankService";
import DeleteInsuranceBodyButton from "../../../../../../../components/insuranceBody/DeleteInsuranceBodyButton";
import InsuranceBodyService from "../../../../../../../services/InsuranceBodyService";
import InsuranceAdd from "../insurance/InsuranceAdd";
import Insurances from "../insurance/Insurances";
import DeleteAllButton from "./DeleteAllButton";
import EventInsuranceAdd from "./EventInsuranceAdd";
import EventsInsurance from "./EventsInsurance";

const body = new InsuranceBodyService();

export default function InsuranceBodyAccordion({ item, user }) {
    const queryClient = useQueryClient();
    const defaultValues = item;
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
    }, [item]);

    const onSubmit = async (data) => {
        try {
            await body.update({ ...data, id: item?.id });
            await queryClient.invalidateQueries({
                queryKey: ["bodys", String(item.user_id)],
            });

            enqueueSnackbar(`Изменено!`, { variant: "success" });
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
    const t = useTranslations();
    return (
        <Box>
            <Accordion
                sx={{
                    "& .MuiPaper-root": {},
                    bgcolor: user ? "error.main" : "primary",
                }}
            >
                <AccordionSummary
                    expandIcon={
                        <ExpandMoreIcon
                            color={user ? "inherit" : "secondary"}
                        />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography
                        fontSize={12}
                        textTransform={"uppercase"}
                        component="span"
                        color={user ? "inherit" : "secondary"}
                        fontWeight={500}
                    >
                        {item?.name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "secondary.main" }}>
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <StyledTextField
                            errors={errors}
                            label={"название"}
                            register={register("name", {
                                required: "обязательное поле",
                            })}
                        />
                        <StyledTextField
                            errors={errors}
                            label={"Номер счета"}
                            register={register("elc", {})}
                        />
                        <Box display={"flex"} gap={1}>
                            <Box flex={"0 1 50%"}>
                                <DeleteInsuranceBodyButton item={item} />
                            </Box>
                            <Box flex={"0 1 50%"}>
                                <StyledLoadingButton
                                    fullWidth
                                    onClick={handleSubmit(onSubmit)}
                                    sx={{ height: "100%" }}
                                    loading={isSubmitting}
                                    disabled={!isValid || !isDirty}
                                    endIcon={<DoubleArrowIcon />}
                                    variant="contained"
                                ></StyledLoadingButton>
                            </Box>
                        </Box>
                        <Box
                            pt={5}
                            display={"flex"}
                            maxWidth={700}
                            margin={"0 auto"}
                            width={"100%"}
                            flexDirection={"column"}
                            flex={1}
                        >
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                // flexDirection={{ xs: "column", md: "row" }}
                                justifyContent={"space-between"}
                            >
                                <DeleteAllButton id={item.id} />
                                <EventInsuranceAdd id={item.id} />
                            </Box>
                            <Box
                                display={"flex"}
                                mt={2}
                                flex={1}
                                justifyContent={"center"}
                                flexDirection={"column"}
                            >
                                <EventsInsurance id={item.id} />
                            </Box>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
