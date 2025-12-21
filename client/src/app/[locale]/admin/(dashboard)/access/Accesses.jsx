"use client";

import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../components/BreadcrumbsComponent";
import { Box, Button } from "@mui/material";
import { Empty } from "../../../../../components/Empty";
import { useState } from "react";
import AccessService from "../../../../../services/AccessService";
import AccessAdd from "../../../../../components/access/AccessAdd";
import { Access } from "../../../../../components/access/Access";

const access = new AccessService();

export const Accesses = ({ dataApi }) => {
    const [data, setData] = useState(dataApi || []);

    const getData = async () => {
        const { data } = await access.allTokens();
        setData(data);
    };

    if (!data || data?.length === 0)
        return (
            <ContainerComponent>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexWrap={"nowrap"}
                    flexDirection={"row"}
                    gap={2}
                >
                    <BreadcrumbsComponent
                        options={[{ name: "доступ" }]}
                        sx={{
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                // backgroundColor: "#00427c",
                                padding: "5px 15px",
                            },
                        }}
                    />
                    <AccessAdd getData={getData} />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    flex={1}
                >
                    <Empty />
                </Box>
            </ContainerComponent>
        );

    return (
        <ContainerComponent>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexWrap={"nowrap"}
                flexDirection={"row"}
                gap={2}
            >
                <BreadcrumbsComponent
                    options={[{ name: "доступ" }]}
                    sx={{
                        ol: {
                            borderRadius: 2,
                            display: "inline-flex",
                            // backgroundColor: "#00427c",
                            padding: "5px 15px",
                        },
                    }}
                />
                <AccessAdd getData={getData} />
            </Box>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                gap={1}
                flex={1}
            >
                {data?.map((e) => (
                    <Access getData={getData} key={e.id} item={e} />
                ))}
            </Box>
        </ContainerComponent>
    );
};
