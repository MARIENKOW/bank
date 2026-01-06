"use client";

import { Box, Typography } from "@mui/material";
import EventInsuranceAdd from "./EventInsuranceAdd";
import EventsInsurance from "./EventsInsurance";
import { ContainerComponent } from "../../../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../../../components/BreadcrumbsComponent";
import {
    ADMIN_USER_ROUTE,
    ADMIN_USERS_ROUTE,
} from "../../../../../../../configs/routerLinks";
import DeleteAllButton from "./DeleteAllButton";

import { InsuranceElcClient } from "./InsuranceElcClient";
import { useParams } from "next/navigation";

export default function page() {
    const { id } = useParams();
    return (
        <ContainerComponent>
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                <BreadcrumbsComponent
                    options={[
                        { name: "Клиенты", link: ADMIN_USERS_ROUTE },
                        { name: "Клиент", link: ADMIN_USER_ROUTE(id) },
                        { name: "Страховочные зачисления" },
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
                    // alignItems={"center"}
                    flex={1}
                >
                    <Box
                        pt={5}
                        display={"flex"}
                        maxWidth={700}
                        margin={"0 auto"}
                        width={"100%"}
                        flexDirection={"column"}
                        flex={1}
                    >
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            // flexDirection={{ xs: "column", md: "row" }}
                            justifyContent={"space-between"}
                        >
                            <DeleteAllButton />
                            <EventInsuranceAdd />
                        </Box>
                        <Box
                            display={"flex"}
                            mt={2}
                            flex={1}
                            justifyContent={'center'}
                            flexDirection={"column"}
                        >
                            <EventsInsurance id={id} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ContainerComponent>
    );
}
