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
    <div className={`overlay ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          {title && <p>{title}</p>}
          <XIcon className="closeIcon cursor-pointer" onClick={onClose} />
        </div>
        <div className="modalBody">{children}</div>
        {footer && <div className="modalFooter">{footer}</div>}
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
