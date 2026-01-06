"use client";

import Loading from "../../../../../../../components/loading/Loading";
import { $AdminApi } from "../../../../../../../http";
import { useQuery } from "@tanstack/react-query";
import ErrorElement from "../../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../../components/Empty";
import { Box, Paper } from "@mui/material";
import StatementCreditItemAdmin from "../../../../../../../components/credit/StatementCreditItemAdmin";
import { useParams } from "next/navigation";
import CreditService from "../../../../../../../services/CreditService";
import CreditAccordion from "./CreditAccordion";
import AproveCreditItemAdmin from "../../../../../../../components/credit/AproveCreditItemAdmin";
import CancelCreditItemAdmin from "../../../../../../../components/credit/CancelCreditItemAdmin";

const credit = new CreditService($AdminApi);

export default function Credits({}) {
    const { id } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ["credits", id],
        queryFn: async () => {
            const { data } = await credit.find(id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement admin={true} />;

    if (!data) return <Empty admin={true} />;

    return (
        <Box flex={1} justifyContent={'center'} flexDirection={"column"} gap={2} display={"flex"}>
            <CreditAccordion
                data={data?.statementData}
                label={"Активные заявки"}
                InnerComponent={StatementCreditItemAdmin}
            />
            <CreditAccordion
                label={"Активные кредиты"}
                data={data?.activeData}
                InnerComponent={AproveCreditItemAdmin}
            />
            <CreditAccordion
                label={"Отмененные кредиты"}
                data={data?.cancelData}
                InnerComponent={CancelCreditItemAdmin}
            />
        </Box>
    );
}
