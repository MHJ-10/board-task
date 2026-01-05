"use client";

import { AddListToggle, ListActions, TaskCard } from "@/components/features";
import { Input, List } from "@/components/ui";
import { useClickOutside } from "@/hooks";
import { useBoardStore } from "@/store";
import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

interface TaskListProps {
  title: string;
  listId: string;
}

const TaskList = ({ title, listId }: TaskListProps) => {
  const tasks = useBoardStore(
    (s) => s.board?.lists.find((l) => l.id === listId)?.tasks ?? []
  );

  const addTask = useBoardStore((s) => s.addTask);
  const editListTitle = useBoardStore((s) => s.editListTitle);

  const [showOptions, setShowOptions] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setNodeRef } = useDroppable({ id: listId });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      editListTitle(listId, inputRef.current.value);
      setIsEditable(false);
    }
  };

  const onTitleClick = () => {
    flushSync(() => setIsEditable(true));
    inputRef.current?.focus();
  };

  const onToggleOptions = (): void | undefined => {
    setShowOptions((prev) => !prev);
  };

  useClickOutside(inputRef, () => setIsEditable(false));

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
            <h4 className="task-list__title" onClick={onTitleClick}>
              {title}
            </h4>
          )
        }
        onOptionsClick={onToggleOptions}
      >
        <div className="task-list__tasks" ref={setNodeRef}>
          {tasks.map((task) => (
            <TaskCard key={task.id} id={task.id} />
          ))}
        </div>

        <AddListToggle
          label="Enter a card title..."
          confirmLabel="Create card"
          showForm={showAddForm}
          setShowForm={setShowAddForm}
          onConfirm={(message) => {
            addTask(listId, message);
          }}
          customTrigger={
            <button
              className="task-list__add-button"
              onClick={() => setShowAddForm(true)}
            >
              <PlusIcon />
              <span>Add another card</span>
            </button>
          }
        />
      </List>

      {showOptions && (
        <div className="task-list__actions-wrapper">
          <ListActions
            title="List Actions"
            listId={listId}
            onClose={() => setShowOptions(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
