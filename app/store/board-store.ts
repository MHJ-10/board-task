import { boardMockData } from "@/constants";
import { Board, Comment, List, Task } from "@/types";
import { generateUUID } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface BoardState {
  board: Board | null;
  editBoardTitle: (title: string) => void;
  addList: (title: string) => void;
  editListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
  addTask: (listId: string, title: string) => void;
  deleteAllTasks: (listId: string) => void;
  addComment: (listId: string, taskId: string, message: string) => void;
  moveTask: (
    taskId: string,
    sourceListId: string,
    targetListId: string
  ) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      board: boardMockData,
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
                          board: boardMockData,
                          title,
                          comments: [],
                          listId,
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
                              comments: [newComment, ...task.comments],
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
      moveTask: (taskId, sourceListId, targetListId) =>
        set((state) => {
          if (!state.board) return state;

          const lists = state.board.lists.map((list) => {
            if (list.id === sourceListId) {
              return {
                ...list,
                tasks: list.tasks.filter((task) => task.id !== taskId),
              };
            }
            return list;
          });

          let movedTask: Task | undefined;

          state.board.lists.forEach((list) => {
            if (list.id === sourceListId) {
              movedTask = list.tasks.find((t) => t.id === taskId);
            }
          });

          if (!movedTask) return state;

          const updatedTask = {
            ...movedTask,
            listId: targetListId,
          };

          const updatedLists = lists.map((list) => {
            if (list.id === targetListId) {
              const newTasks = [...list.tasks];
              return { ...list, tasks: [...newTasks, updatedTask] };
            }
            return list;
          });

          return {
            board: {
              ...state.board,
              lists: updatedLists,
            },
          };
        }),
    }),
    {
      name: "board-storage",
      partialize: (state) => ({ board: state.board }),
    }
  )
);
