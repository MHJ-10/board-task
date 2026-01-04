import { useState } from "react";
import { Card } from "../ui";
import CommentModal from "./comment-modal";
import { Comment } from "../../types";

interface TaskCardProps {
  title: string;
  comments: Comment[];
}

const TaskCard = (props: TaskCardProps) => {
  const { title, comments } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card title={title}>
        <div className="taskCardBody">
          <button
            className="taskCardButton cursor-pointer"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Comments ({comments.length || 0})
          </button>
        </div>
      </Card>
      <CommentModal
        title={title}
        comments={comments}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default TaskCard;
