import { Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TodoCreateModal } from "./TodoCreateModal.tsx";

export const TodoListActionsBar = () => {
    return (
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            <TextField
                label="Search todos"
                variant="standard"
                slotProps={{
                    input: {
                        startAdornment: (
                            <SearchIcon
                                sx={{
                                    fontSize: { xs: 14, sm: 18, md: 22 },
                                }}
                            />
                        ),
                    },
                }}
            />
            <TodoCreateModal />
        </Stack>
    );
};
