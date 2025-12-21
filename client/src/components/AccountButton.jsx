"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { ListItemIcon } from "@mui/material";
import { MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { red } from "@mui/material/colors";
import { ACCOUNT_ROUTE, MAIN_ROUTE } from "../configs/routerLinks";
import { Link, useRouter } from "../i18n/navigation";
import { useParams } from "next/navigation";
import { UserContext } from "../components/wrappers/UserContextProvider";
import { useTranslations } from "next-intl";
import LogoutIcon from "@mui/icons-material/Logout";
import { enqueueSnackbar } from "notistack";

export default function AccountButton() {
    const { token } = useParams();
    const { user, logOut } = useContext(UserContext);
    const [loadingLogout, setLoadingLoagout] = useState(false);
    const anchorEl = useRef();
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
                size="large"
                id={`userAccountBtn`}
                aria-label="account of current user"
                aria-controls={`userAccountBtn`}
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
                ref={anchorEl}
                endIcon={<MenuIcon />}
                sx={{ textTransform: "none" }}
            >
                @{user.username}
            </Button>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": `userAccountBtn`,
                }}
                open={open}
                onClose={handleCloseNavMenu}
                anchorEl={anchorEl.current}
                sx={{
                    "& .MuiPaper-root": {
                        bgcolor: "#fff",
                    },
                    paddingBottom: 0,
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                // keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(MAIN_ROUTE(token));
                    }}
                >
                    <Box
                        width={"100%"}
                        gap={1}
                        display={"flex"}
                        justifyContent={"end"}
                        alignItems={"center"}
                    >
                        <Typography textAlign={"right"} variant="body1">
                            {t("pages.main.name")}
                        </Typography>
                    </Box>
                </MenuItem>
                <MenuItem
                    onClick={(event) => {
                        handleCloseNavMenu(event);
                        router.replace(ACCOUNT_ROUTE(token));
                    }}
                >
                    <Box
                        width={"100%"}
                        gap={1}
                        display={"flex"}
                        justifyContent={"end"}
                        alignItems={"center"}
                    >
                        <Typography textAlign={"right"} variant="body1">
                            {t("pages.account.name")}
                        </Typography>
                    </Box>
                </MenuItem>
                <MenuItem
                    sx={{ color: red[900], bgcolor: red[50] }}
                    onClick={async (event) => {
                        await handleLogout();
                        handleCloseNavMenu(event);
                    }}
                >
                    <ListItemIcon sx={{ color: red[900] }}>
                        {loadingLogout ? (
                            <CircularProgress size={17} />
                        ) : (
                            <LogoutIcon />
                        )}
                    </ListItemIcon>
                    <Typography
                        width={"100%"}
                        textTransform="capitalize"
                        textAlign="center"
                    >
                        {t("pages.logout.name")}
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}
