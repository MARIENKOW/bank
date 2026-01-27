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
import { $UserApi } from "../../../../../../http";
import InsuranceService from "../../../../../../services/InsuranceService";
import InsuranceAccordionUser from "./InsuranceAccordionUser";

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
                            { name: t("pages.account.insurance_1.name") },
                        ]}
                        sx={{
                            display: "inline-flex",
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

const insurance = new InsuranceService($UserApi);

function Inner() {
    const { user } = useContext(UserContext);

    const { isPending, error, data } = useQuery({
        queryKey: ["insurances"],
        queryFn: async () => {
            const { data } = await insurance.find(user?.id);
            return data;
        },
    });

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;

    if (!data || data?.length === 0) return <Empty />;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 1,
                gap: 1,
            }}
        >
            {data.map((insurance, i) => (
                <InsuranceAccordionUser
                    user={true}
                    i={i}
                    key={insurance.id}
                    item={insurance}
                />
            ))}
        </Box>
    );
}
