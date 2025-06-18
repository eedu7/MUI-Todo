import * as React from "react";

export type TaskStatus = "pending" | "in-progress" | "completed";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    created_at: string;
};

export type Filter = "all" | TaskStatus;

export type FilterContextType = {
    filter: Filter;
    handleFilterChange: (_: React.MouseEvent<HTMLElement>, newFilter: string | null) => void;
};
