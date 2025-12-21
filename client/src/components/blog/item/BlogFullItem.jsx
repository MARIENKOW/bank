'use client'

import style from "./BlogItem.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Grid2 as Grid, useTheme } from "@mui/material";
import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import { grey } from "@mui/material/colors";
import DatePharse from "../../../components/DatePharse";

const BlogFullItem = ({ Blog }) => {
    const theme = useTheme();
    if (!Blog) return "sdfsdf";
    return (
        <>
            {Blog?.img?.path && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Box sx={{ position: "relative", maxHeight: "100%" }}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                aspectRatio: "2.5/1",
                                objectFit: "cover",
                                opacity: "0.7",
                            }}
                            component={"img"}
                            src={Blog?.img?.path}
                        ></Box>
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: `linear-gradient(#8080806b,#fff)`,
                            }}
                        ></Box>
                    </Box>
                </Box>
            )}
            <Card
                sx={{
                    position: "relative",
                    boxShadow: "0px 0px 20px -5px #8c8c8c",
                    zIndex: "10",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #9f9f9f",
                    borderRadius: 5,
                    cursor: "auto",
                    backgroundColor: "#fff",
                    transition: ".2s",
                }}
            >
                <CardContent sx={{ flex: "1" }}>
                    <Grid
                        spacing={2}
                        sx={{ mb: "20px" }}
                        container
                        columns={10}
                    >
                        <Grid size={{ xs: 10, sm: 5 }}>
                            {/* <CardMedia
                           sx={{ height: "auto", width: "100%" }}
                           image={Blog?.img?.path || "../default.png"}
                           title="BlogImage"
                        /> */}
                            <Box
                                component={"img"}
                                sx={{ width: "100%" }}
                                alt="BlogImage"
                                src={Blog?.img?.path || "../default.png"}
                            />
                        </Grid>
                        <Grid
                            size={{ xs: 10, sm: 5 }}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                fontWeight={"700"}
                                gutterBottom
                                sx={{ fontSize: { md: 42, xs: 30 } }}
                                variant="h3"
                                component="div"
                            >
                                {Blog?.title}
                            </Typography>
                            <Typography
                                // textAlign={"right"}
                                // sx={{ maxWidth: "400px" }}
                                fontWeight={"500"}
                                gutterBottom
                                fontSize={16}
                                sx={{ color: grey[600] }}
                                variant="body1"
                                component="div"
                            >
                                <DatePharse date={Blog?.date} />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography
                        dangerouslySetInnerHTML={{ __html: Blog?.body }}
                        variant="body2"
                        color="text.secondary"
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default BlogFullItem;
