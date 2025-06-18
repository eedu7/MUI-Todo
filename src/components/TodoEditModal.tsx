import * as React from "react";
import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    MenuItem,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type { Task, TaskStatus } from "../types.ts";
import { useTaskManager } from "../hooks/useTaskManager.ts";
import EditIcon from "@mui/icons-material/Edit";

interface EditProps {
    id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
}

export const TodoEditModal = (props: EditProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <IconButton aria-label="Edit todo" size="small" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <TodoModal open={open} handleClose={handleClose} {...props} />
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

interface TodoModalProps extends EditProps {
    open: boolean;
    handleClose: () => void;
}

const TodoModal = ({ open, handleClose, id, status, title, description }: TodoModalProps) => {
    const [todoStatus, setTodoStatus] = useState<TaskStatus>(status);
    const [titleValue, setTitleValue] = useState<string>(title);
    const [descriptionValue, setDescriptionValue] = useState<string | undefined>(description);
    const { dispatch } = useTaskManager();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoStatus(event.target.value as TaskStatus);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const task: Partial<Task> = {
            title: titleValue,
            description: descriptionValue,
            status: todoStatus,
        };

        alert(JSON.stringify(task));

        dispatch({
            type: "UPDATE_TASK",
            id: id,
            task,
        });
        handleClose();
        e.currentTarget.reset();
        setTitleValue("");
        setDescriptionValue("");
    };
    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Card sx={style}>
                <CardContent>
                    <Box component="form" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                        <Stack spacing={3}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Typography variant="h6" component="h2" fontWeight="bold">
                                    Edit task
                                </Typography>
                            </Stack>
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
