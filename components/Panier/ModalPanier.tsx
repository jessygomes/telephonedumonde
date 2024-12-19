import { useCallback, useEffect, useRef } from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import { BottomGradient } from "../ui/BottomGradient";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPanier: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
        <MdOutlineShoppingCart
          size={30}
          className="absolute top-7 left-10 text-white text-2xl  rounded-full"
        />
        <button
          onClick={onClose}
          className="absolute top-7 right-10 text-white text-2xl"
        >
          &times;
        </button>

        <div className="w-full px-8">
          {/* ARTICLES DANS LE PANIER */}

          {/* PRIX */}

          <button className="bg-gradient-to-t px-2 relative group/btn from-primary-900  to-primary-500 block w-full text-white rounded-md h-10 font-medium">
            Passer au paiement
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPanier;
