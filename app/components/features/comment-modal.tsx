import React from "react";
import { Modal } from "../ui";
import { Comment } from "../../types";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  comments?: Comment[];
  onAddClick?: (message: string) => void;
}

const CommentModal = (props: ModalProps) => {
  const { isOpen, onClose, comments, title, onAddClick } = props;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    onAddClick?.(textareaRef.current?.value || "");
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <button className="comment-modal__submit" onClick={onClick}>
          Add Comment
        </button>
      }
    >
      <div className="comment-modal__content">
        <div className="comment-modal__comments-wrappper">
          {comments?.length ? (
            comments.map((comment) => (
              <div className="comment-modal__comment" key={comment.id}>
                <p className="comment-modal__meta">
                  {comment.author} · {new Date(comment.date).toLocaleString()}
                </p>
                <p className="comment-modal__message">{comment.message}</p>
              </div>
            ))
          ) : (
            <p className="comment-modal__empty">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        <textarea
          ref={textareaRef}
          rows={2}
          placeholder="Write a comment..."
          className="comment-modal__textarea"
        />
      </div>
    </Modal>
  );
};

export default CommentModal;
