"use client";

import { useQuery } from "@tanstack/react-query";
import { UserInsuranceElcForm } from "../../../../../../../components/form/user/UserInsuranceElcForm";
import UserService from "../../../../../../../services/UserService";

const user = new UserService();

export function InsuranceElcClient({ initialData }) {
    const { data, error, isPending } = useQuery({
        queryKey: ["user", initialData.id],
        initialData,
        queryFn: async () => {
            const { data } = await user.getById(initialData.id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;
    if (!data) return <ErrorElement />;
    return <UserInsuranceElcForm item={data} />;
}
