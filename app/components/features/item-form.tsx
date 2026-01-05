import { Input } from "@/components/ui";
import { useClickOutside } from "@/hooks";
import { XIcon } from "lucide-react";
import React, { useEffect } from "react";

interface ItemFormProps {
  label: string;
  buttonText: string;
  onClose?: () => void;
  onSumbit?: (value: string) => void;
}

const ItemForm = (props: ItemFormProps) => {
  const { label, buttonText, onClose, onSumbit } = props;

  const containerRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useClickOutside(containerRef, () => {
    onClose?.();
  });

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSumbit?.(inputRef.current?.value || "");
  };

  return (
    <form className="item-form" ref={containerRef} onSubmit={onFormSubmit}>
      <Input ref={inputRef} placeholder={label} />
      <div className="item-form__actions">
        <button type="submit" className="item-form__submit">
          {buttonText}
        </button>
        <XIcon className="item-form__close" onClick={onClose} />
      </div>
    </form>
  );
};

export default ItemForm;
