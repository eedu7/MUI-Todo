import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FilterContext } from "../context/FilterContext.ts";
import { useContext } from "react";
import { useTaskManager } from "../hooks/useTaskManager.ts";

export const TodoListCards = () => {
    const { filter } = useContext(FilterContext);

    const { tasks } = useTaskManager();
    const allTasks = Object.values(tasks).flat();
    const filteredTasks = filter === "all" ? allTasks : (tasks[filter as keyof typeof tasks] ?? []);

    if (filteredTasks.length === 0) {
        return (
            <Box
                sx={{ width: "100%", height: 96, border: "1px dashed grey" }}
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Typography color="grey">No tasks found.</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {filteredTasks.map((task) => (
                <TodoCard key={task.id} {...task} />
            ))}
        </Grid>
    );
};

interface TodoCardProps {
    id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
    created_at: string;
}

const TodoCard = ({ title, description, status }: TodoCardProps) => {
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
    return (
        <Grid
            size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
            }}
        >
            <Card
                elevation={2}
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: statusColors[status].bg,
                    color: statusColors[status].text,
                    borderRadius: 2,
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                }}
            >
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2">{description}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
