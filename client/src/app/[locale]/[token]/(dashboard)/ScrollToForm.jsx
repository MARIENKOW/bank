"use client";
import { Button } from "@mui/material";
import ScrollIntoView from "react-scroll-into-view";
import { ContainerComponent } from "../../components/wrappers/ContainerComponent";

export const ScrollToForm = () => {
    return (
        <ContainerComponent>
            <ScrollIntoView selector="#sendForm">
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                >
                    подать жалобу
                </Button>
            </ScrollIntoView>
        </ContainerComponent>
    );
};
