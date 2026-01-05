import { PlusIcon } from "lucide-react";
import ItemForm from "./item-form";

type AddListToggleProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  confirmLabel: string;
  onConfirm: (value: string) => void;
} & (
  | {
      triggerText: string;
      customTrigger?: never;
    }
  | {
      customTrigger: React.ReactNode;
      triggerText?: never;
    }
);

const AddListToggle = (props: AddListToggleProps) => {
  const {
    showForm,
    setShowForm,
    label,
    confirmLabel,
    triggerText,
    customTrigger,
    onConfirm,
  } = props;

  if (showForm) {
    return (
      <ItemForm
        label={label}
        buttonText={confirmLabel}
        onClose={() => setShowForm(false)}
        onSumbit={(title) => {
          onConfirm(title);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    customTrigger ?? (
      <button className="add-list__button" onClick={() => setShowForm(true)}>
        <PlusIcon />
        {triggerText}
      </button>
    )
  );
};

export default AddListToggle;
