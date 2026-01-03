"use client";

import { TaskCard } from "./components/features";

export default function Home() {
  return (
    <div style={{ width: "fit-content" }}>
      <TaskCard
        title="hello"
        commentsTotal={22}
        onCommentButtonClick={() => {
          console.log("hello");
        }}
      />
    </div>
  );
}
