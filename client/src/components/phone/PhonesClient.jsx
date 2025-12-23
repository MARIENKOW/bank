"use client";

import { ContainerComponent } from "../wrappers/ContainerComponent";
import BreadcrumbsComponent from "../BreadcrumbsComponent";
import { Box, Button } from "@mui/material";
import { Empty } from "../Empty";
import { PhoneForm } from "./PhoneForm";
import { useState } from "react";
import PhoneService from "../../services/PhoneService";
import PhoneAdd from "./PhoneAdd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorElement from "../ErrorElement";

const phone = new PhoneService();

export const PhonesClient = ({ initialData, initialError }) => {
    // const [data, setData] = useState(dataApi || []);

    const queryClient = useQueryClient();

    const { data, error, refetch } = useQuery({
        queryKey: ["phones"],
        queryFn: async () => {
            const { data } = await phone.getPhones();
            return data;
        },
        initialData,
    });

    if (initialError || error) return <ErrorElement />;

    if (!data || data?.length === 0) return <Empty />;

    return data?.map((e) => (
        <PhoneForm
            getData={async () => queryClient.invalidateQueries("phones")}
            key={e.id}
            item={e}
        />
    ));
};
