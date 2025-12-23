"use client";

import Loading from "../../../../components/loading/Loading";
import EventService from "../../../../services/EventService";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../components/ErrorElement";
import { Empty } from "../../../../components/Empty";
import { Box, Paper } from "@mui/material";
import EventItem from "../../../../components/event/EventItem";
import { $UserApi } from "../../../../http";

const event = new EventService($UserApi);

export default function EventsUser({ id }) {
    const { isPending, error, data } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await event.find(id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;

    if (!data || data?.length === 0) return <Empty />;

    return (
        <>
            {data?.map((event, i) => (
                <EventItem i={i} key={event.id} event={event} />
            ))}
        </>
    );
}
