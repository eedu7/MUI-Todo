import { Stack } from "@mui/material";
import { FilterButton } from "./FilterButton.tsx";

export const TodoBoard = () => {
    return (
        <Stack spacing={2}>
            <FilterButton />
        </Stack>
    );
};
