import { Box, Grid2, Typography } from "@mui/material";
import BlogItemUser from "../../components/blog/item/BlogItemUser";

import BlogService from "../../services/BlogService";

import { Subtitile } from "../Subtitle";
import { getLocale } from "next-intl/server";
import { BlogItemContent } from "../../components/blog/item/BlogItemContent";
import { Link } from "../../i18n/navigation";
import { BLOG_ROUTE } from "../../configs/routerLinks";

const blog = new BlogService();

export const BlogsUser = async ({ token }) => {
    const locale = await getLocale();
    try {
        const { data } = await blog.getAll(null, locale);
        return (
            <Box>
                <Subtitile text={"Все новости"} />
                <Box display={"flex"} flexDirection={"column"} gap={7}>
                    <Grid2 container columns={2} spacing={2}>
                        {data?.data?.map((Blog) => (
                            <Grid2 key={Blog?.id} size={{ xs: 2, md: 1 }}>
                                <Link href={BLOG_ROUTE(token) + "/" + Blog.id}>
                                    <BlogItemContent Blog={Blog} />
                                </Link>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Box>
        );
    } catch (error) {
        console.log(error);
    }
};
