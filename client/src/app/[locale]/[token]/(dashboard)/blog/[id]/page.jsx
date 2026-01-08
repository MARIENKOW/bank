import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import { Box } from "@mui/material";
import { MAIN_ROUTE } from "../../../../../../configs/routerLinks";
import BlogService from "../../../../../../services/BlogService";
import BlogFullItem from "../../../../../../components/blog/item/BlogFullItem";
import { BlogsImportant } from "../../../../../../components/blog/BlogsImportant";
import { getLocale } from "next-intl/server";
import RedirectWithMessage from "../../../../../../components/events/RedirectWithMessage";
import { redirect } from "../../../../../../i18n/navigation";

const blog = new BlogService();

export default async function Page({ params }) {
    const { id, token } = await params;
    const locale = await getLocale();
    console.log(MAIN_ROUTE(token));

    let errorM = false;
    let data = null;

    try {
        const { data: dataS } = await blog.getById(id, locale);
        data = dataS;
    } catch (error) {
        errorM = error;
    }

    if (!data || errorM) {
        console.log("Params:", { id, token, locale });
        console.log("MAIN_ROUTE:", MAIN_ROUTE(token));
        // return redirect(MAIN_ROUTE(token));
        return <RedirectWithMessage link={MAIN_ROUTE(token)} />;
    }

    return (
        <Box backgroundColor={"#fff"}>
            <Box pb={0} overflow={"hidden"} position={"relative"}>
                <ContainerComponent
                    sx={{ pr: { xs: 0, md: 2 }, pl: { xs: 0, md: 2 } }}
                >
                    <Box
                        sx={{ pr: { xs: 2, md: 0 }, pl: { xs: 2, md: 0 } }}
                    ></Box>
                    <Box mb={5} mt={5}>
                        <BlogFullItem Blog={data} />
                    </Box>
                </ContainerComponent>
            </Box>
        </Box>
    );
}
