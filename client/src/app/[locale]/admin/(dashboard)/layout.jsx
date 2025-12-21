"use client";

import { inter, montserrat } from "../../../../fonts/index";

import ChechAuthAdmin from "../../../../components/wrappers/ChechAuthAdmin";
import HeaderAdmin from "../../../../components/HeaderAdmin";
import "../../../globals.scss";
import { Box } from "@mui/material";
import { MainWrapper } from "../../../../components/wrappers/MainWrapper";
import AdminContextProvider from "../../../../components/wrappers/AdminContextProvider";

export default function RootLayout({ children }) {
    return (
        <html className={montserrat.className} lang="ru">
            <body>
                <MainWrapper>
                    <AdminContextProvider>
                        <ChechAuthAdmin>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                flex={1}
                                bgcolor={"#fff"}
                            >
                                <HeaderAdmin />
                                {children}
                            </Box>
                        </ChechAuthAdmin>
                    </AdminContextProvider>
                </MainWrapper>
            </body>
        </html>
    );
}
