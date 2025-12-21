'use client'

import style from "./BlogItem.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid2 as Grid, Button, Box, useTheme } from "@mui/material";
import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import DatePharse from "../../../components/DatePharse";
import { grey } from "@mui/material/colors";
import { Subtitile } from "../../../components/Subtitle";

export const BlogItemMain = ({ Blog }) => {
    const theme = useTheme()
    if (!Blog) return "";
    return (
        <Box>
            <Box pr={2}>
                <Subtitile text={"ВНИМАТЕЛЬНО - мошенники активизировались"} />
            </Box>

            <Card
                sx={{
                    // height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 0,
                    // bgcolor: theme.palette.primary.contrastText,
                    boxShadow: "none",
                    // border: "1px solid #bebebe",
                    // borderRadius: 5,
                    // cursor: "pointer",
                    // transition: ".2s",
                    // "&:hover": {
                    // transform: "scale(1.01)",
                    // },
                }}
            >
                <CardContent
                    className={style.text}
                    sx={{ flex: "1", paddingBottom: "0px !important" }}
                >
                    <Grid
                        spacing={2}
                        sx={{ mb: "20px" }}
                        container
                        columns={10}
                    >
                        <Grid size={{ xs: 10, sm: 5 }}>
                            <CardMedia
                                sx={{
                                    minHeight: 180,
                                    width: "100%",
                                    aspectRatio: 2 / 1,
                                }}
                                image={Blog?.img?.path || "../default.png"}
                                title="BlogImage"
                            />
                        </Grid>
                        <Grid
                            size={{ xs: 10, sm: 5 }}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                // justifyContent: "center",

                                // alignItems: "center",
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
                        component={"div"}
                        dangerouslySetInnerHTML={{ __html: Blog?.body }}
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxHeight: "300px", overflow: "hidden" }}
                    />
                    <Link
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            zIndex: 3,
                            padding: 15,
                            borderRadius: "10px 0 0 0",
                            background: "#fff",
                        }}
                        href={BLOG_ROUTE + "/" + Blog?.id}
                    >
                        <Button size="large" variant="outlined" color="primary">
                            Читать полностью
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </Box>
    );
};
