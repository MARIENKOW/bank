"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorElement from "../ErrorElement";
import SiteService from "../../services/SiteService";
import { BankerForm } from "../../components/phone/BankerForm";
import Loading from "../../components/loading/Loading";

const site = new SiteService();

export const BankerClient = ({ initialData, initialError }) => {
    const queryClient = useQueryClient();

    const { data, error, isPending } = useQuery({
        queryKey: ["banker"],
        queryFn: async () => {
            const { data } = await site.getBanker();
            return data;
        },
        initialData,
    });

    if (isPending) return <Loading />;

    if (initialError || error) return <ErrorElement />;

    return (
        <BankerForm
            getData={async () => queryClient.invalidateQueries("banker")}
            value={data}
        />
    );
};
