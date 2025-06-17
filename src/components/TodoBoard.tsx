import { Stack } from "@mui/material";
import { FilterButton } from "./FilterButton.tsx";
import { TodoListCards } from "./TodoListCards.tsx";

export const TodoBoard = () => {
    return (
        <Stack
            spacing={{
                xs: 2,
                md: 4,
            }}
        >
            <FilterButton />
            <TodoListCards />
        </Stack>
    );
};
