import { Button, Stack, TextField, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

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
            <Button
                startIcon={
                    <AddIcon
                        fontSize={"small"}
                        sx={{
                            fontSize: { xs: 14, sm: 18, md: 22 },
                        }}
                    />
                }
                aria-label="Add todo"
                variant="contained"
                size="small"
                disableElevation
            >
                <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}>
                    Add todo
                </Typography>
            </Button>
        </Stack>
    );
};
