import Card from "@mui/material/Card";
import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid2 as Grid } from "@mui/material";

export const BlogItemImportant = ({ item }) => {
    if (!item) return "";
    return (
        <Link href={BLOG_ROUTE + "/" + item?.id}>
            <Grid spacing={2} sx={{ mb: "20px" }} container columns={2}>
                <Grid size={{ xs: 2, sm: 2 }}>
                    <CardMedia
                        sx={{
                            minHeight: 180,
                            width: "100%",
                            aspectRatio: 3 / 1,
                        }}
                        image={item?.img?.path || "../default.png"}
                        title="BlogImage"
                    />
                </Grid>
                <Grid
                    size={{ xs: 2, sm: 2 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        fontWeight={"500"}
                        gutterBottom
                        variant="h6"
                        color="secondary.main"
                        component="div"
                    >
                        {item?.title}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    );
};
