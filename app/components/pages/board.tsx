"use client";

import { AddListToggle, BoardTitle, TaskList } from "@/components/features";
import { Droppable } from "@/components/ui";
import { useBoardStore } from "@/store";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useId, useState } from "react";

const BoardPage = () => {
  const board = useBoardStore((s) => s.board);
  const moveTask = useBoardStore((s) => s.moveTask);
  const addList = useBoardStore((s) => s.addList);

  // dnd-kit unique id for hydration error avoidance
  const id = useId();

  const [showForm, setShowForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active.data.current || !over?.id) return;

    const { listId: sourceId, taskId } = active.data.current;
    const destinationId = over.id as string;

    if (sourceId === destinationId) return;

    moveTask(taskId, sourceId, destinationId);
  };

  return (
    <div className="board">
      <BoardTitle />
      <DndContext id={id} sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="board__lists">
          {board?.lists.map((list) => (
            <Droppable key={list.id} id={list.id}>
              <div className="board__list" key={list.id}>
                <TaskList listId={list.id} title={list.title} />
              </div>
            </Droppable>
          ))}
          <AddListToggle
            triggerText="Add anothet list"
            label="Enter a list title..."
            confirmLabel="Add list"
            showForm={showForm}
            setShowForm={setShowForm}
            onConfirm={(message) => {
              addList(message);
            }}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default BoardPage;
