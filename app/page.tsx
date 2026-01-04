"use client";

import { useState } from "react";
import { CommentModal, ItemForm, TaskList } from "./components/features";
import { Comment, Option, Task } from "./types";

export default function Home() {
  const [show, setShow] = useState(true);

  const options: Option[] = [
    {
      label: "Delete List",
      message:
        "All actions will be removed from the activity feed and you won’t be able to re-open the list. There is no undo.",
      onClick: () => {
        console.log("first");
      },
    },
    {
      label: "Delete All Cards",
      message: "This will remove all the cards in this list from the board.",
      onClick: () => {
        console.log("first");
      },
    },
  ];

  const tasks: Task[] = Array.from({ length: 3 }).map((_, i) => ({
    id: i.toString(),
    title: `title ${i + 1}`,
    comments: [],
  }));

  const comments: Comment[] = Array.from({ length: 2 }).map((_, i) => ({
    id: i.toString(),
    message: `comment message ${i + 1}`,
    timestamp: new Date().toISOString(),
    author: "User",
  }));

  return (
    <div style={{ width: "fit-content" }}>
      {show ? (
        <ItemForm
          label="Add a card"
          buttonText="Add Card"
          onClose={() => {
            setShow(false);
          }}
          onSumbit={(value) => {
            console.log(value);
          }}
        />
      ) : null}

      <CommentModal
        title="Comments for ..."
        isOpen={!show}
        onClose={() => setShow(true)}
        comments={comments}
        onAddClick={(message) => {
          console.log(message);
        }}
      />
    </div>
  );
}
