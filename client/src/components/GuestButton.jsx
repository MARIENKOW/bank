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
import { UserContext } from "./wrappers/UserContextProvider";
import { useTranslations } from "next-intl";
import LogoutIcon from "@mui/icons-material/Logout";
import { enqueueSnackbar } from "notistack";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { observer } from "mobx-react-lite";

export default observer(function GuestButton({ header }) {
    const { token } = useParams();
    const { user, logOut, isAuth, isLoading } = useContext(UserContext);
    const [loadingLogout, setLoadingLoagout] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const t = useTranslations();

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
                // size="large"
                // aria-label="account of current user"
                // aria-controls={`header`}
                // aria-haspopup="true"
                onClick={handleOpenNavMenu}
                // color="primary"
                // ref={anchorEl}
                // sx={{ textTransform: "none", fontWeight: 500 }}
            >
                <MenuIcon />
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
                <Link href={SIGNIN_ROUTE(token)}>
                    <MenuItem
                        onClick={async (event) => {
                            handleCloseNavMenu(event);
                        }}
                    >
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <Typography variant="body1">
                            {t("pages.signin.name")}
                        </Typography>
                    </MenuItem>
                </Link>
            </Menu>
        </>
    );
});
