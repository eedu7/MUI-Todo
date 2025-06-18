import * as React from "react";
import { Container, Divider, Stack } from "@mui/material";

import { TodoListToolbar } from "./components/TodoListToolbar.tsx";
import { TodoListActionsBar } from "./components/TodoListActionsBar.tsx";
import { TodoBoard } from "./components/TodoBoard.tsx";
import { FilterContext } from "./states/filterContext.ts";
import type { Filter } from "./types.ts";

export default function App(): React.ReactElement {
    const [filter, setFilter] = React.useState<Filter>("all");

    const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
        if (newFilter) {
            setFilter(newFilter as Filter);
        } else {
            setFilter("all");
        }
    };

    return (
        <FilterContext.Provider value={{ filter, handleFilterChange }}>
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
                    spacing={{ xs: 2, md: 4 }}
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
        </FilterContext.Provider>
    );
}
