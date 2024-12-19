"use client";
import { useState } from "react";

import ModalAdmin from "@/components/shared/Modals/ModalAdmin";
import VariantForm from "./VariantForm";
import { FaEdit } from "react-icons/fa";

type EditVariantButtonProps = {
  userId: string;
  modelId: string;
  variant: {
    id: string;
    price: number;
    memory: number;
    color: string;
    description: string;
    stock: number;
    isActive: boolean;
    imageUrl: string[];
    model: { name: string };
    country: string;
  };
};

const EditVariantBtn: React.FC<EditVariantButtonProps> = ({ 
  userId, 
  modelId, 
  variant 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={handleOpenModal}>
       <FaEdit size={20} className="text-white hover:text-white/80" />
      </button>

      <ModalAdmin isOpen={isModalOpen} onClose={handleCloseModal}>
        <VariantForm
          userId={userId}
          modelId={modelId}
          type="edit"
          variant={variant} // Passez la variante ici
          setIsModalOpen={setIsModalOpen}
        />
      </ModalAdmin>
    </>
  );
};

export default EditVariantBtn;
