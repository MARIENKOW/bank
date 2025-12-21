import Link from "next/link";
import { BLOG_ROUTE } from "../../../configs/routerLinks";
import Typography from "@mui/material/Typography";
import { Grid2 as Grid } from "@mui/material";
import DatePharse from "../../../components/DatePharse";
import { grey } from "@mui/material/colors";
import style from "./BlogItem.module.scss";

export const BlogItemShort = ({ item }) => {
    if (!item) return "";
    return (
        <Link href={BLOG_ROUTE + "/" + item?.id}>
            <Grid spacing={0.1} container columns={2}>
                {/* <Grid size={{ xs: 2, sm: 2 }}>
                    <Typography
                        // textAlign={"right"}
                        // sx={{ maxWidth: "400px" }}
                        fontWeight={"400"}
                        gutterBottom
                        fontSize={13}
                        color="secondary.dark"
                        variant="body1"
                        component="div"
                    >
                        <DatePharse date={item?.date} />
                    </Typography>
                </Grid> */}
                <Grid
                    size={{ xs: 2, sm: 2 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        className={style.textShort}
                        fontWeight={"500"}
                        gutterBottom
                        color="secondary.main"
                        variant="body1"
                        textAlign={'center'}
                        component="div"
                    >
                        {item?.title}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    );
};
