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
    SIGNIN_ROUTE,
} from "../configs/routerLinks";
import { Link, useRouter } from "../i18n/navigation";
import { useParams } from "next/navigation";
import { UserContext } from "../components/wrappers/UserContextProvider";
import { useTranslations } from "next-intl";
import LogoutIcon from "@mui/icons-material/Logout";
import { enqueueSnackbar } from "notistack";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { observer } from "mobx-react-lite";

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
                        height: "100%",
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
