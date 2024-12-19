import { deleteModel } from "@/lib/actions/model.actions";
import { deleteVariant } from "@/lib/actions/variant.actions";
import { useRouter } from "next/navigation";

interface DeleteVariantButtonProps {
    setIsModalOpen: (isOpen: boolean) => void;
    userId: string | undefined;
    modelId: string;
    variantId: string;
  }

export default function DeleteVariant({
  setIsModalOpen,
  userId,
  variantId,
}: DeleteVariantButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (userId) {
        await deleteVariant(variantId);
        setIsModalOpen(false);
        router.refresh(); 
      } else {
        console.error("User ID is undefined");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du modèle", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 p-2 rounded-md hover:bg-red-700 transition-all ease-in-out duration-150 text-white"
    >
      Supprimer
    </button>
  );
}
