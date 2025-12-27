"use client";

import { UserContext } from "../../../../../../components/wrappers/UserContextProvider";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import OnlyLoginUser from "../../../../../../components/wrappers/OnlyLoginUser";
import { useContext } from "react";
import { Box, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ACCOUNT_ROUTE } from "../../../../../../configs/routerLinks";
import { useParams } from "next/navigation";
import CreditService from "../../../../../../services/CreditService";
import Loading from "../../../../../../components/loading/Loading";
import ErrorElement from "../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../components/Empty";
import { useQuery } from "@tanstack/react-query";
import StatementCreditItem from "../../../../../../components/credit/StatementCreditItem";
import AproveCreditItem from "../../../../../../components/credit/AproveCreditItem";
import CancelCreditItem from "../../../../../../components/credit/CancelCreditItem";
import { $UserApi } from "../../../../../../http";
import CreditAccordion from "../../../../../../app/[locale]/admin/(dashboard)/users/[id]/credit/CreditAccordion";

export default observer(function Page() {
    const t = useTranslations();
    const { token } = useParams();
    return (
        <OnlyLoginUser>
            <ContainerComponent>
                <Box display={"flex"}>
                    <BreadcrumbsComponent
                        user={true}
                        main={false}
                        options={[
                            {
                                name: t("pages.account.name"),
                                link: ACCOUNT_ROUTE(token),
                            },
                            { name: t("pages.account.credit.name") },
                        ]}
                        sx={{
                            display: "inline-flex",
                            backgroundColor: "error.main",
                            ol: {
                                borderRadius: 0.5,
                                display: "inline-flex",
                                // backgroundColor: "#00427c",
                                padding: "5px 15px",
                            },
                        }}
                    />
                </Box>
                <Box
                    display={"flex"}
                    mt={4}
                    flexDirection={"column"}
                    flex={1}
                    mb={10}
                >
                    <Inner />
                </Box>
            </ContainerComponent>
        </OnlyLoginUser>
    );
});

const credit = new CreditService($UserApi);

function Inner() {
    const { user } = useContext(UserContext);

    const t = useTranslations();
    const { id } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ["credits"],
        queryFn: async () => {
            const { data } = await credit.find(user?.id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;

    if (!data) return <Empty />;

    return (
        <Box flex={1} flexDirection={"column"} gap={2} display={"flex"}>
            <CreditAccordion
                user={true}
                data={data?.statementData}
                label={t("pages.account.credit.statement")}
                InnerComponent={StatementCreditItem}
            />
            <CreditAccordion
                user={true}
                label={t("pages.account.credit.active")}
                data={data?.activeData}
                InnerComponent={AproveCreditItem}
            />
            <CreditAccordion
                user={true}
                label={t("pages.account.credit.cancel")}
                data={data?.cancelData}
                InnerComponent={CancelCreditItem}
            />
        </Box>
    );
}
