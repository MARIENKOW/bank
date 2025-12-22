"use client";

import { UserContext } from "../../../../../components/wrappers/UserContextProvider";
import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import OnlyLoginUser from "../../../../../components/wrappers/OnlyLoginUser";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Box, Paper } from "@mui/material";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import EventsUser from "../EventsUser";

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
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"flex-start"}
                    >
                        <Typography color="dif" variant="body2">
                            @{user?.username}
                        </Typography>
                        <Typography variant="h5">{user?.name}</Typography>
                    </Box>
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
                    <Paper sx={{ p: 2, mt: 4 }}>
                        <Typography
                            variant="body1"
                            color="secondary"
                            fontWeight={600}
                        >
                            {t("pages.account.text")}
                        </Typography>
                    </Paper>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"space-between"}
                        flexDirection={"column"}
                        mb={2}
                        flex={1}
                        mt={4}
                    >
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
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                        pt={1}
                        flex={1}
                        pb={1}
                    >
                        <Typography
                            maxWidth={250}
                            lineHeight={"1"}
                            variant="body1"
                        >
                            {t("form.events")}
                        </Typography>
                        <Paper
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,

                                p: 1,
                                // flex: 1,
                                maxHeight: 300,
                                overflowY: "scroll",
                            }}
                        >
                            <EventsUser id={user.id} />
                        </Paper>
                    </Box>
                </Box>
            </ContainerComponent>
        </OnlyLoginUser>
    );
});
