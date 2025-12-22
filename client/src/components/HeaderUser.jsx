"use client";
import { Button, Menu, MenuItem, useTheme, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { ContainerComponent } from "./wrappers/ContainerComponent";
import Image from "next/image";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { MAIN_ROUTE } from "../configs/routerLinks";
import { Children, useContext, useRef, useState } from "react";
import { LanguageChange } from "./native-translate";
import { Link } from "../i18n/navigation";
import { useParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import AccountButton from "./AccountButton";
observer;

const Header = ({ data }) => {
    const { token } = useParams();
    const headerEl = useRef();

    return (
        <Box
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
                    id={`header`}
                    ref={headerEl}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "secondary.main",
                        gap: 1,
                    }}
                >
                    <Box display={"flex"} alignItems={"center"}>
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
                            <AccountButton header={headerEl} />
                        </Box>
                    </Box>
                </Toolbar>
            </ContainerComponent>
        </Box>
    );
};

export default observer(Header);
