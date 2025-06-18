import * as React from "react";
import { useState } from "react";
import { Box, Button, Card, CardContent, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { TaskStatus } from "../types.ts";
import { useTaskManager } from "../hooks/useTaskManager.ts";

export const TodoCreateModal = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
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
                onClick={handleOpen}
            >
                <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}>
                    Add todo
                </Typography>
            </Button>
            <TodoModal open={open} handleClose={handleClose} />
        </Box>
    );
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: 300,
        sm: 400,
        md: 500,
        lg: 600,
        xl: 700,
    },
    backgroundColor: "background.paper",
    boxShadow: 24,
    p: 2,
};

interface TodoModalProps {
    open: boolean;
    handleClose: () => void;
}

const TodoModal = ({ open, handleClose }: TodoModalProps) => {
    const [todoStatus, setTodoStatus] = useState<TaskStatus>("pending");
    const [titleValue, setTitleValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const { dispatch } = useTaskManager();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoStatus(event.target.value as TaskStatus);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const task = {
            id: new Date().toISOString(),
            title: titleValue,
            description: descriptionValue,
            status: todoStatus,
            created_at: new Date().toISOString(),
        };

        alert(JSON.stringify(task));
        dispatch({
            type: "ADD_TASK",
            task: task,
        });
        handleClose();
        e.currentTarget.reset();
        setTitleValue("");
        setDescriptionValue("");
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Card sx={style}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit} autoComplete="off">
                        <Stack spacing={3}>
                            <Typography variant="h6" component="h2" fontWeight="bold">
                                Add new Task
                            </Typography>
                            <TextField
                                value={titleValue}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value)}
                                label="Title"
                                variant="standard"
                                required
                                id="title"
                            />
                            <TextField
                                value={descriptionValue}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setDescriptionValue(e.target.value)
                                }
                                label="Description"
                                variant="standard"
                                id="description"
                            />
                            <Stack>
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    label="Select task status"
                                    select
                                    value={todoStatus}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="in-progress">In-Progress</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </TextField>
                            </Stack>
                            <Button type="submit" variant="contained" color="primary">
                                Add
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Modal>
    );
};
