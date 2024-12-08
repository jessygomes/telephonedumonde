//! Fonction pour envoyer un email de vérification
//! Fonction pour envoyer un email de vérification
export const sendVerificationEmail = async (email: string, token: string) => {
  // Changer l'url pour la production
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  // Envoyer l'email
  await fetch("/api/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: email,
      subject: "Vérifiez votre adresse email",
      text: `Cliquez sur le lien suivant pour vérifier votre adresse email : ${confirmLink}`,
    }),
  });
};
