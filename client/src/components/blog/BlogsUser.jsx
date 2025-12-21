"use client";

import WithTitleWrapper from "../wrappers/WithTitleWrapper";
import { Box, Grid2, Typography } from "@mui/material";
import { ContainerComponent } from "../../components/wrappers/ContainerComponent";
import BlogItemUser from "../../components/blog/item/BlogItemUser";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import BlogService from "../../services/BlogService";
import { enqueueSnackbar } from "notistack";
import { CanceledError } from "axios";
import { grey } from "@mui/material/colors";
import { Subtitile } from "../Subtitle";

const blog = new BlogService();

export const BlogsUser = ({ data }) => {
    const [blogData, setBlogData] = useState(data.data);
    const [paginationInfo, setpaginationInfo] = useState({ ...data.info });
    console.log(paginationInfo);
    return (
        <Box>
            <Subtitile text={"Все новости"} />
            <Box display={"flex"} flexDirection={"column"} gap={7}>
                <Grid2 container columns={2} spacing={2}>
                    {blogData.map((Blog) => (
                        <Grid2 key={Blog?.id} size={{ xs: 2, md: 1 }}>
                            <BlogItemUser Blog={Blog} />
                        </Grid2>
                    ))}
                </Grid2>
                <Pagination
                    pageCount={paginationInfo.countPages}
                    currentPage={paginationInfo.currentPage}
                    getData={async (page) => {
                        try {
                            const { data: reloadData } = await blog.getAll(
                                page
                            );
                            if (
                                !reloadData?.data ||
                                reloadData?.data?.length === 0
                            )
                                throw new Error("data is not defined");

                            setBlogData(reloadData?.data);
                            setpaginationInfo({ ...reloadData?.info });
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
        </Box>
    );
};
