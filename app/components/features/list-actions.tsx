"use client";

import { ChevronLeft, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Option } from "../../types";
import { useClickOutside } from "../../hooks";

interface ListActionsProps {
  title: string;
  options?: Option[];
  onClose?: () => void;
}

const ListActions = ({ title, options, onClose }: ListActionsProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
                onClick={selectedOption.onClick}
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
