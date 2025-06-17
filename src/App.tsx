import * as React from "react";
import { Container, Divider, Stack } from "@mui/material";

import { TodoListToolbar } from "./components/TodoListToolbar.tsx";
import { TodoListActionsBar } from "./components/TodoListActionsBar.tsx";
import { TodoBoard } from "./components/TodoBoard.tsx";

export default function App(): React.ReactElement {
    return (
        <Container
            sx={{
                py: {
                    xs: 2,
                    md: 4,
                    lg: 8,
                },
            }}
        >
            <TodoListToolbar />
            <Stack
                spacing={{ xs: 2, md: 4, lg: 8 }}
                marginTop={4}
                padding={2}
                sx={{
                    backgroundColor: "#FFFFFF",
                }}
                borderRadius={{
                    xs: 0,
                    md: 1,
                    lg: 2,
                }}
                divider={<Divider />}
            >
                <TodoListActionsBar />
                <TodoBoard />
            </Stack>
        </Container>
    );
}
