"use client";

import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useBoardStore } from "../../store";
import { ItemForm, TaskList } from "../features";
import { Input } from "../ui";
import { useClickOutside } from "../../hooks";
import { flushSync } from "react-dom";

const BoardPage = () => {
  const board = useBoardStore().board;
  const lists = board?.lists || [];
  const addList = useBoardStore().addList;
  const editBoardTitle = useBoardStore().editBoardTitle;
  const editListTitle = useBoardStore().editListTitle;
  const deleteList = useBoardStore().deleteList;
  const deleteAllTasks = useBoardStore().deleteAllTasks;
  const addTask = useBoardStore().addTask;
  const addComment = useBoardStore().addComment;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useClickOutside(inputRef, () => setIsTitleEditable(false));

  const onEditBoardTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTitle = inputRef.current?.value.trim();
    if (newTitle) {
      editBoardTitle(newTitle);
      setIsTitleEditable(false);
    }
  };

  return (
    <div className="board">
      {isTitleEditable ? (
        <form className="board__title-form" onSubmit={onEditBoardTitle}>
          <Input
            ref={inputRef}
            defaultValue={board?.title}
            placeholder="Enter board title..."
          />
        </form>
      ) : (
        <h1
          className="board__header"
          onClick={() => {
            flushSync(() => setIsTitleEditable(true));
            inputRef.current?.focus();
          }}
        >
          {board?.title}
        </h1>
      )}

      <div className="board__lists">
        {lists.map((list) => (
          <div className="board__list" key={list.id}>
            <TaskList
              title={list.title}
              tasks={list.tasks}
              onEditTitle={(title) => {
                editListTitle(list.id, title);
              }}
              onAddTask={(title) => {
                addTask(list.id, title);
              }}
              onSaveComment={(taskId, message) => {
                addComment(list.id, taskId, message);
              }}
              options={[
                {
                  label: "Delele List",
                  message:
                    "All actions will be removed from the activity feed and you won’t be able to re-open the list. There is no undo.",
                  onClick: () => {
                    deleteList(list.id);
                  },
                },
                {
                  label: "Delele All Cards",
                  message:
                    "This will remove all the cards in this list from the board.",
                  onClick: () => {
                    deleteAllTasks(list.id);
                  },
                },
              ]}
            />
          </div>
        ))}
        {showForm ? (
          <ItemForm
            label="Enter a list title..."
            buttonText="Add list"
            onClose={() => {
              setShowForm(false);
            }}
            onSumbit={(title) => {
              addList(title);
              setShowForm(false);
            }}
          />
        ) : (
          <button
            className="board__add-list"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <PlusIcon />
            Add another list
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardPage;
