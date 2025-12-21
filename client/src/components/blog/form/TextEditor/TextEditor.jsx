"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import "./textEditor.scss";

import StarterKit from "@tiptap/starter-kit";
import IconButton from "@mui/material/IconButton";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import Underline from "@tiptap/extension-underline";
import { Box, FormHelperText, useTheme } from "@mui/material";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import Image from "@tiptap/extension-image";
import { red } from "@mui/material/colors";
import { useCallback } from "react";
import CustomImage from "./CustomImg";
import { Video } from "./extensions/Video";
import VideoButton from "./buttons/VideoButton";
import FontsButton from "./buttons/FontsButton";
import Link from "@tiptap/extension-link";
import SizeButton from "./buttons/SizeButton";
import LinkIcon from "@mui/icons-material/Link";
import { CustomLink } from "./extensions/CustomLink";

const Tiptap = ({ error, value, onChange, setBody }) => {
    const theme = useTheme();

    const editor = useEditor({
        extensions: [
            StarterKit,
            FontFamily,
            Video,
            TextStyle,
            Underline,
            CustomLink.configure({
                openOnClick: false, // чтобы не открывалось сразу при клике
                autolink: true, // автоматом превращает http://... в ссылки
                protocols: ["http", "https", "mailto"],
            }),
            // Image.configure({
            //    HTMLAttributes: {
            //       class: "my-custom-paragraph",
            //    },
            // }),
            CustomImage,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        editorProps: {
            handleKeyDown(view, event) {
                if (event.key === "Backspace" || event.key === "Delete") {
                    const { selection } = view.state;
                    const node = selection.node;

                    if (node?.type?.name === "video") {
                        // if (!confirm("Удалить видео?")) {
                        //     return true; // блокируем
                        // }
                        return true; // блокируем
                    }
                }
                return false; // стандартное поведение
            },
            handleTextInput(view, from, to, text) {
                const { selection } = view.state;
                const node = selection.node;

                if (node?.type?.name === "video") {
                    // блокируем замену текста
                    return true;
                }

                return false;
            },
        },
        content: value,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getText());
            setBody(editor.getHTML());
        },
    });

    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    return (
        <>
            <Box
                sx={{
                    border: "1px solid ",
                    borderColor: !!error
                        ? red[900]
                        : theme.palette.grey[700],
                    borderRadius: 4,
                }}
            >
                <Box
                    pt={"3px"}
                    // pl={1}
                    // pr={1}
                    display={"flex"}
                    alignItems={"center"}
                    flexWrap={"wrap"}
                >
                    <IconButton
                        // color={editor?.isActive("bold") ? "primary" : "secondary"}
                        onClick={addImage}
                    >
                        img
                    </IconButton>
                    <VideoButton editor={editor} />
                    <IconButton
                        color={
                            editor?.isActive("bold") ? "primary" : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <FormatBoldIcon />
                    </IconButton>
                    <IconButton
                        color={
                            editor?.isActive("italic") ? "primary" : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <FormatItalicIcon />
                    </IconButton>
                    <IconButton
                        color={
                            editor?.isActive("strike") ? "primary" : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <FormatStrikethroughIcon />
                    </IconButton>
                    <IconButton
                        color={
                            editor?.isActive("underline")
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                    >
                        <FormatUnderlinedIcon />
                    </IconButton>
                    <IconButton
                        color={'default'}
                        onClick={() =>
                            editor.chain().focus().unsetAllMarks().run()
                        }
                    >
                        <FormatClearIcon />
                    </IconButton>
                    <IconButton
                        color={"default"}
                        // color={editor?.isActive("bold") ? "primary" : "secondary"}
                        onClick={() => {
                            const previousUrl =
                                editor.getAttributes("link").href;
                            const url = window.prompt(
                                "Введите ссылку",
                                previousUrl || "https://"
                            );

                            if (url === null) return; // отменили окно

                            if (url === "") {
                                // убираем ссылку
                                editor
                                    .chain()
                                    .focus()
                                    .extendMarkRange("link")
                                    .unsetLink()
                                    .run();
                                return;
                            }

                            if (editor.state.selection.empty) {
                                // если текста нет — вставляем саму ссылку как текст
                                editor
                                    .chain()
                                    .focus()
                                    .insertContent(
                                        `<a href="${url}">${url}</a>`
                                    )
                                    .run();
                            } else {
                                // если есть выделение — делаем его ссылкой
                                editor
                                    .chain()
                                    .focus()
                                    .extendMarkRange("link")
                                    .setLink({ href: url })
                                    .run();
                            }
                        }}
                    >
                        <LinkIcon />
                    </IconButton>
                    <SizeButton editor={editor} />
                    <IconButton
                        color={
                            editor?.isActive("bulletList")
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <FormatListBulletedIcon />
                    </IconButton>
                    <IconButton
                        color={
                            editor?.isActive("orderedList")
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        <FormatListNumberedIcon />
                    </IconButton>
                    <FontsButton editor={editor} />
                    <Box display={"inline-block"}>
                        <IconButton
                            color={
                                editor?.isActive({ textAlign: "left" })
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("left")
                                    .run()
                            }
                        >
                            <FormatAlignLeftIcon />
                        </IconButton>
                        <IconButton
                            color={
                                editor?.isActive({ textAlign: "center" })
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("center")
                                    .run()
                            }
                        >
                            <FormatAlignCenterIcon />
                        </IconButton>
                        <IconButton
                            color={
                                editor?.isActive({ textAlign: "right" })
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("right")
                                    .run()
                            }
                        >
                            <FormatAlignRightIcon />
                        </IconButton>
                    </Box>
                </Box>
                <EditorContent
                    style={{
                        padding: "0 20px 20px 20px",
                        minWidth: "100%",
                        width: "100%",
                    }}
                    // onChange={(editor) => console.log(editor)}
                    editor={editor}
                />
            </Box>
            {error && (
                <FormHelperText sx={{ ml: "14px", mr: "14px" }} error={!!error}>
                    {error && (error?.message || "incorrect data")}
                </FormHelperText>
            )}
        </>
    );
};

export default Tiptap;
