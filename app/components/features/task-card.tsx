import { useState } from "react";
import { Card, Draggable } from "@/components/ui";
import CommentModal from "./comment-modal";
import { useBoardStore } from "@/store";

const TaskCard = ({ id }: { id: string }) => {
  const task = useBoardStore((s) => {
    const list = s.board?.lists.find((l) => l.tasks.some((t) => t.id === id));
    return list?.tasks.find((t) => t.id === id);
  });

  const addComment = useBoardStore((s) => s.addComment);

  const [isOpen, setIsOpen] = useState(false);

  if (!task) return null;

  return (
    <>
      <Draggable
        key={task.id}
        id={task.id}
        data={{ taskId: task.id, listId: task.listId }}
      >
        <Card title={task.title}>
          <div className="card__body">
            <button
              data-dndkit-draggable-ignore
              className="card__button"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Comments ({task.comments.length || 0})
            </button>
          </div>
        </Card>
      </Draggable>

      <CommentModal
        title={task.title}
        comments={task.comments}
        onAddClick={(message) => addComment(task.listId, task.id, message)}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default TaskCard;
