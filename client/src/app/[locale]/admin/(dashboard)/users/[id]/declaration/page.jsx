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
                            flexDirection={"row"}
                            alignItems={"start"}
                            flex={1}
                        >
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
                </>
            </Box>
        </ContainerComponent>
    );
}
