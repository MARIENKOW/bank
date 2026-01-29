"use client";

import Loading from "../../../../../../../components/loading/Loading";
import { $AdminApi } from "../../../../../../../http";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../../components/Empty";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import DeclarationService from "../../../../../../../services/DeclarationService";
import DeclarationValute from "./DeclarationValute";

const declaration = new DeclarationService($AdminApi);

export default function Declarations({}) {
    const { id } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ["declarations", id],
        queryFn: async () => {
            const { data } = await declaration.find(id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement admin={true} />;

    if (!data || data?.length === 0) return <Empty admin={true} />;

    return (
        <Box
            flex={1}
            flexDirection={"column"}
            justifyContent={"center"}
            gap={2}
            alignItems={"end"}
            display={"flex"}
        >
            {data.map((bank, i) => (
                <DeclarationValute key={bank.id} item={bank} />
            ))}
        </Box>
    );
}
