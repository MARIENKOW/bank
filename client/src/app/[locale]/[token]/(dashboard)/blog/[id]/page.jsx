import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import { Box } from "@mui/material";
import { MAIN_ROUTE } from "../../../../../../configs/routerLinks";
import BlogService from "../../../../../../services/BlogService";
import RedirectWithMessage from "../../../../../../components/events/RedirectWithMessage";
import BlogFullItem from "../../../../../../components/blog/item/BlogFullItem";
import { BlogsImportant } from "../../../../../../components/blog/BlogsImportant";

const blog = new BlogService();

export default async function Page({ params }) {
    const { id, token } = await params;

    try {
        const { data } = await blog.getById(id);

        if (!data)
            return (
                <RedirectWithMessage
                    message="Упс! Блог не найдено"
                    link={MAIN_ROUTE}
                />
            );

        return (
            <Box backgroundColor={"#fff"}>
                <Box
                    pt={{ xs: 15, md: 20 }}
                    pb={0}
                    overflow={"hidden"}
                    position={"relative"}
                >
                    <ContainerComponent
                        sx={{ pr: { xs: 0, md: 2 }, pl: { xs: 0, md: 2 } }}
                    >
                        <Box
                            sx={{ pr: { xs: 2, md: 0 }, pl: { xs: 2, md: 0 } }}
                        >
                            <BreadcrumbsComponent
                                sx={{
                                    position: "relative",
                                    zIndex: "10",
                                    display: "inline-block",
                                    // width:'100%',
                                    ol: {
                                        borderRadius: 2,
                                        display: "inline-flex",
                                        backgroundColor: "#00427c",
                                        padding: "5px 15px",
                                    },
                                }}
                                main={false}
                                options={[
                                    {
                                        name: "Новости",
                                        link: MAIN_ROUTE(token),
                                    },
                                    { name: data?.title },
                                ]}
                            />
                        </Box>
                        <Box mb={5} mt={5}>
                            <BlogFullItem Blog={data} />
                        </Box>
                    </ContainerComponent>
                    <BlogsImportant />
                </Box>
            </Box>
        );
    } catch (error) {
        return <RedirectWithMessage link={MAIN_ROUTE} />;
    }
}
