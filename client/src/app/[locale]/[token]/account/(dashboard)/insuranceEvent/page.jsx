"use client";

import { UserContext } from "../../../../../../components/wrappers/UserContextProvider";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import OnlyLoginUser from "../../../../../../components/wrappers/OnlyLoginUser";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Box, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import EventsInsuranceUser from "./EventsInsuranceUser";
import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ACCOUNT_ROUTE } from "../../../../../../configs/routerLinks";
import { useParams } from "next/navigation";

export default observer(function Page() {
    const t = useTranslations();
    const { user } = useContext(UserContext);
    const { token } = useParams();
    return (
        <OnlyLoginUser>
            <ContainerComponent>
                <Box display={'flex'} >
                    <BreadcrumbsComponent
                        user={true}
                        main={false}
                        options={[
                            {
                                name: t("pages.account.name"),
                                link: ACCOUNT_ROUTE(token),
                            },
                            { name: t("pages.account.insurance.name") },
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
                <Box display={"flex"} mt={4} flexDirection={"column"} flex={1} mb={10}>
                    <Box
                        display={"inline-flex"}
                        flexDirection={"column"}
                        pt={1}
                        gap={0.5}
                        pb={1}
                    >
                        <Typography lineHeight={"1"} variant="body1">
                            {t("form.insurance_elc")}
                        </Typography>
                        <Typography
                            fontSize={18}
                            fontWeight={600}
                            variant="body1"
                        >
                            {user?.insurance_elc}
                        </Typography>
                    </Box>
                    <Divider sx={{ mt: 4 }} />
                    <Box
                        mt={4}
                        display={"flex"}
                        flexDirection={"column"}
                        // gap={1}
                        pt={1}
                        flex={1}
                        pb={1}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxHeight: 400,
                                overflowY: "scroll",
                            }}
                        >
                            <EventsInsuranceUser id={user.id} />
                        </Box>
                    </Box>
                </Box>
            </ContainerComponent>
        </OnlyLoginUser>
    );
});
