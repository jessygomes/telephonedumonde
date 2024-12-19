"use client";
import { useState } from "react";

import ModalAdmin from "@/components/shared/Modals/ModalAdmin";
import { MdDeleteOutline } from "react-icons/md";
import DeleteVariant from "./DeleteVariant";

interface DeleteVariantButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
  userId: string | undefined;
  modelId: string;
  variantId: string;
}

const DeleteVariantBtn: React.FC<DeleteVariantButtonProps> = ({
  userId,
  modelId,
  variantId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={handleOpenModal}>
        <MdDeleteOutline size={20} className="text-white hover:text-white/80" />
      </button>
      <ModalAdmin isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold">Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer ce variant ?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleCloseModal}
            className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition-all ease-in-out duration-150"
          >
            Annuler
          </button>
          <DeleteVariant
            setIsModalOpen={setIsModalOpen}
            userId={userId ?? ""}
            variantId={variantId}
            modelId={modelId}
          />
        </div>
      </ModalAdmin>
    </>
  );
};

export default DeleteVariantBtn;
