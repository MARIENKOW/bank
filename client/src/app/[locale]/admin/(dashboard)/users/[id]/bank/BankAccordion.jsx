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
import DeleteBankButton from "../../../../../../../components/bank/DeleteBankButton";

const bank = new BankService();

export default function BankAccordion({ item, user }) {
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
            await bank.update({ ...data, id: item?.id });
            await queryClient.invalidateQueries({
                queryKey: ["banks", String(item.user_id)],
            });

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
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <StyledTextField
                                errors={errors}
                                label={"Ограничения"}
                                register={register("limit", {})}
                            />
                            <Controller
                                control={control}
                                name="status"
                                rules={{ required: "обязательное поле" }}
                                render={({
                                    field: { value, onChange, name },
                                    formState: { errors },
                                }) => (
                                    <StyledFormControl
                                        error={!!errors?.status}
                                        variant="filled"
                                        fullWidth
                                    >
                                        <InputLabel
                                            id={`demo-simple-select-standard-status`}
                                        >
                                            Статус
                                        </InputLabel>
                                        <Select
                                            // sx={{}}}
                                            labelId={`demo-simple-select-standard-status`}
                                            value={value}
                                            onChange={({ target }) => {
                                                onChange(target?.value);
                                            }}
                                            label={"Тип события"}
                                            MenuProps={{
                                                sx: {
                                                    "& .MuiPaper-root": {
                                                        bgcolor: "#fff",
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value={0}>
                                                Активный
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                проходит перевыпуск
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {errors?.status?.message}
                                        </FormHelperText>
                                    </StyledFormControl>
                                )}
                            />
                            <Box display={"flex"} gap={1}>
                                <Box flex={"0 1 50%"}>
                                    <DeleteBankButton item={item} />
                                </Box>
                                <Box flex={"0 1 50%"}>
                                    <StyledLoadingButton
                                        fullWidth
                                        type="submit"
                                        sx={{ height: "100%" }}
                                        loading={isSubmitting}
                                        disabled={!isValid || !isDirty}
                                        endIcon={<DoubleArrowIcon />}
                                        variant="contained"
                                    ></StyledLoadingButton>
                                </Box>
                            </Box>
                            <Link
                                href={
                                    ADMIN_USER_BANK_ROUTE(item?.user_id) +
                                    "/" +
                                    item.id
                                }
                            >
                                <Button
                                    sx={{
                                        mt: 2,
                                        color: user ? "#000" : "#fff",
                                    }}
                                    fullWidth
                                    variant="contained"
                                    color={user ? "error" : "primary"}
                                >
                                    {user
                                        ? t("pages.account.bank.info")
                                        : "Детальнее"}
                                </Button>
                            </Link>
                        </Box>
                    </form>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
