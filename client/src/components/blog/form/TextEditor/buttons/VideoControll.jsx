import { Button, Card, CardHeader } from "@mui/material";
import { grey } from "@mui/material/colors";
import VideoService from "../../../../../services/VideoService";
import { StyledLoadingButton } from "../../../../form/StyledLoadingButton";
import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { VideosIdContext } from "../../BlogForm";

const video = new VideoService();

export const VideoControll = ({ e, refetch, editor, handleClose }) => {
    const [loadingDelete, setLoadingDelete] = useState(false);

    const { setVideos_id } = useContext(VideosIdContext);

    const handleAdd = () => {
        setVideos_id((prevArr) => [...prevArr, e.id]);
        editor
            .chain()
            .focus()
            .setVideo({
                src: e.path,
                "data-id": e.id,
                poster: e?.img?.path,
            })
            .run();
        handleClose();
    };

    const handleDelete = async () => {
        try {
            if (!confirm("Удалить видео?")) return;
            setLoadingDelete(true);
            await video.delete(e.id);
            await refetch();
            enqueueSnackbar("Видео удалено", {
                variant: "success",
            });
        } catch (e) {
            if (e?.response?.status === 403)
                return enqueueSnackbar("Видео используется в другом блоге", {
                    variant: "error",
                });
            enqueueSnackbar("Упс! что-то пошло не так", { variant: "error" });
        } finally {
            setLoadingDelete(false);
        }
    };
    return (
        <Card>
            <CardHeader
                sx={{
                    bgcolor: grey[900],
                    pl: "6px !important",
                    pr: "6px !important",
                    pt: "3px !important",
                    pb: "3px !important",
                    "& .MuiCardHeader-action": {
                        marginTop: "0px !important",
                        marginRight: "0px !important",
                        marginLeft: "0px !important",
                        marginBottom: "0px !important",
                    },
                }}
                avatar={
                    <StyledLoadingButton
                        loading={loadingDelete}
                        size="small"
                        color="error"
                        onClick={handleDelete}
                    >
                        Удалить
                    </StyledLoadingButton>
                }
                action={
                    <Button onClick={handleAdd} size="small">
                        Вставить
                    </Button>
                }
            />
            <video
                style={{
                    aspectRatio: 5 / 3,
                    background: "#000",
                }}
                src={e.path}
                data-id={e.id}
                poster={e?.img?.path}
                controls
                preload="none"
                width={"100%"}
                // className="rounded-md max-w-full"
            />
        </Card>
    );
};
