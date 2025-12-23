"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorElement from "../ErrorElement";
import SiteService from "../../services/SiteService";
import { WhatsUpForm } from "../../components/phone/WhatsUpForm";

const site = new SiteService();

export const WhatsUpClient = ({ initialData, initialError }) => {
    const queryClient = useQueryClient();

    const { data, error } = useQuery({
        queryKey: ["whatsup"],
        queryFn: async () => {
            const { data } = await site.getWhatsUp();
            return data;
        },
        initialData,
    });

    if (initialError || error) return <ErrorElement />;


    return (
        <WhatsUpForm
            getData={async () => queryClient.invalidateQueries("whatsup")}
            value={data}
        />
    );
};
