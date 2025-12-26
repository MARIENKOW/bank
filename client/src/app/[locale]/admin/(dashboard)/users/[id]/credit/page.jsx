import { Box, Typography } from "@mui/material";

import { ContainerComponent } from "../../../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../../../components/BreadcrumbsComponent";
import {
    ADMIN_USER_ROUTE,
    ADMIN_USERS_ROUTE,
} from "../../../../../../../configs/routerLinks";
import ErrorElement from "../../../../../../../components/ErrorElement";
import UserService from "../../../../../../../services/UserService";
import CreditAdd from "./CreditAdd";
import Credits from "./Credits";

const user = new UserService();

export default async function page({ params }) {
    const { id } = await params;

    return (
        <ContainerComponent>
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                <Inner id={id} />
            </Box>
        </ContainerComponent>
    );
}

async function Inner({ id }) {
    try {
        const { data } = await user.getById(id);
        return (
            <>
                <BreadcrumbsComponent
                    options={[
                        { name: "Клиенты", link: ADMIN_USERS_ROUTE },
                        { name: data.username, link: ADMIN_USER_ROUTE(id) },
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
                    // flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flex={1}
                >
                    <Box flex={"0 1 700px"}>
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
        );
    } catch (error) {
        return (
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
                <ErrorElement admin={true} />
            </>
        );
    }
}
