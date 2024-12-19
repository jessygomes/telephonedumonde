"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { newPasswordSchema } from "@/lib/validator";
import { newPassword } from "@/lib/actions/auth.actions";
import { useState, useTransition } from "react";

import { CardWrapper } from "../CardWrapper";
import { BottomGradient } from "@/components/ui/BottomGradient";

import { cn } from "@/lib/utils/utils";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/Form/FormError";
import { FormSuccess } from "@/components/shared/Form/FormSucess";

export default function NewPasswordForm() {
  //! Récupération du token depuis l'URL envoyé depuis le lien du mail :
  const searchParams = useSearchParams();
  // ce token est utilisé pour l'envoyer à la fonction newPassword
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  //! Schema de validation
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  //! Fonction de soumission du formulaire
  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    // Reset des messages d'erreur et de succès
    setError("");
    setSuccess("");

    // Server Action (je peux aussi utiliser fetch ici)
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Mot de passe oublié ?"
      backButtonLabel="Retourner à la connexion"
      backButtonHref="/se-connecter"
      showSocial={false}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="space-y-4">
          <LabelInputContainer>
            <label className="text-white text-sm" htmlFor="password">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
            />
            <BottomGradient />
          </LabelInputContainer>

          <LabelInputContainer>
            <label
              className="text-white text-sm"
              htmlFor="passwordConfirmation"
            >
              Confirmer le mot de passe
            </label>
            <Input
              id="passwordConfirmation"
              type="password"
              {...form.register("passwordConfirmation")}
            />
            <BottomGradient />
          </LabelInputContainer>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isPending}
        >
          Réinitialiser mon mot de passe &rarr;
          <BottomGradient />
        </button>
      </form>
    </CardWrapper>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
