import { Box, Typography } from "@mui/material";
import SickIcon from "@mui/icons-material/Sick";
import InCenter from "./wrappers/InCenter";
import { useTranslations } from "next-intl";

export const Empty = ({ admin }) => {
    const t = useTranslations();
    if (!admin) {
        return null;
    }
    return (
        <InCenter>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={2}
            >
                <SickIcon sx={{ width: 50, height: 50 }} color="primary" />
                <Typography
                    color={"primary"}
                    variant="h5"
                    fontWeight={600}
                    textAlign={"center"}
                >
                    {admin ? "Тут пока что пусто." : t("empty")}
                </Typography>
            </Box>
        </InCenter>
    );
};
