import * as React from "react";
import { createContext } from "react";
import type { Task } from "../types.ts";

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
    tasks: Task[];
    dispatch: React.Dispatch<TaskActions>;
} | null>(null);
