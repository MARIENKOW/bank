"use client";

import Loading from "../../../../../../../components/loading/Loading";
import { $AdminApi } from "../../../../../../../http";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../../components/Empty";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import BankService from "../../../../../../../services/BankService";
import BankAccordion from "./BankAccordion";

const bank = new BankService($AdminApi);

export default function Banks({}) {
    const { id } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ["banks", id],
        queryFn: async () => {
            const { data } = await bank.find(id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement admin={true} />;

    if (!data || data?.length === 0) return <Empty admin={true} />;

    return (
        <Box flex={1} flexDirection={"column"} justifyContent={'center'} gap={2} display={"flex"}>
            {data?.map((bank, i) => (
                <BankAccordion key={bank.id} item={bank} />
            ))}
        </Box>
    );
}
