import { useClickOutside } from "@/hooks";
import { useBoardStore } from "@/store";
import { useRef, useState } from "react";
import { Input } from "../ui";
import { flushSync } from "react-dom";

const EditableBoardTitle = () => {
  const board = useBoardStore((s) => s.board);
  const editBoardTitle = useBoardStore((s) => s.editBoardTitle);

  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(inputRef, () => setIsEditable(false));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle = inputRef.current?.value.trim();
    if (newTitle) {
      editBoardTitle(newTitle);
      setIsEditable(false);
    }
  };

  if (isEditable) {
    return (
      <form className="board__title" onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          defaultValue={board?.title}
          placeholder="Enter board title..."
        />
      </form>
    );
  }

  return (
    <h1
      className="board__header"
      onClick={() => {
        flushSync(() => setIsEditable(true));
        inputRef.current?.focus();
      }}
    >
      {board?.title}
    </h1>
  );
};

export default EditableBoardTitle;
