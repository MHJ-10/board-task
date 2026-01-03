import { Card } from "../ui";

interface TaskCardProps {
  title: string;
  onCommentButtonClick: () => void;
  commentsTotal?: number;
}

const TaskCard = (props: TaskCardProps) => {
  const { title, onCommentButtonClick, commentsTotal = 0 } = props;

  return (
    <Card title={title}>
      <div className="taskCardBody">
        <button
          className="taskCardButton cursor-pointer"
          onClick={onCommentButtonClick}
        >
          Comments ({commentsTotal})
        </button>
      </div>
    </Card>
  );
};

export default TaskCard;
