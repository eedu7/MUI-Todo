import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import LoopIcon from "@mui/icons-material/Loop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TaskStatus } from "../types.ts";
import { TodoEditModal } from "./TodoEditModal.tsx";
import { useTaskManager } from "../hooks/useTaskManager.ts";

interface TodoCardProps {
    id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
    created_at: string;
}

export const TodoCard = ({ id, title, description, status }: TodoCardProps) => {
    const statusColors = {
        pending: {
            bg: "#FFF3CD",
            text: "#664d03",
        },
        "in-progress": {
            bg: "#D1ECF1",
            text: "#0c5460",
        },
        completed: {
            bg: "#D4EDDA",
            text: "#155724",
        },
    };

    const { dispatch } = useTaskManager();
    const handleDelete = () =>
        dispatch({
            type: "DELETE_TASK",
            id: id,
        });

    return (
        <Card
            elevation={2}
            sx={{
                width: "100%",
                backgroundColor: statusColors[status].bg,
                color: statusColors[status].text,
                borderRadius: 2,
                border: "1px solid rgba(0, 0, 0, 0.05)",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            }}
        >
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack spacing={1} direction="row" alignItems="center">
                            <StatusIcon status={status} />
                            <Typography fontWeight="700" variant="h6" fontSize={16}>
                                {title}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: 100 }}>
                            <TodoEditModal id={title} title={title} description={description} status={status} />
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Typography variant="body2">{description}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

const StatusIcon = ({ status }: { status: TaskStatus }) => {
    switch (status) {
        case "completed":
            return <CheckCircleIcon color="success" />;
        case "pending":
            return <PendingIcon color="warning" />;

        case "in-progress":
            return <LoopIcon color="info" />;
        default:
            return;
    }
};
