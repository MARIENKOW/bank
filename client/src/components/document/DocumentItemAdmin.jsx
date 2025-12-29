import { Box, Button, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DocumentDeleteButton from "./buttons/DocumentDeleteButton";

export default function ({ doc }) {
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
            <Box display={"flex"} flexDirection={"column"} gap={0.5}>
                <Box component={"a"} target="_blank" href={doc?.document?.path}>
                    <Button
                        fullWidth
                        sx={{ minWidth: "0px !important", p: 1 }}
                        variant="contained"
                    >
                        <OpenInNewIcon color="secondary" />
                    </Button>
                </Box>
                {doc?.sign ? (
                    <Box component={"a"} target="_blank" href={doc?.sign?.path}>
                        <Button
                            fullWidth
                            size="small"
                            sx={{
                                fontSize: 11,
                                height: "100%",
                                letterSpacing: 0,
                                color: "secondary.main",
                            }}
                            color="dif"
                            variant="contained"
                        >
                            открыть подпись
                        </Button>
                    </Box>
                ) : (
                    <Button
                        fullWidth
                        disabled
                        size="small"
                        sx={{
                            fontSize: 11,
                            height: "100%",
                            letterSpacing: 0,
                            color: "secondary.main",
                        }}
                        color="dif"
                        variant="contained"
                    >
                        не подписано
                    </Button>
                )}
                <DocumentDeleteButton doc={doc} />
            </Box>
        </Box>
    );
}
