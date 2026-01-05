"use client";

import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { ListItemIcon } from "@mui/material";
import { MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { red } from "@mui/material/colors";
import {
    ACCOUNT_ROUTE,
    MAIN_ROUTE,
    ACCOUNT_INSURANCE_ROUTE,
    ACCOUNT_CREDIT_STATEMENT_ROUTE,
    ACCOUNT_CREDIT_ACTIVE_ROUTE,
    ACCOUNT_DECLARATION_ROUTE,
    ACCOUNT_DOCUMENT_ROUTE,
    ACCOUNT_CREDIT_CANCEL_ROUTE,
    ACCOUNT_BANK_ROUTE,
    ACCOUNT_INSURANCE_1_ROUTE,
} from "../configs/routerLinks";
import { Link, useRouter } from "../i18n/navigation";
import { useParams } from "next/navigation";
import { UserContext } from "../components/wrappers/UserContextProvider";
import { useTranslations } from "next-intl";
import LogoutIcon from "@mui/icons-material/Logout";
import { enqueueSnackbar } from "notistack";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { observer } from "mobx-react-lite";
import { LanguageChange } from "./native-translate";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

export default observer(function AccountButton({ header }) {
    const { token } = useParams();
    const { user, logOut, isAuth, isLoading } = useContext(UserContext);
    const [loadingLogout, setLoadingLoagout] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const t = useTranslations();

    const handleLogout = async () => {
        setLoadingLoagout(true);
        try {
            await logOut();
        } catch (error) {
            enqueueSnackbar(t("form.error.message"), { variant: "error" });
        } finally {
            setLoadingLoagout(true);
        }
    };

    const handleOpenNavMenu = (event) => {
        setOpen(true);
        event.stopPropagation();
    };

    const handleCloseNavMenu = (event) => {
        setOpen(false);
        event.stopPropagation();
    };
    return (
        <>
            <Button
                sx={{
                    minWidth: 40,
                    borderWidth: 1.5,
                    borderColor: "#0000001f",
                    borderStyle: "solid",
                }}
                onClick={handleOpenNavMenu}
            >
                <MenuIcon color="error" />
            </Button>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": `header`,
                }}
                open={open}
                onClose={handleCloseNavMenu}
                anchorEl={header.current}
                sx={{
                    "& .MuiPaper-root": {
                        bgcolor: "#fff",
                        left: "0px !important",
                        width: "100%",
                        minWidth: "100%",
                        // height: "100%",
                    },
                    paddingBottom: 0,
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <MenuItem
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(MAIN_ROUTE(token));
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <Typography
                        // fontWeight={500}
                        // textAlign={"right"}
                        variant="body1"
                    >
                        {t("pages.main.name")}
                    </Typography>
                </MenuItem>

                <MenuItem
                    // sx={{ bgcolor: red[50] }}
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(ACCOUNT_ROUTE(token));
                    }}
                >
                    <ListItemIcon>
                        <AccountCircleIcon color="dif" />
                    </ListItemIcon>

                    <Typography color="dif" variant="body1">
                        {t("pages.account.name")}
                    </Typography>
                </MenuItem>
                <MenuItem
                    // sx={{ bgcolor: red[50] }}
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(ACCOUNT_INSURANCE_ROUTE(token));
                    }}
                >
                    <ListItemIcon>
                        <ReceiptLongIcon color="dif" />
                    </ListItemIcon>

                    <Typography color="dif" variant="body1">
                        {t("pages.account.insurance.name")}
                    </Typography>
                </MenuItem>
                {/* <MenuItem
                    // sx={{ bgcolor: red[50] }}
                    // onClick={(event) => {
                    //     handleCloseNavMenu(event);
                    //     router.replace(ACCOUNT_CREDIT_ROUTE(token));
                    // }}
                > */}
                <Accordion
                    square={false}
                    sx={{
                        "& .MuiPaper-root": {},
                        boxShadow: "none !important",
                        // bgcolor: user ? "error.main" : "primary.main",
                    }}
                >
                    <AccordionSummary
                        sx={{
                            justifyContent: "start",
                            "& .MuiAccordionSummary-content": {
                                m: "0px 0px !important",
                                flex: "0 !important",
                            },
                            minHeight: "0px !important",
                            p: "0px !important",
                        }}
                        expandIcon={<ExpandMoreIcon color="dif" />}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <ReceiptLongIcon color="dif" />
                            </ListItemIcon>

                            <Typography color="dif" variant="body1">
                                {t("pages.account.credit.name")}
                            </Typography>
                        </MenuItem>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: "#fff", p: 0 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: user ? 0 : 1,
                                maxHeight: 350,
                                overflowY: "scroll",
                            }}
                        >
                            <MenuItem
                                sx={{ pl: 4, pr: 4 }}
                                onClick={(event) => {
                                    handleCloseNavMenu(event);
                                    router.replace(
                                        ACCOUNT_CREDIT_STATEMENT_ROUTE(token)
                                    );
                                }}
                            >
                                <ListItemIcon>
                                    <PendingActionsIcon color="dif" />
                                </ListItemIcon>
                                <Typography color="dif" variant="body1">
                                    {t("pages.account.credit.statement")}
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{ pl: 4, pr: 4 }}
                                onClick={(event) => {
                                    handleCloseNavMenu(event);
                                    router.replace(
                                        ACCOUNT_CREDIT_ACTIVE_ROUTE(token)
                                    );
                                }}
                            >
                                <ListItemIcon>
                                    <CheckCircleIcon color="success" />
                                </ListItemIcon>
                                <Typography color="success" variant="body1">
                                    {t("pages.account.credit.active")}
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{ pl: 4, pr: 4 }}
                                onClick={(event) => {
                                    handleCloseNavMenu(event);
                                    router.replace(
                                        ACCOUNT_CREDIT_CANCEL_ROUTE(token)
                                    );
                                }}
                            >
                                <ListItemIcon>
                                    <BlockIcon color="warning" />
                                </ListItemIcon>
                                <Typography color="warning" variant="body1">
                                    {t("pages.account.credit.cancel")}
                                </Typography>
                            </MenuItem>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <MenuItem
                    // sx={{ bgcolor: red[50] }}
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(ACCOUNT_DOCUMENT_ROUTE(token));
                    }}
                >
                    <ListItemIcon>
                        <ReceiptLongIcon color="dif" />
                    </ListItemIcon>

                    <Typography color="dif" variant="body1">
                        {t("pages.account.document.name")}
                    </Typography>
                </MenuItem>
                <MenuItem
                    // sx={{ bgcolor: red[50] }}
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(ACCOUNT_DECLARATION_ROUTE(token));
                    }}
                >
                    <ListItemIcon>
                        <ReceiptLongIcon color="dif" />
                    </ListItemIcon>

                    <Typography color="dif" variant="body1">
                        {t("pages.account.declaration.name")}
                    </Typography>
                </MenuItem>
                <MenuItem
                    // sx={{ bgcolor: red[50] }}
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(ACCOUNT_INSURANCE_1_ROUTE(token));
                    }}
                >
                    <ListItemIcon>
                        <ReceiptLongIcon color="dif" />
                    </ListItemIcon>

                    <Typography color="dif" variant="body1">
                        {t("pages.account.insurance_1.name")}
                    </Typography>
                </MenuItem>
                <MenuItem
                    // sx={{ bgcolor: red[50] }}
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(ACCOUNT_BANK_ROUTE(token));
                    }}
                >
                    <ListItemIcon>
                        <ReceiptLongIcon color="dif" />
                    </ListItemIcon>

                    <Typography color="dif" variant="body1">
                        {t("pages.account.bank.name")}
                    </Typography>
                </MenuItem>
                <MenuItem sx={{ mt: 3, mb: 1 }}>
                    <LanguageChange />
                </MenuItem>
                <MenuItem
                    sx={{ bgcolor: red[50] }}
                    onClick={async (event) => {
                        await handleLogout();
                        handleCloseNavMenu(event);
                    }}
                >
                    <ListItemIcon>
                        {loadingLogout ? (
                            <CircularProgress size={17} />
                        ) : (
                            <LogoutIcon color="error" />
                        )}
                    </ListItemIcon>
                    <Typography
                        width={"100%"}
                        textTransform="capitalize"
                        // textAlign="right"
                        variant="body1"
                        color="error"
                    >
                        {t("pages.logout.name")}
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
});
