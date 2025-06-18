import * as React from "react";
import { createContext } from "react";
import type { Task, TaskState } from "../types.ts";

export type TaskActions =
    | {
          type: "ADD_TASK";
          task: Task;
      }
    | {
          type: "UPDATE_TASK";
          id: string;
          task: Partial<Task>;
      }
    | {
          type: "DELETE_TASK";
          id: string;
      }
    | {
          type: "SET_TASKS";
          tasks: Task[];
      };

export const TaskContext = createContext<{
    tasks: TaskState;
    dispatch: React.Dispatch<TaskActions>;
} | null>(null);
