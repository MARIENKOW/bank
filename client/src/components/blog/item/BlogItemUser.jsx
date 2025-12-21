'use client'

import Card from "@mui/material/Card";
import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import { BlogItemContent } from "./BlogItemContent";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material";

const BlogItemUser = ({ Blog }) => {
    const theme = useTheme()
    if (!Blog) return "";
    return (
        <Link href={BLOG_ROUTE + "/" + Blog?.id}>
            <Card
                sx={{
                    
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    // border: "1px solid #bebebe",
                    borderRadius: 5,
                    cursor: "pointer",
                    // bgcolor:theme.palette.primary.contrastText,
                    transition: ".2s",
                    boxShadow:'none',
                    "&:hover": {
                        transform: "scale(1.01)",
                    },
                }}
            >
                <BlogItemContent Blog={Blog} />
            </Card>
        </Link>
    );
};

export default BlogItemUser;
