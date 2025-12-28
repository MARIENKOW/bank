"use client";

import {
    Box,
    Button,
    FormHelperText,
} from "@mui/material";
import { StyledLoadingButton } from "../../../../../../../components/form/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { CanceledError } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { StyledTextField } from "../../../../../../../components/form/StyledTextField";
import UserDocumentService from "../../../../../../../services/UserDocumentService";
import DragAndDrop from "../../../../../../../components/form/DragAndDrop";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const userDocument = new UserDocumentService();

export default function DocumentAdd({}) {
    const { id } = useParams();
    const input = useRef();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        handleSubmit,
        register,
        control,
        reset,
        setError,
        clearErrors,
        resetField,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            await userDocument.create({
                ...data,
                id,
            });
            queryClient.invalidateQueries({
                queryKey: ["documents", id],
            });
            enqueueSnackbar(`документ создано!`, { variant: "success" });
            handleClose();
            reset();
        } catch (e) {
            if (e instanceof CanceledError) return;
            console.error(e);
            if (e?.response?.status === 400) {
                const errors = e?.response?.data || {};
                for (let key in errors) {
                    setError(key, { type: "server", message: errors[key] });
                }
                return;
            }
            enqueueSnackbar(
                "Упс! что-то пошло не так. Перезагрузите страницу",
                {
                    variant: "error",
                }
            );
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{ display: "inline-block" }}
                variant="contained"
            >
                Добавить
            </Button>
            <Dialog sx={{'& .MuiPaper-root':{
                maxWidth:400
            }}} maxWidth={300} open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent >
                        <Box
                            flexDirection={"row"}
                            flexWrap={"wrap"}
                            gap={1}
                            display={"flex"}
                        >
                            <DragAndDrop
                                clearErrors={clearErrors}
                                setError={setError}
                                control={control}
                                name={"img"}
                                rules={{}}
                                sx={{ borderRadius: "10px", width: "100%" }}
                                resetField={resetField}
                                setValue={setValue}
                            />
                            <StyledTextField
                                errors={errors}
                                label={"Название"}
                                register={register("name", {})}
                            />
                            <Controller
                                control={control}
                                name={"document"}
                                rules={{ required: "required field" }}
                                render={({
                                    field: { onChange },
                                    fieldState: { error },
                                }) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "100%",
                                        }}
                                    >
                                        <input
                                            ref={input}
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf"
                                            style={{ display: "none" }}
                                            id={`raised-button-file`}
                                            multiple
                                            type="file"
                                            onChange={(event) => {
                                                const files =
                                                    event.target.files;
                                                if (files && files[0]) {
                                                    // handleFileChange(files[0]);

                                                    onChange(files[0]);
                                                }
                                            }}
                                        />

                                        <Button
                                            endIcon={<FileUploadIcon />}
                                            variant="contained"
                                            color={
                                                errors?.document
                                                    ? "error"
                                                    : "secondary"
                                            }
                                            fullWidth
                                            onClick={() => {
                                                console.log(
                                                    input.current.click()
                                                );
                                            }}
                                        >
                                            Документ
                                        </Button>
                                        <FormHelperText
                                            sx={{ ml: "14px", mr: "14px" }}
                                            error={!!error}
                                        >
                                            {errors?.document?.message}
                                        </FormHelperText>
                                    </Box>
                                )}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                        <StyledLoadingButton
                            type="submit"
                            sx={{ height: "100%" }}
                            loading={isSubmitting}
                            endIcon={<DoubleArrowIcon />}
                            variant="contained"
                            color="secondary"
                        >
                            Создать
                        </StyledLoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
