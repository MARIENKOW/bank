import { Box, Button, Grid2, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DocumentSignButton from "./buttons/DocumentSignButton";

export default function DocumentItem({ doc }) {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography mb={1} textAlign={"center"} variant="h6">
                {doc?.name}
            </Typography>
            <Box
                sx={{
                    objectFit: "cover",
                    aspectRatio: "2/1",
                    objectPosition: "top",
                }}
                alt="preview"
                width={"100%"}
                component={"img"}
                src={doc?.img?.path}
            />
            <Grid2 container display={"flex"}>
                <Grid2 size={6}>
                    <Box
                        component={"a"}
                        width={"100%"}
                        target="_blank"
                        href={doc?.document?.path}
                    >
                        <Button
                            fullWidth
                            sx={{ minWidth: "0px !important", p: 1 }}
                            color="error"
                            variant="contained"
                        >
                            <OpenInNewIcon color="secondary" />
                        </Button>
                    </Box>
                </Grid2>
                <Grid2 size={6}>
                    <DocumentSignButton doc={doc} />
                </Grid2>
            </Grid2>
        </Box>
    );
}
