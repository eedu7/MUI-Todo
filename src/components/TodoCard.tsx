import { ButtonGroup, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { blue, green, orange } from "@mui/material/colors";

interface TodoCardProps {
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "completed";
}

export const TodoCard = ({ title, description, status }: TodoCardProps) => {
    const statusColors: Record<typeof status, string> = {
        "in-progress": blue[50],
        pending: orange[50],
        completed: green[50],
    };
    return (
        <Card
            sx={{
                backgroundColor: statusColors[status],
                borderRadius: 4,
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    component="h4"
                    fontWeight={600}
                >
                    {title}
                </Typography>
                <Typography variant="subtitle2">{description ?? "No description"}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <ButtonGroup>
                    <IconButton
                        aria-label="edit"
                        disabled
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
};
