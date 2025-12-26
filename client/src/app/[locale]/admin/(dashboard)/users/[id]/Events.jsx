"use client";

import Loading from "../../../../../../components/loading/Loading";
import { $AdminApi } from "../../../../../../http";
import EventService from "../../../../../../services/EventService";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../components/Empty";
import { Box, Paper } from "@mui/material";
import EventItemAdmin from "../../../../../../components/event/EventItemAdmin";

const event = new EventService($AdminApi);

export default function Events({ id }) {
    const { isPending, error, data } = useQuery({
        queryKey: ["events", id],
        queryFn: async () => {
            const { data } = await event.find(id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;

    if (!data || data?.length === 0) return <Empty admin={true} />;

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: 1,
                maxHeight: 350,
                overflowY: "scroll",
            }}
        >
            {data?.map((event) => (
                <EventItemAdmin key={event.id} event={event} />
            ))}
        </Paper>
    );
}
