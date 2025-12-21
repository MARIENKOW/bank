import { Box } from "@mui/material";
import BreadcrumbsComponent from "../../../../../components/BreadcrumbsComponent";
import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import Users from "./Users";
import UserAdd from "./UserAdd";

export default function Page() {
    return (
        <ContainerComponent>
            <Box display={'flex'} flexDirection={'column'} gap={4} flex={1} >
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexWrap={"nowrap"}
                    flexDirection={"row"}
                    gap={2}
                >
                    <BreadcrumbsComponent
                        options={[{ name: "Клиенты" }]}
                        sx={{
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                // backgroundColor: "#00427c",
                                padding: "5px 15px",
                            },
                        }}
                    />
                    <UserAdd />
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    flex={1}
                >
                    <Users />
                </Box>
            </Box>
        </ContainerComponent>
    );
}
