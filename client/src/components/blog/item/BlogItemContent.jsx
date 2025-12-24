// import style from "./BlogItem.module.scss";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid2 as Grid } from "@mui/material";
import DatePharse from "../../../components/DatePharse";
import { grey } from "@mui/material/colors";

export const BlogItemContent = ({ Blog }) => {
    return (
        <CardContent
            // className={style.text}
            sx={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "0px !important",
            }}
        >
            <Grid spacing={2} sx={{ mb: "20px" }} container columns={2}>
                <Grid size={{ xs: 2, sm: 2 }}>
                    <CardMedia
                        sx={{
                            minHeight: 180,
                            width: "100%",
                            aspectRatio: 3 / 1,
                        }}
                        image={Blog?.img?.path || "/default.png"}
                        title="BlogImage"
                    />
                </Grid>
                <Grid
                    size={{ xs: 2, sm: 2 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        // alignItems: "center",
                    }}
                >
                    <Typography
                        // sx={{ maxWidth: "400px" }}
                        fontWeight={"700"}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {Blog?.title}
                    </Typography>
                    {/* <Typography
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
                    </Typography> */}
                </Grid>
            </Grid>
            {/* <Typography
                flex={1}
                component={"div"}
                dangerouslySetInnerHTML={{ __html: Blog?.body }}
                variant="body2"
                color="text.secondary"
                sx={{ maxHeight: "86px", overflow: "hidden" }}
            /> */}
        </CardContent>
    );
};
