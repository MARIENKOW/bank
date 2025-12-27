"use client";

import { useQuery } from "@tanstack/react-query";
import { UserInsuranceElcForm } from "../../../../../../../components/form/user/UserInsuranceElcForm";
import UserService from "../../../../../../../services/UserService";
import { useParams } from "next/navigation";
import Loading from "../../../../../../../components/loading/Loading";

const user = new UserService();

export function InsuranceElcClient() {
    const { id } = useParams();
    const { data, error, isPending } = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const { data } = await user.getById(id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;
    if (!data) return <ErrorElement />;
    return <UserInsuranceElcForm item={data} />;
}
