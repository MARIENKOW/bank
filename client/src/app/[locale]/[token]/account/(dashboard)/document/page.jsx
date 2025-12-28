"use client";

import { UserContext } from "../../../../../../components/wrappers/UserContextProvider";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import OnlyLoginUser from "../../../../../../components/wrappers/OnlyLoginUser";
import { useContext } from "react";
import { Box, Divider, Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ACCOUNT_ROUTE } from "../../../../../../configs/routerLinks";
import { useParams } from "next/navigation";
import Loading from "../../../../../../components/loading/Loading";
import ErrorElement from "../../../../../../components/ErrorElement";
import { Empty } from "../../../../../../components/Empty";
import { useQuery } from "@tanstack/react-query";
import { $UserApi } from "../../../../../../http";
import UserDocumentService from "../../../../../../services/UserDocumentService";
import DocumentItem from "../../../../../../components/document/DocumentItem";


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
                            { name: t("pages.account.document.name") },
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

const userDocument = new UserDocumentService($UserApi);

function Inner() {
    const { user } = useContext(UserContext);

    const t = useTranslations();
    const { id } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ["documents"],
        queryFn: async () => {
            const { data } = await userDocument.find(user?.id);
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
            }}
        >
            <Grid2 container spacing={2}>
                {data?.map((doc) => (
                    <Grid2 size={{ xs: 12, md: 6 }} key={doc?.id}>
                        <DocumentItem doc={doc} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}
