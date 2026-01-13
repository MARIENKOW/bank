"use client";

import { Box, Button, Typography } from "@mui/material";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslations } from "next-intl";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "../../../i18n/navigation";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { ACCOUNT_DOCUMENT_ROUTE } from "../../../configs/routerLinks";
import { useParams } from "next/navigation";

export default function InfoCreditButton({ credit, user }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { token } = useParams();
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
                                {!user ? "Личный счет" : t("fields.credit.elc")}
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
                            display={"flex"}
                            justifyContent={"space-between"}
                            gap={2}
                            mt={3}
                        >
                            <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                gap={2}
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
                                        {!user
                                            ? "Дата"
                                            : t("fields.credit.date")}
                                    </Typography>
                                    <Typography
                                        color="secondary"
                                        fontSize={18}
                                        fontWeight={600}
                                        variant="body1"
                                        // variant="h5"
                                    >
                                        {credit?.date}
                                    </Typography>
                                </Box>
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
                                    {!user ? "Время" : t("fields.credit.time")}
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
                    <Box display={"flex"} gap={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            {user ? t("buttons.close") : "закрыть"}
                        </Button>
                        {user && (
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
                        )}
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}
