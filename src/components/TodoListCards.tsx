import { Card, CardContent, Grid, Typography } from "@mui/material";
import { tasks } from "../data.ts";

export const TodoListCards = () => {
    return (
        <Grid container spacing={2}>
            {tasks.map((task) => (
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
