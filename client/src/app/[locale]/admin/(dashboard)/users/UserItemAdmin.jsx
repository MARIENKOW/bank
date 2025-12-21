import { Paper, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { IconButton, ListItemIcon } from "@mui/material";
import { MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";
import Link from "next/link";
import { ADMIN_USERS_ROUTE } from "../../../../../configs/routerLinks";

export default function UserItemAdmin({ user }) {
    const anchorEl = useRef();
    const [open, setOpen] = useState(false);

    const handleOpenNavMenu = (event) => {
        setOpen(true);
        event.stopPropagation();
        event.preventDefault();
    };

    const handleCloseNavMenu = (event) => {
        setOpen(false);
        // event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Link href={ADMIN_USERS_ROUTE + "/" + user.id}>
            <Paper
                sx={{
                    width: "100%",
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                <Typography variant="body1" fontWeight={600} color="secondary">
                    {user.username}
                </Typography>
                <IconButton
                    size="large"
                    id={`menu-appbar-${user?.id}`}
                    aria-label="account of current user"
                    aria-controls={`menu-appbarr-${user?.id}`}
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="secondary"
                    ref={anchorEl}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        "aria-labelledby": `menu-appbarr-${user?.id}`,
                    }}
                    open={open}
                    onClose={handleCloseNavMenu}
                    anchorEl={anchorEl.current}
                    sx={{
                        "& .MuiPaper-root": { bgcolor: "#fff" },
                        paddingBottom: 0,
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    // keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <Link href={ADMIN_USERS_ROUTE + "/" + user.id}>
                        <MenuItem
                            onClick={(event) => {
                                handleCloseNavMenu(event);
                                // deleteProductLine(item);
                            }}
                        >
                            <Typography
                                width={"100%"}
                                textAlign="right"
                                textTransform="capitalize"
                            >
                                Открыть
                            </Typography>
                        </MenuItem>
                    </Link>

                    {/* <MenuItem
                        sx={{ color: red[900], bgcolor: red[50] }}
                        onClick={(event) => {
                            handleCloseNavMenu(event);
                            event.preventDefault();
                        }}
                    >
                        <ListItemIcon sx={{ color: red[900] }}>
                            <DeleteForeverIcon />
                        </ListItemIcon>
                        <Typography
                            textTransform="capitalize"
                            textAlign="center"
                        >
                            Удалить
                        </Typography>
                    </MenuItem> */}
                </Menu>
            </Paper>
        </Link>
    );
}
