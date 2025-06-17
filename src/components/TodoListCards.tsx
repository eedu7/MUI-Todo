import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { tasks } from "../data.ts";

export const TodoListCards = () => {
    return (
        <Grid container gap={4}>
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
        <Grid>
            <Card>
                <CardHeader>{title}</CardHeader>
                <CardContent>{description}</CardContent>
            </Card>
        </Grid>
    );
};
