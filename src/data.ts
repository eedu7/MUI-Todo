import type { Task } from "./types.ts";

export const tasks: Task[] = [
    // ---------------- PENDING ----------------
    {
        id: "1",
        title: "Buy groceries",
        description: "Milk, eggs, bread, and fruits",
        status: "pending",
        created_at: "2025-06-10T09:00:00Z",
    },
    {
        id: "2",
        title: "Finish React project",
        description: "Complete the dashboard layout using MUI",
        status: "pending",
        created_at: "2025-06-11T14:15:00Z",
    },
    {
        id: "3",
        title: "Call the dentist",
        status: "pending",
        created_at: "2025-06-12T08:00:00Z",
    },
    {
        id: "4",
        title: "Write blog post on Tailwind CSS",
        description: "Discuss benefits and real-world use cases",
        status: "pending",
        created_at: "2025-06-13T10:30:00Z",
    },
    {
        id: "5",
        title: "Backup local files",
        status: "pending",
        created_at: "2025-06-14T17:00:00Z",
    },
    {
        id: "6",
        title: "Morning workout",
        status: "pending",
        created_at: "2025-06-14T07:00:00Z",
    },
    {
        id: "7",
        title: "Send birthday gift",
        description: "Buy a book and card for Ahmed",
        status: "pending",
        created_at: "2025-06-13T09:30:00Z",
    },
    {
        id: "8",
        title: "Create Figma wireframes",
        status: "pending",
        created_at: "2025-06-14T12:00:00Z",
    },
    {
        id: "9",
        title: "Update GitHub profile",
        description: "Add new project repositories",
        status: "pending",
        created_at: "2025-06-13T15:45:00Z",
    },
    {
        id: "10",
        title: "Order replacement charger",
        status: "pending",
        created_at: "2025-06-14T10:20:00Z",
    },

    // ---------------- IN-PROGRESS ----------------
    {
        id: "11",
        title: "Review code PRs",
        description: "Team submitted 4 pull requests for review",
        status: "in-progress",
        created_at: "2025-06-12T11:45:00Z",
    },
    {
        id: "12",
        title: "Learn Go language",
        description: "Finish first 3 chapters of the book",
        status: "in-progress",
        created_at: "2025-06-10T13:00:00Z",
    },
    {
        id: "13",
        title: "Design portfolio homepage",
        status: "in-progress",
        created_at: "2025-06-09T18:30:00Z",
    },
    {
        id: "14",
        title: "Fix UI bugs in mobile view",
        status: "in-progress",
        created_at: "2025-06-13T15:00:00Z",
    },
    {
        id: "15",
        title: "Update resume",
        description: "Add recent work and update layout",
        status: "in-progress",
        created_at: "2025-06-12T12:30:00Z",
    },
    {
        id: "16",
        title: "Create unit tests for API",
        status: "in-progress",
        created_at: "2025-06-14T10:10:00Z",
    },
    {
        id: "17",
        title: "Implement dark mode toggle",
        status: "in-progress",
        created_at: "2025-06-13T17:15:00Z",
    },
    {
        id: "18",
        title: "Research TypeScript decorators",
        status: "in-progress",
        created_at: "2025-06-12T13:50:00Z",
    },
    {
        id: "19",
        title: "Create onboarding flow UI",
        description: "Mobile-first experience",
        status: "in-progress",
        created_at: "2025-06-14T08:30:00Z",
    },
    {
        id: "20",
        title: "Write documentation for backend",
        status: "in-progress",
        created_at: "2025-06-11T09:25:00Z",
    },

    // ---------------- COMPLETED ----------------
    {
        id: "21",
        title: "Submit tax return",
        description: "Deadline approaching on 15th June",
        status: "completed",
        created_at: "2025-06-05T08:30:00Z",
    },
    {
        id: "22",
        title: "Refactor auth API",
        status: "completed",
        created_at: "2025-06-06T14:45:00Z",
    },
    {
        id: "23",
        title: "Renew domain name",
        description: "Auto-renew enabled but verify",
        status: "completed",
        created_at: "2025-06-04T10:10:00Z",
    },
    {
        id: "24",
        title: "Clean room",
        status: "completed",
        created_at: "2025-06-07T11:00:00Z",
    },
    {
        id: "25",
        title: "Attend webinar on AI in healthcare",
        status: "completed",
        created_at: "2025-06-01T16:00:00Z",
    },
    {
        id: "26",
        title: "Fix footer alignment issue",
        status: "completed",
        created_at: "2025-06-09T12:00:00Z",
    },
    {
        id: "27",
        title: "Set up Postgres DB locally",
        status: "completed",
        created_at: "2025-06-08T15:00:00Z",
    },
    {
        id: "28",
        title: "Push final code to GitHub",
        status: "completed",
        created_at: "2025-06-13T17:45:00Z",
    },
    {
        id: "29",
        title: "Fix typo in README",
        status: "completed",
        created_at: "2025-06-14T08:00:00Z",
    },
    {
        id: "30",
        title: "Confirm appointment with client",
        status: "completed",
        created_at: "2025-06-12T10:00:00Z",
    },
];

export const completedTasks: Task[] = tasks.filter((task) => task.status === "completed");
export const pendingTasks: Task[] = tasks.filter((task) => task.status === "pending");
export const inProgressTasks: Task[] = tasks.filter((task) => task.status === "in-progress");
