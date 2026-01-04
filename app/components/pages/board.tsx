"use client";

import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useBoardStore } from "../../store";
import { Option } from "../../types";
import { TaskList } from "../features";
import { Input } from "../ui";
import { useClickOutside } from "../../hooks";
import { flushSync } from "react-dom";

const BoardPage = () => {
  const board = useBoardStore().board;
  const lists = board?.lists || [];

  const inputRef = useRef<HTMLInputElement>(null);

  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const listOptions: Option[] = [
    {
      label: "Delele List",
      message:
        "All actions will be removed from the activity feed and you won’t be able to re-open the list. There is no undo.",
      onClick: () => {
        console.log("first");
      },
    },
    {
      label: "Delele All Cards",
      message: "This will remove all the cards in this list from the board.",
      onClick: () => {
        console.log("second");
      },
    },
  ];

  useClickOutside(inputRef, () => setIsTitleEditable(false));

  return (
    <div className="board">
      {isTitleEditable ? (
        <form>
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
              onEditTitle={(title) => console.log(title)}
              options={listOptions}
            />
          </div>
        ))}
        <button className="board__add-list">
          <PlusIcon />
          Add another list
        </button>
      </div>
    </div>
  );
};

export default BoardPage;
