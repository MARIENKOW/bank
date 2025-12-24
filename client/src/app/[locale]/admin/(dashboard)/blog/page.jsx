import { Box, Button } from "@mui/material";
import { ADMIN_BLOG_CREATE_ROUTE } from "../../../../../configs/routerLinks";
import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import Blogs from "../../../../../components/blog/Blogs";
import BreadcrumbsComponent from "../../../../../components/BreadcrumbsComponent";
import { LanguageChange } from "../../../../../components/native-translate";
import { Link } from "../../../../../i18n/navigation";

export default function Page() {
    return (
        <ContainerComponent
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
            <Box flex={1} gap={2} display={"flex"} flexDirection={"column"}>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexWrap={"nowrap"}
                    flexDirection={"row"}
                    gap={2}
                >
                    <BreadcrumbsComponent
                        options={[{ name: "Блог" }]}
                        sx={{
                            ol: {
                                borderRadius: 2,
                                display: "inline-flex",
                                padding: "5px 15px",
                            },
                        }}
                    />
                    <Box>
                        <LanguageChange />
                        <Link href={ADMIN_BLOG_CREATE_ROUTE}>
                            <Button fullWidth variant="contained">
                                Добавить
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <Blogs />
            </Box>
        </ContainerComponent>
    );
}
