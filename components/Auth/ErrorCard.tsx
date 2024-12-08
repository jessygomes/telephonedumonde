import { CardWrapper } from "./CardWrapper";

function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops ! Il y a une erreur quelque part"
      backButtonLabel="Retourner à la page de connexion"
      backButtonHref="/auth/connexion"
    >
      <div className="flex justify-center text-destructive">!</div>
    </CardWrapper>
  );
}

export default ErrorCard;
