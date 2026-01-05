import { Board } from "@/types";
import { generateUUID } from "@/utils";

export const boardMockData: Board = {
  title: "Project Board",
  lists: [
    {
      id: "backlog",
      title: "Backlog",
      tasks: [
        {
          id: generateUUID(),
          title: "Set up project repository and CI",
          comments: [
            {
              id: generateUUID(),
              author: "Alice",
              date: new Date().toISOString(),
              message: "Initial repo created. CI config pending.",
            },
          ],
          listId: "backlog",
        },
        {
          id: generateUUID(),
          title: "Define database schema for tasks and users",
          comments: [],
          listId: "backlog",
        },
      ],
    },
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: generateUUID(),
          title: "Design landing page mockups",
          comments: [
            {
              id: generateUUID(),
              author: "Bob",
              date: new Date().toISOString(),
              message: "Will provide wireframes by EOD.",
            },
          ],
          listId: "todo",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: generateUUID(),
          title: "Implement drag-and-drop with dnd-kit",
          comments: [
            {
              id: generateUUID(),
              author: "Charlie",
              date: new Date().toISOString(),
              message: "Working on cross-list moves; testing edge cases.",
            },
          ],
          listId: "in-progress",
        },
      ],
    },
    {
      id: "review",
      title: "Code Review",
      tasks: [
        {
          id: generateUUID(),
          title: "Review auth middleware PR",
          comments: [],
          listId: "review",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: generateUUID(),
          title: "Project setup and deps installed",
          comments: [
            {
              id: generateUUID(),
              author: "You",
              date: new Date().toISOString(),
              message: "Base project scaffolded.",
            },
          ],
          listId: "done",
        },
      ],
    },
  ],
};
