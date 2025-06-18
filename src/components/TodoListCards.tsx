import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FilterContext } from "../context/FilterContext.ts";
import { useContext } from "react";
import { useTaskManager } from "../hooks/useTaskManager.ts";

export const TodoListCards = () => {
    const { filter } = useContext(FilterContext);

    const { tasks } = useTaskManager();
    const filteredTasks = filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

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

const TodoCard = ({ title, description }: TodoCardProps) => {
    return (
        <Grid
            size={{
                xs: 12,
                sm: 6,
                md: 3,
            }}
        >
            <Card
                elevation={2}
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <CardContent>
                    <Typography>{title}</Typography>
                    <Typography>{description}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
