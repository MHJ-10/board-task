import CommentModal from "@/components/features/comment-modal";
import { Card, Draggable } from "@/components/ui";
import { Task } from "@/types";
import { useState } from "react";

interface TaskCardProps {
  task?: Task;
  onAddComment?: (message: string) => void;
}

const TaskCard = (props: TaskCardProps) => {
  const { task, onAddComment } = props;

  const [isOpen, setIsOpen] = useState(false);

  if (!task) return;

  return (
    <>
      <Draggable
        key={task.id}
        id={task.id}
        data={{ taskId: task.id, listId: task.listId }}
      >
        <Card title={task.title}>
          <div className="taskCardBody">
            <button
              data-dndkit-draggable-ignore
              className="taskCardButton cursor-pointer"
              onPointerDown={(e) => {
                // insure the drag event is not triggered when clicking the button
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
        onAddClick={onAddComment}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default TaskCard;
