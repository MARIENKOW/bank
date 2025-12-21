"use client";

import { Box, Typography } from "@mui/material";
import { StyledLoadingButton } from "../form/StyledLoadingButton";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { enqueueSnackbar } from "notistack";
import { CanceledError } from "axios";
import AccessService from "../../services/AccessService";
import CopyToClipboard from "./CopyToClipboard";
import config from "../../configs/config";

const access = new AccessService();

export const Access = ({ item, getData }) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState();

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            if (!confirm(`Удалить ${item.name}?`))
                return setIsDeleteLoading(false);
            await access.deleteToken(item.id);
            await getData();
            enqueueSnackbar(`Доступ удален!`, { variant: "success" });
        } catch (e) {
            if (e instanceof CanceledError) return;
            console.log(e);
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                }
            );
        } finally {
            setIsDeleteLoading(false);
        }
    };

    return (
        <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Box
                flex={"0 1 400px"}
                alignItems={"center"}
                gap={1}
                display={"flex"}
            >
                {item?.name && (
                    <Box maxWidth={"100px"}>
                        <Typography
                            whiteSpace={"nowrap"}
                            overflow={"hidden"}
                            fontWeight={600}
                            variant="body1"
                            color="initial"
                        >
                            {item.name}
                        </Typography>
                    </Box>
                )}
                <Box width={"100%"} gap={1} display={"flex"}>
                    <Box flex={1}>
                        <CopyToClipboard
                            text={config.CLIENT_API + "/" + item.token}
                        />
                    </Box>
                    <Box display={"flex"}>
                        <StyledLoadingButton
                            sx={{ height: "100%" }}
                            loading={isDeleteLoading}
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            <DeleteForeverIcon />
                        </StyledLoadingButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
