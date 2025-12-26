"use client";

import { Empty } from "../../../../../components/Empty";
import UserService from "../../../../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../../components/ErrorElement";
import Loading from "../../../../../components/loading/Loading";
import UserItemAdmin from "./UserItemAdmin";
import { Box } from "@mui/material";

const user = new UserService();

export default function Users({}) {
    const { isPending, error, data } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await user.getAll();
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;

    if (!data || data?.length === 0) return <Empty admin={true} />;

    return (
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            {data?.map((user) => (
                <UserItemAdmin user={user} key={user?.uuid} />
            ))}
        </Box>
    );
}
