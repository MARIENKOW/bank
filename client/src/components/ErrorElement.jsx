import { Typography, Container } from "@mui/material";
import { useTranslations } from "next-intl";

const ErrorElement = ({ message, admin }) => {
    const t = useTranslations();
    return (
        <Container
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
                textAlign: "center",
            }}
            gap={2}
        >
            <Typography color={"primary.dark"} variant={"h1"}>
                {admin ? "Упс!" : t("error.title")}
            </Typography>
            <Typography color={"primary.dark"} variant={"h4"}>
                {admin ? "Что-то пошло не так!" : t("error.subtitle")}
            </Typography>
            {/* {(message?.message || message) && (
                <Typography variant={"body1"} color="primary.light">
                    {message?.message || message || ""}
                </Typography>
            )} */}
        </Container>
    );
};

export default ErrorElement;
