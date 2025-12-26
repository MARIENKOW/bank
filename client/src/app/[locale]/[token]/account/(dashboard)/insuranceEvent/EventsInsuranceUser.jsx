"use client";

import Loading from "../../../../../../components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../components/Empty";
import EventItem from "../../../../../../components/event/EventItem";
import { $UserApi } from "../../../../../../http";
import EventInsuranceService from "../../../../../../services/EventInsuranceService";

const event = new EventInsuranceService($UserApi);

export default function EventsInsuranceUser({ id }) {
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
