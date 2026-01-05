"use client";

import { useClickOutside } from "@/hooks";
import { useBoardStore } from "@/store";
import { Option } from "@/types";
import { ChevronLeft, XIcon } from "lucide-react";
import { useRef, useState } from "react";

interface ListActionsProps {
  title: string;
  listId: string;
  onClose?: () => void;
}

const ListActions = ({ title, listId, onClose }: ListActionsProps) => {
  const deleteList = useBoardStore((s) => s.deleteList);
  const deleteAllTasks = useBoardStore((s) => s.deleteAllTasks);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const options = [
    {
      label: "Delele List",
      message:
        "All actions will be removed from the activity feed and you won’t be able to re-open the list. There is no undo.",
      onClick: () => {
        deleteList(listId);
      },
    },
    {
      label: "Delele All Cards",
      message: "This will remove all the cards in this list from the board.",
      onClick: () => {
        deleteAllTasks(listId);
      },
    },
  ];

  useClickOutside<HTMLDivElement>(containerRef, () => {
    onClose?.();
  });

  return (
    <div ref={containerRef}>
      <div className="list-actions">
        <div className="list-actions__header">
          <p className="list-actions__title">{title}</p>

          {onClose && (
            <XIcon
              className="list-actions__icon list-actions__icon--close"
              onClick={onClose}
            />
          )}

          {selectedOption && (
            <ChevronLeft
              className="list-actions__icon list-actions__icon--back"
              onClick={() => setSelectedOption(null)}
            />
          )}
        </div>

        <div className="list-actions__content">
          {selectedOption ? (
            <div className="list-actions__action">
              <p className="list-actions__action-message">
                {selectedOption.message}
              </p>

              <button
                className="list-actions__action-button"
                onClick={() => {
                  selectedOption.onClick();
                  onClose?.();
                }}
              >
                {selectedOption.label}
              </button>
            </div>
          ) : (
            <ul className="list-actions__options">
              {options?.map((option) => (
                <li
                  key={option.label}
                  onClick={() => setSelectedOption(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListActions;
