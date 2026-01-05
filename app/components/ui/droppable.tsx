"use client";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

const Droppable = ({ id, children }: DroppableProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="droppable" ref={setNodeRef}>
      {children}
    </div>
  );
};

export default Droppable;
