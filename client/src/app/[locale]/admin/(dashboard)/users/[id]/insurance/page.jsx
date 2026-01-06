"use client";

import { Box } from "@mui/material";

import { ContainerComponent } from "../../../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../../../components/BreadcrumbsComponent";
import {
    ADMIN_USER_ROUTE,
    ADMIN_USERS_ROUTE,
} from "../../../../../../../configs/routerLinks";
import InsuranceAdd from "./InsuranceAdd";
import Insurances from "./Insurances";
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
                            { name: "Банки" },
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
                        flex={1}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            flex={1}
                            width={"100%"}
                            maxWidth={700}
                            margin={"0 auto"}
                        >
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                // flexDirection={{ xs: "column", md: "row" }}
                                justifyContent={"space-between"}
                                mt={5}
                                mb={2}
                            >
                                <InsuranceAdd />
                            </Box>
                            <Insurances id={id} />
                        </Box>
                    </Box>
                </>
            </Box>
        </ContainerComponent>
    );
}
