"use client";

import { Box, Typography } from "@mui/material";

import { ContainerComponent } from "../../../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../../../components/BreadcrumbsComponent";
import {
    ADMIN_USER_ROUTE,
    ADMIN_USERS_ROUTE,
} from "../../../../../../../configs/routerLinks";
import DeclarationAdd from "./DeclarationAdd";
import Declarations from "./Declarations";
import { useParams } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserDeclarationMinValueForm } from "../../../../../../../components/form/user/UserDeclarationMinValueForm";
import { observer } from "mobx-react-lite";
import Loading from "../../../../../../../components/loading/Loading";
import ErrorElement from "../../../../../../../components/ErrorElement";
import { useQuery } from "@tanstack/react-query";
import UserService from "../../../../../../../services/UserService";

const user = new UserService();

export default observer(function page() {
    const { id } = useParams();

    const { data, error, isPending } = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const { data } = await user.getById(id);
            return data;
        },
    });
    console.log(error);

    return (
        <ContainerComponent>
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                <>
                    <BreadcrumbsComponent
                        options={[
                            { name: "Клиенты", link: ADMIN_USERS_ROUTE },
                            { name: "Клиент", link: ADMIN_USER_ROUTE(id) },
                            { name: "Декларация" },
                        ]}
                        sx={{
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                padding: "5px 15px",
                            },
                        }}
                    />
                    <Box display={"flex"} flexDirection={"column"} flex={1}>
                        <Box
                            mt={2}
                            display={"flex"}
                            flexDirection={{ xs: "column", md: "row" }}
                            // alignItems={"start"}
                            flex={1}
                            gap={2}
                        >
                            <Box flex={{ xs: "none", md: "0 1 50%" }}>
                                {isPending ? (
                                    <Loading />
                                ) : error ? (
                                    <ErrorElement admin={true} />
                                ) : (
                                    <UserDeclarationMinValueForm item={data} />
                                )}
                            </Box>
                            <Box flex={{ xs: "none", md: "0 1 50%" }}>
                                <Accordion
                                    sx={{
                                        "& .MuiPaper-root": {},
                                        bgcolor: "primary.main",
                                        width: "100%",
                                    }}
                                    defaultExpanded
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <ExpandMoreIcon color="secondary" />
                                        }
                                    >
                                        <Box
                                            display={"flex"}
                                            width={"100%"}
                                            alignItems={"center"}
                                            justifyContent={"space-between"}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="secondary"
                                            >
                                                {"Валюта"}
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        sx={{ bgcolor: "#fff", p: 0 }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                                p: 1,
                                                maxHeight: 350,
                                                overflowY: "scroll",
                                            }}
                                        >
                                            <DeclarationAdd />
                                            <Declarations id={id} />
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
                    </Box>
                </>
            </Box>
        </ContainerComponent>
    );
});
