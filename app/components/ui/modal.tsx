import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { XIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = (props: ModalProps) => {
  const { title, isOpen, onClose, footer, children } = props;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          {title && <p>{title}</p>}
          <XIcon className="modal__close cursor-pointer" onClick={onClose} />
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.getElementById("modal-root") ||
      (() => {
        const el = document.createElement("div");
        el.id = "modal-root";
        document.body.appendChild(el);
        return el;
      })()
  );
};

export default Modal;
