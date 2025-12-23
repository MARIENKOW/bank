"use client";

import { UserContext } from "../../../../../components/wrappers/UserContextProvider";
import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import OnlyLoginUser from "../../../../../components/wrappers/OnlyLoginUser";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Box, Button, Divider, Paper } from "@mui/material";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import EventsUser from "../EventsUser";
import BankerBtn from "./BankerBtn";

export default observer(function Page() {
    const t = useTranslations();
    const { user } = useContext(UserContext);
    return (
        <OnlyLoginUser>
            <ContainerComponent>
                <Box
                    mt={4}
                    display={"flex"}
                    flexDirection={"column"}
                    flex={1}
                    mb={10}
                >
                    <Box display={"flex"} gap={4} mt={4}>
                        <Box
                            display={"inline-flex"}
                            flexDirection={"column"}
                            pt={1}
                            gap={0.5}
                            pb={1}
                        >
                            <Typography lineHeight={"1"} variant="body1">
                                {t("form.elc")}
                            </Typography>
                            <Typography
                                fontSize={18}
                                fontWeight={600}
                                variant="body1"
                            >
                                {user?.elc}
                            </Typography>
                        </Box>
                        <Box
                            display={"inline-flex"}
                            flexDirection={"column"}
                            pt={1}
                            gap={0.5}
                            pb={1}
                        >
                            <Typography lineHeight={"1"} variant="body1">
                                {t("form.elc")}
                            </Typography>
                            <Typography
                                fontSize={18}
                                fontWeight={600}
                                variant="body1"
                                // variant="h5"
                            >
                                {user?.name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={4} mt={4}>
                        <Box
                            display={"inline-flex"}
                            flexDirection={"column"}
                            gap={0.5}
                            pt={1}
                            pb={1}
                        >
                            <Typography lineHeight={"1"} variant="body1">
                                {t("form.balance")}
                            </Typography>
                            <Typography
                                // fontSize={18}
                                fontWeight={600}
                                variant="h5"
                            >
                                {t("currency", { value: user.balance })}
                            </Typography>
                        </Box>
                        <Box
                            display={"inline-flex"}
                            flexDirection={"column"}
                            gap={0.5}
                            pt={1}
                            pb={1}
                        >
                            <Typography lineHeight={"1"} variant="body1">
                                {t("form.bankNumber")}
                            </Typography>
                            <Typography
                                fontSize={18}
                                fontWeight={600}
                                variant="body1"
                            >
                                {user?.bankNumber}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 4 }} />
                    <Box mt={4}>
                        <BankerBtn />
                    </Box>
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
                                // gap: 1,

                                // flex: 1,
                                maxHeight: 400,
                                overflowY: "scroll",
                            }}
                        >
                            <EventsUser id={user.id} />
                        </Box>
                    </Box>
                </Box>
            </ContainerComponent>
        </OnlyLoginUser>
    );
});
