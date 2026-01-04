import { create } from "zustand";
import { Board, Comment, List } from "../types";
import { generateUUID } from "../utils";

interface BoardState {
  board: Board | null;
  editBoardTitle: (title: string) => void;
  addList: (title: string) => void;
  editListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
  addTask: (listId: string, title: string) => void;
  deleteAllTasks: (listId: string) => void;
  addComment: (listId: string, taskId: string, message: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    title: "Demo Board",
    lists: [
      {
        id: generateUUID(),
        title: "Demo List1",
        tasks: [
          { id: generateUUID(), title: "Demo Task1", comments: [] },
          {
            id: generateUUID(),
            title: "Demo Task2",
            comments: [
              {
                id: generateUUID(),
                author: "You",
                date: new Date().toISOString(),
                message: "Demo comment",
              },
              {
                id: generateUUID(),
                author: "You",
                date: new Date().toISOString(),
                message: "Demo comment2",
              },
            ],
          },
        ],
      },
      { id: generateUUID(), title: "Demo List2", tasks: [] },
      { id: generateUUID(), title: "Demo List3", tasks: [] },
    ],
  },
  editBoardTitle: (title) =>
    set((state) => {
      if (!state.board) return state;
      return {
        board: { ...state.board, title },
      };
    }),
  addList: (title) =>
    set((state) => {
      if (!state.board) return state;

      const newList: List = {
        id: generateUUID(),
        title,
        tasks: [],
      };

      return {
        board: {
          ...state.board,
          lists: [...state.board.lists, newList],
        },
      };
    }),
  editListTitle: (listId, title) =>
    set((state) => {
      if (!state.board) return state;

      return {
        board: {
          ...state.board,
          lists: state.board.lists.map((list) =>
            list.id === listId ? { ...list, title } : list
          ),
        },
      };
    }),
  addTask: (listId, title) =>
    set((state) => {
      if (!state.board) return state;

      return {
        board: {
          ...state.board,
          lists: state.board.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: [
                    ...list.tasks,
                    {
                      id: generateUUID(),
                      title,
                      comments: [],
                    },
                  ],
                }
              : list
          ),
        },
      };
    }),
  addComment: (listId, taskId, message) =>
    set((state) => {
      if (!state.board) return state;

      const newComment: Comment = {
        id: generateUUID(),
        author: "You",
        message,
        date: new Date().toISOString(),
      };
      return {
        board: {
          ...state.board,
          lists: state.board.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          comments: [...task.comments, newComment],
                        }
                      : task
                  ),
                }
              : list
          ),
        },
      };
    }),
  deleteList: (listId) =>
    set((state) => {
      if (!state.board) return state;
      return {
        board: {
          ...state.board,
          lists: state.board.lists.filter((list) => list.id !== listId),
        },
      };
    }),
  deleteAllTasks: (listId) =>
    set((state) => {
      if (!state.board) return state;
      return {
        board: {
          ...state.board,
          lists: state.board.lists.map((list) =>
            list.id === listId ? { ...list, tasks: [] } : list
          ),
        },
      };
    }),
}));
