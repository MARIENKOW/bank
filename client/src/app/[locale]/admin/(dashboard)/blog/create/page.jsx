"use client";

import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import { ADMIN_BLOG_ROUTE } from "../../../../../../configs/routerLinks";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import { enqueueSnackbar } from "notistack";
import BlogService from "../../../../../../services/BlogService";
import BlogForm from "../../../../../../components/blog/form/BlogForm";
import { Box } from "@mui/material";
import { LanguageChange } from "../../../../../../components/native-translate";
import { useLocale } from "next-intl";
import { useRouter } from "../../../../../../i18n/navigation";

const blog = new BlogService();

export default function () {
    const router = useRouter();
    const locale = useLocale();

    const onSubmit = (body, setError) => async (data) => {
        try {
            await blog.create({
                ...data,
                ...body,
                date: data?.date?.format("YYYY-MM-DD") || null,
                locale,
            });
            enqueueSnackbar(`Новость добавлено!`, { variant: "success" });
            router.push(ADMIN_BLOG_ROUTE);
        } catch (e) {
            console.error(e);
            if (e?.response?.status === 400) {
                const errors = e?.response?.data || {};
                for (let key in errors) {
                    setError(key, { type: "server", message: errors[key] });
                }
                return;
            }
            setError("root.server", {
                type: "server",
                message: "Упс! Что-то пошло не так, попрорбуйте позже",
            });
        }
    };

    return (
        <ContainerComponent>
            <BreadcrumbsComponent
                options={[
                    { name: "Блог", link: ADMIN_BLOG_ROUTE },
                    { name: "Добавить" },
                ]}
                sx={{
                    ol: {
                        borderRadius: 2,
                        display: "inline-flex",
                        padding: "5px 15px",
                    },
                }}
            />
            <Box mt={5}>
                <BlogForm onSubmit={onSubmit} />
            </Box>
        </ContainerComponent>
    );
}
