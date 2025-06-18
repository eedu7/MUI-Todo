import { Stack } from "@mui/material";
import { FilterButton } from "./FilterButton.tsx";
import { AllTodosBoard } from "./AllTodosBoard.tsx";

export const TodoBoard = () => {
    return (
        <Stack
            spacing={{
                xs: 2,
                md: 4,
            }}
        >
            <FilterButton />
            <AllTodosBoard />
        </Stack>
    );
};
