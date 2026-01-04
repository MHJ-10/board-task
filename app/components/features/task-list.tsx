"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import { Input, List } from "../ui";
import ListActions from "./list-actions";
import TaskCard from "./task-card";
import { Option, Task } from "../../types";
import { useClickOutside } from "../../hooks";

interface TaskListProps {
  options?: Option[];
  title: string;
  tasks?: Task[];
  onEditTitle?: (title: string) => void;
}

const TaskList = (props: TaskListProps) => {
  const { title, options, tasks, onEditTitle } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      onEditTitle?.(inputRef.current.value);
      setIsEditable(false);
    }
  };

  const onTitleClick = () => {
    // Ensure the input is focused after setting editable state
    flushSync(() => {
      setIsEditable(true);
    });
    inputRef.current?.focus();
  };

  const onToggleOptions = (): void | undefined => {
    if (options?.length) {
      setShowOptions((prev) => !prev);
      return;
    }
    return undefined;
  };

  useClickOutside(inputRef, () => {
    setIsEditable(false);
  });

  return (
    <div className="task-list">
      <List
        titleNode={
          isEditable ? (
            <form className="task-list__title-form" onSubmit={onSubmit}>
              <Input
                ref={inputRef}
                defaultValue={title}
                placeholder="Enter list title..."
              />
            </form>
          ) : (
            <p className="task-list__title" onClick={onTitleClick}>
              {title}
            </p>
          )
        }
        onOptionsClick={onToggleOptions}
      >
        <div className="task-list__tasks">
          {tasks?.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              commentsTotal={task.comments.length}
              onCommentButtonClick={() => {
                console.log(task);
              }}
            />
          ))}
        </div>
      </List>

      {showOptions && (
        <div className="task-list__actions-wrapper">
          <ListActions
            title="List Actions"
            options={options}
            onClose={() => setShowOptions(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
