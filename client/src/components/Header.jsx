"use client";
import { Button, Menu, MenuItem, useTheme, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { ContainerComponent } from "./wrappers/ContainerComponent";
import Image from "next/image";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import {
    ACCOUNT_ROUTE,
    MAIN_ROUTE,
    SIGNIN_ROUTE,
} from "../configs/routerLinks";
import { Children, useContext, useState } from "react";
import GoogleTranslate from "./google-translate";
import { LanguageChange } from "./native-translate";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";
import { useParams } from "next/navigation";
import { UserContext } from "../components/wrappers/UserContextProvider";
import Loading from "../components/loading/Loading";
import { observer } from "mobx-react-lite";
import AccountButton from "../components/AccountButton";
observer;

const Header = ({ data }) => {
    const { isLoading, isAuth } = useContext(UserContext);
    const { token } = useParams();
    const t = useTranslations();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const menu = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Box
            // position={"fixed"}
            top={0}
            left={0}
            width={"100%"}
            zIndex={1000}
            sx={{
                bgcolor: "secondary.main",
            }}
        >
            <ContainerComponent sx={{ p: { xs: 0 } }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "secondary.main",
                        gap: 1,
                    }}
                >
                    {/* <Link href={MAIN_ROUTE}>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                            pt={2}
                            pb={2}
                        >
                            <Image
                                alt="logo"
                                width={30}
                                height={40}
                                src={"/logo1.png"}
                            />
                            <Image
                                alt="logo1"
                                width={40}
                                height={40}
                                src={"/logo1_1.png"}
                            />
                            <Image
                                alt="logo2"
                                width={40}
                                height={40}
                                src={"/logo2.png"}
                            />
                        </Box>
                    </Link> */}
                    <Box
                        display={"flex"}
                        // justifyContent={"end"}
                        alignItems={"center"}
                        // flexWrap={"wrap"}
                        // pt={1}
                        // pb={1}
                        // gap={1}
                    >
                        <Link href={MAIN_ROUTE(token)}>
                            <Image
                                alt="logo2"
                                width={50}
                                height={50}
                                src={"/logo2.png"}
                            />
                        </Link>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                        <LanguageChange />
                        <Box>
                            {isLoading ? (
                                <Loading />
                            ) : isAuth ? (
                                <AccountButton />
                            ) : (
                                <Link href={SIGNIN_ROUTE(token)}>
                                    <Typography
                                        variant="body1"
                                        color="primary"
                                        fontWeight={500}
                                    >
                                        {t("pages.signin.name")}
                                    </Typography>
                                </Link>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </ContainerComponent>
        </Box>
    );
};

export default observer(Header);
