"use client";

import { Box } from "@mui/material";

import { ContainerComponent } from "../../../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../../../components/BreadcrumbsComponent";
import {
    ADMIN_USER_ROUTE,
    ADMIN_USERS_ROUTE,
} from "../../../../../../../configs/routerLinks";
import CreditAdd from "./CreditAdd";
import Credits from "./Credits";
import { useParams } from "next/navigation";

export default function page() {
    const { id } = useParams();

    return (
        <ContainerComponent>
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                <>
                    <BreadcrumbsComponent
                        options={[
                            { name: "Клиенты", link: ADMIN_USERS_ROUTE },
                            { name: "Клиент", link: ADMIN_USER_ROUTE(id) },
                            { name: "Кредиты" },
                        ]}
                        sx={{
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                // backgroundColor: "#00427c",
                                padding: "5px 15px",
                            },
                        }}
                    />
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        // justifyContent={"center"}
                        alignItems={"center"}
                        flex={1}
                    >
                        <Box flex={1} display={'flex'} flexDirection={'column'} width={"100%"} maxWidth={700} margin={"0 auto"}>
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                // flexDirection={{ xs: "column", md: "row" }}
                                justifyContent={"space-between"}
                                mt={5}
                                mb={2}
                            >
                                <CreditAdd />
                            </Box>
                            <Credits id={id} />
                        </Box>
                    </Box>
                </>
            </Box>
        </ContainerComponent>
    );
}
