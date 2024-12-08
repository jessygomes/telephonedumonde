"use client";
import { useState } from "react";

import ModalAdmin from "@/components/shared/Modals/ModalAdmin";
import ModelForm from "./ModelForm";

import { FaEdit } from "react-icons/fa";

interface EditModelButtonProps {
  userId: string | undefined;
  model: { id: string; name: string; isActive: boolean };
  modelId: string;
}

const EditModelButton: React.FC<EditModelButtonProps> = ({
  userId,
  model,
  modelId,
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
        <ModelForm
          userId={userId}
          type="edit"
          model={model}
          modelId={modelId}
          setIsModalOpen={setIsModalOpen}
        />
      </ModalAdmin>
    </>
  );
};

export default EditModelButton;
