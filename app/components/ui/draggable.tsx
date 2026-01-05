"use client";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import React from "react";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  data: UseDraggableArguments["data"];
}

const Draggable = ({ id, data, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="draggable"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
