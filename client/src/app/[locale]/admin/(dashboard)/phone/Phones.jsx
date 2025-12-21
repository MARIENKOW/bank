"use client";

import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../components/BreadcrumbsComponent";
import { Box, Button } from "@mui/material";
import { Empty } from "../../../../../components/Empty";
import { PhoneForm } from "../../../../../components/phone/PhoneForm";
import { useState } from "react";
import PhoneService from "../../../../../services/PhoneService";
import PhoneAdd from "../../../../../components/phone/PhoneAdd";

const phone = new PhoneService();

export const Phones = ({ dataApi }) => {
    const [data, setData] = useState(dataApi || []);

    const getData = async () => {
        const { data } = await phone.getPhones();
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
                        options={[{ name: "Блог" }]}
                        sx={{
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                // backgroundColor: "#00427c",
                                padding: "5px 15px",
                            },
                        }}
                    />
                    <PhoneAdd getData={getData} />
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
                    options={[{ name: "Блог" }]}
                    sx={{
                        ol: {
                            borderRadius: 2,
                            display: "inline-flex",
                            // backgroundColor: "#00427c",
                            padding: "5px 15px",
                        },
                    }}
                />
                <PhoneAdd getData={getData} />
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
                    <PhoneForm getData={getData} key={e.id} item={e} />
                ))}
            </Box>
        </ContainerComponent>
    );
};
