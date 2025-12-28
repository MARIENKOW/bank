"use client";

import CreditService from "../../../services/CreditService";
import VerifiedIcon from "@mui/icons-material/Verified";

import {
    Box,
    Button,
    FilledInput,
    FormHelperText,
    InputAdornment,
    InputLabel,
    Typography,
} from "@mui/material";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useState } from "react";
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
import InfoIcon from "@mui/icons-material/Info";

const creditF = new CreditService();

export default function InfoCreditButton({ credit, user }) {
    const [open, setOpen] = useState(false);
    const t = useTranslations();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <StyledLoadingButton
                variant="contained"
                size="small"
                sx={{ p: 1, minWidth: "10px" }}
                color="dif"
                onClick={handleClickOpen}
            >
                <InfoIcon color="secondary" />
            </StyledLoadingButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Box
                        p={1}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                    >
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            gap={2}
                            mt={3}
                        >
                            <Box
                                display={"inline-flex"}
                                flexDirection={"column"}
                                pt={1}
                                gap={0.5}
                                pb={1}
                            >
                                <Typography
                                    color="secondary"
                                    lineHeight={"1"}
                                    variant="body1"
                                >
                                    {!user ? "Банк" : t("fields.credit.bank")}
                                </Typography>
                                <Typography
                                    color="secondary"
                                    fontSize={18}
                                    fontWeight={600}
                                    variant="body1"
                                >
                                    {credit?.bank}
                                </Typography>
                            </Box>
                            <Box
                                display={"inline-flex"}
                                flexDirection={"column"}
                                pt={1}
                                gap={0.5}
                                pb={1}
                            >
                                <Typography
                                    color="secondary"
                                    lineHeight={"1"}
                                    variant="body1"
                                >
                                    {!user
                                        ? "Личный счет"
                                        : t("fields.credit.elc")}
                                </Typography>
                                <Typography
                                    color="secondary"
                                    fontSize={18}
                                    fontWeight={600}
                                    variant="body1"
                                    // variant="h5"
                                >
                                    {credit?.elc}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            gap={2}
                            mt={3}
                        >
                            <Box
                                display={"inline-flex"}
                                flexDirection={"column"}
                                pt={1}
                                gap={0.5}
                                pb={1}
                            >
                                <Typography
                                    lineHeight={"1"}
                                    color="secondary"
                                    variant="body1"
                                >
                                    {!user
                                        ? "Цель кредита"
                                        : t("fields.credit.comment")}
                                </Typography>
                                <Typography
                                    color="secondary"
                                    fontSize={18}
                                    fontWeight={600}
                                    variant="body1"
                                    // variant="h5"
                                >
                                    {credit?.comment}
                                </Typography>
                            </Box>
                            <Box
                                display={"inline-flex"}
                                flexDirection={"column"}
                                pt={1}
                                gap={0.5}
                                pb={1}
                            >
                                <Typography
                                    color="secondary"
                                    lineHeight={"1"}
                                    variant="body1"
                                >
                                    {!user
                                        ? "Время"
                                        : t("fields.credit.time")}
                                </Typography>
                                <Typography
                                    color="secondary"
                                    fontSize={18}
                                    fontWeight={600}
                                    variant="body1"
                                    // variant="h5"
                                >
                                    {credit?.time}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        {user ? t("buttons.close") : "закрыть"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
