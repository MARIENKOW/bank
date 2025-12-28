"use client";

import Loading from "../../../../../../../components/loading/Loading";
import { $AdminApi } from "../../../../../../../http";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../../components/Empty";
import { Box, Grid2, Paper } from "@mui/material";
import { useParams } from "next/navigation";
import UserDocumentService from "../../../../../../../services/UserDocumentService";
import DocumentItemAdmin from "../../../../../../../components/document/DocumentItemAdmin";

const userDocument = new UserDocumentService($AdminApi);

export default function Documents({}) {
    const { id } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ["documents", id],
        queryFn: async () => {
            const { data } = await userDocument.find(id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement admin={true} />;

    if (!data || data?.length === 0) return <Empty admin={true} />;

    return (
        <Box flex={1} flexDirection={"column"} gap={2} display={"flex"}>
            <Grid2 container spacing={2}>
                {data?.map((doc) => (
                    <Grid2 size={{xs:12,md:6}} key={doc?.id}>
                        <DocumentItemAdmin doc={doc} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}
