"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import UserService from "../../../../../../services/UserService";
import { useParams } from "next/navigation";
import { UserNameForm } from "../../../../../../components/form/user/UserNameForm";
import Loading from "../../../../../../components/loading/Loading";
import ErrorElement from "../../../../../../components/ErrorElement";
import { UserUsernameForm } from "../../../../../../components/form/user/UserUsernameForm";
import { Box, Button, Typography } from "@mui/material";
import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ADMIN_USERS_ROUTE } from "../../../../../../configs/routerLinks";
import { UserPasswordForm } from "../../../../../../components/form/user/UserPasswordForm";
import { UserElcForm } from "../../../../../../components/form/user/UserElcForm";
import { UserBankNumberForm } from "../../../../../../components/form/user/UserBankNumberForm";
import { useTranslations } from "next-intl";
import Events from "./Events";
import EventAdd from "./EventAdd";
import { StyledLoadingButton } from "../../../../../../components/form/StyledLoadingButton";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import EventService from "../../../../../../services/EventService";
import { BankerForm } from "../../../../../../components/phone/BankerForm";
import NavigationButton from "./NavigationButton";
import { UserReservedBalanceForm } from "../../../../../../components/form/user/UserReservedBalanceForm";

const userService = new UserService();
const event = new EventService();

export default function Page() {
    const [loading, setLoading] = useState(false);
    const t = useTranslations();
    const { id } = useParams();
    const { data, error, isPending } = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const { data } = await userService.getById(id);
            return data;
        },
    });
    const queryClient = useQueryClient();

    if (isPending) return <Loading />;
    if (error) return <ErrorElement />;
    if (!data) return <ErrorElement />;

    const handleDeleteEvents = async () => {
        try {
            setLoading(true);
            if (!window.confirm("Удалить все события?")) return;
            await event.deleteAll(id);
            await queryClient.invalidateQueries({ queryKey: ["user", id] });
            await queryClient.invalidateQueries({ queryKey: ["events", id] });
            enqueueSnackbar(`События удалены!`, { variant: "success" });
        } catch (error) {
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                }
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <ContainerComponent>
            <Box flex={1} display={"flex"} flexDirection={"column"} gap={4}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    // justifyContent={"space-between"}
                    flexWrap={"wrap"}
                    flexDirection={"row"}
                    gap={2}
                >
                    <BreadcrumbsComponent
                        options={[
                            { name: "Клиенты", link: ADMIN_USERS_ROUTE },
                            { name: data.username },
                        ]}
                        sx={{
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                // backgroundColor: "#00427c",
                                padding: "5px 15px",
                            },
                        }}
                    />

                    <Box flex={1} display={"flex"} justifyContent={"right"}>
                        <NavigationButton id={id} />
                    </Box>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    // alignItems={"center"}
                    flexDirection={"column"}
                    flex={1}
                >
                    <Box
                        display={"flex"}
                        flexDirection={{ xs: "column" }}
                        gap={3}
                    >
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            flexDirection={"column"}
                            gap={2}
                        >
                            <UserUsernameForm item={data} />
                            <UserPasswordForm item={data} />
                            <UserNameForm item={data} />
                            <UserElcForm item={data} />
                            <UserBankNumberForm item={data} />
                            <UserReservedBalanceForm item={data} />
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={{ xs: "column", md: "row" }}
                        gap={3}
                        mt={4}
                    >
                        <Box flex={{ xs: "auto", md: "0 1 50%" }}>
                            <Box>
                                <Typography variant="h6">сотрудник</Typography>
                                <BankerForm id={id} value={data} />
                            </Box>
                        </Box>
                        <Box flex={{ xs: "auto", md: "0 1 50%" }}>
                            <Box>
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    flexDirection={{ xs: "column", md: "row" }}
                                    justifyContent={"space-between"}
                                    mb={2}
                                >
                                    <Typography variant="h5" color="initial">
                                        {t("currency", { value: data.balance })}
                                    </Typography>
                                    <Box
                                        gap={1}
                                        display={"flex"}
                                        alignItems={"center"}
                                    >
                                        <StyledLoadingButton
                                            loading={loading}
                                            onClick={handleDeleteEvents}
                                            variant="outlined"
                                            color="error"
                                        >
                                            удалить все
                                        </StyledLoadingButton>
                                        <EventAdd
                                            id={id}
                                            balance={data?.balance}
                                        />
                                    </Box>
                                </Box>
                                <Events id={id} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ContainerComponent>
    );
}
