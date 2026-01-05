"use client";

import { ItemForm, ListActions, TaskCard } from "@/components/features";
import { Input, List } from "@/components/ui";
import { useClickOutside } from "@/hooks";
import { Option, Task } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

interface TaskListProps {
  options?: Option[];
  title: string;
  listId: string;
  tasks?: Task[];
  onEditTitle?: (title: string) => void;
  onAddTask: (title: string) => void;
  onSaveComment: (taskId: string, message: string) => void;
}

const TaskList = (props: TaskListProps) => {
  const {
    title,
    options,
    tasks,
    listId,
    onEditTitle,
    onAddTask,
    onSaveComment,
  } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setNodeRef } = useDroppable({ id: listId });

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
    <div ref={setNodeRef} className="task-list">
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
              task={task}
              onAddComment={(title) => {
                onSaveComment(task.id, title);
              }}
            />
          ))}
        </div>

        {showAddForm ? (
          <ItemForm
            label="Enter a card title..."
            buttonText="Create Card"
            onClose={() => {
              setShowAddForm(false);
            }}
            onSumbit={(title) => {
              onAddTask(title);
              setShowAddForm(false);
            }}
          />
        ) : (
          <button
            className="task-list__add-button"
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            <PlusIcon />
            <span>Add another card</span>
          </button>
        )}
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
