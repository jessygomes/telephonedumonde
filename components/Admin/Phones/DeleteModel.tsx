import { deleteModel } from "@/lib/actions/model.actions";
import { useRouter } from "next/navigation";

interface DeleteModelProps {
  setIsModalOpen: (isOpen: boolean) => void;
  userId: string;
  modelId: string;
}

export default function DeleteModel({
  setIsModalOpen,
  userId,
  modelId,
}: DeleteModelProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // Ajoutez ici la logique pour supprimer le modèle
      if (userId) {
        await deleteModel(userId, modelId);
        setIsModalOpen(false);
        router.refresh(); // Rafraîchir la page après une suppression réussie
      } else {
        console.error("User ID is undefined");
      }
      setIsModalOpen(false);
      // Rafraîchir la liste des modèles ou rediriger l'utilisateur
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
