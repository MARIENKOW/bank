"use client";

import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import DrawIcon from "@mui/icons-material/Draw";

export default function DocumentSignButton({ credit }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const t = useTranslations();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sigRef = useRef();

    const handleClear = () => {
        sigRef.current?.clear();
        setError(false); // тоже очищаем
    };

    const handleSave = () => {
        if (!sigRef.current || sigRef.current.isEmpty()) return setError(true);
        const dataUrl = sigRef.current.toDataURL("image/png");
        // отправляешь dataUrl на бэк как строку
        console.log(dataUrl);
    };

    return (
        <>
            <StyledLoadingButton
                variant="contained"
                fullWidth
                size="small"
                sx={{ p: 1, minWidth: "10px" }}
                color="dif"
                onClick={handleClickOpen}
            >
                <DrawIcon color="secondary" />
            </StyledLoadingButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <SignatureCanvas
                        onBegin={() => setError(false)} // Очистка ошибки при старте
                        onEnd={() => {
                            setError(false); // Очистка при завершении
                        }}
                        ref={sigRef}
                        penColor="black"
                        canvasProps={{
                            width: 200,
                            height: 200,
                            style: {
                                border: "1px solid #ccc",
                                borderRadius: 4,
                            },
                        }}
                    />
                    <FormHelperText error={error}>
                        {error && t("form.required")}
                    </FormHelperText>
                </DialogContent>

                <DialogActions>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                    >
                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={handleClear}
                        >
                            {t("buttons.clear")}
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            {t("buttons.close")}
                        </Button>
                        <StyledLoadingButton
                            size="small"
                            variant="contained"
                            color="dif"
                            onClick={handleSave}
                        >
                            {t("form.submit")}
                        </StyledLoadingButton>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}
