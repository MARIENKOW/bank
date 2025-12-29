"use client";

import { useEffect, useState } from "react";
import BlogService from "../../services/BlogService";
import Loading from "../loading/Loading";
import { Empty } from "../Empty";
import ErrorElement from "../ErrorElement";
import { Box, Grid2 } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { enqueueSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import BlogItem from "./item/BlogItem";
import { CanceledError } from "axios";
import Pagination from "../../components/Pagination";
import { flushSync } from "react-dom";
import { useLocale } from "next-intl";

const blog = new BlogService();
const blogDelete = new BlogService();
const blogSetMain = new BlogService();
const blogDeleteMain = new BlogService();

export default function Blogs() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [error, setError] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const locale = useLocale();

    async function getAllBlogs(page = null) {
        try {
            const { data } = await blog.getAll(page, locale);
            // setPaginationInfo(data.info);
            // setData(data.data);
            flushSync(() => {
                // ✅ Принудительно применяем ВСЕ сразу
                setData(data.data);
                setPaginationInfo(data.info);
                setLoading(false);
            });
        } catch (error) {
            if (error instanceof CanceledError) return;
            console.log(error);
            setError(error);
            setLoading(false);
        } finally {
        }
    }

    useEffect(() => {
        getAllBlogs();
    }, []);

    console.log(loading);
    console.log(data);

    if (loading) return <Loading />;

    if (error) return <ErrorElement admin={true} message={error} />;

    if (!data || data?.length === 0) return <Empty admin={true} />;

    const handleClickDelite = async (id, name) => {
        const agree = window.confirm(
            `Вы уверены, что хотите удалить \n "${name}" ?`
        );
        if (!agree) return;
        setOpenBackdrop(true);
        try {
            await blogDelete.delete(id);
            enqueueSnackbar(`Новость "${name}" удалено`, {
                variant: "success",
            });
            try {
                const pageAfterDelete =
                    paginationInfo.isLastPage &&
                    paginationInfo.itemsOnCurrentPage == 1
                        ? paginationInfo?.currentPage - 1
                        : paginationInfo?.currentPage;
                console.log(pageAfterDelete);
                await getAllBlogs(pageAfterDelete || null);
            } catch (e) {
                console.dir(e);
                enqueueSnackbar(
                    "Упс! что-то пошло не так. Перезагрузите страницу",
                    {
                        variant: "error",
                    }
                );
            }
        } catch (e) {
            console.dir(e);
            enqueueSnackbar("Упс! что-то пошло не так", { variant: "error" });
        } finally {
            setOpenBackdrop(false);
        }
    };
    const handleClickSetMain = async (id) => {
        setOpenBackdrop(true);
        try {
            await blogSetMain.setMain(id);
            enqueueSnackbar(`Главная новость выбрана`, {
                variant: "success",
            });
            try {
                await getAllBlogs();
                window.scrollTo(0, 0);
            } catch (e) {
                console.dir(e);
                enqueueSnackbar(
                    "Упс! что-то пошло не так. Перезагрузите страницу",
                    {
                        variant: "error",
                    }
                );
            }
        } catch (e) {
            console.dir(e);
            enqueueSnackbar("Упс! что-то пошло не так", { variant: "error" });
        } finally {
            setOpenBackdrop(false);
        }
    };
    const handleClickDeleteMain = async (id) => {
        setOpenBackdrop(true);
        try {
            await blogDeleteMain.deleteMain(id);
            enqueueSnackbar(`Главная новость снята`, {
                variant: "success",
            });
            try {
                await getAllBlogs();
                window.scrollTo(0, 0);
            } catch (e) {
                console.dir(e);
                enqueueSnackbar(
                    "Упс! что-то пошло не так. Перезагрузите страницу",
                    {
                        variant: "error",
                    }
                );
            }
        } catch (e) {
            console.dir(e);
            enqueueSnackbar("Упс! что-то пошло не так", { variant: "error" });
        } finally {
            setOpenBackdrop(false);
        }
    };

    return (
        <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Grid2 container columns={2} spacing={2}>
                {data?.map((Blog) => (
                    <Grid2 key={Blog?.id} size={{ xs: 2, md: 1 }}>
                        <BlogItem
                            deletePost={handleClickDelite}
                            setMainPost={handleClickSetMain}
                            deleteMainPost={handleClickDeleteMain}
                            Blog={Blog}
                        />
                    </Grid2>
                ))}
            </Grid2>

            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openBackdrop}
            >
                <CircularProgress />
            </Backdrop>
            <Pagination
                color={"primary"}
                pageCount={paginationInfo.countPages}
                currentPage={paginationInfo.currentPage}
                getData={async (page) => {
                    try {
                        const { data: reloadData } = await blog.getAll(page);
                        if (!reloadData?.data || reloadData?.data?.length === 0)
                            throw new Error("data is not defined");

                        setData(reloadData.data);
                        setPaginationInfo(reloadData.info);
                        window.scrollTo(0, 0);
                    } catch (e) {
                        if (e instanceof CanceledError) return;
                        console.log(e);
                        enqueueSnackbar("Упс! что то пошло не так", {
                            variant: "error",
                        });
                    }
                }}
            />
        </Box>
    );
}
