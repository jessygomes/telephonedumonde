import { useCallback, useEffect, useRef } from "react";
import { LoginForm } from "./Form/LoginForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalConnexion: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        ref={modalRef}
        className="backdrop-blur-md w-1/4 h-full shadow-lg relative flex justify-center items-center"
      >
        <button
          onClick={onClose}
          className="absolute top-7 right-10 text-white text-2xl"
        >
          &times;
        </button>
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalConnexion;
