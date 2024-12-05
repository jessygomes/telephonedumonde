"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { userLoginSchema } from "@/lib/validator";
import { login } from "@/lib/actions/auth.actions";

import { CardWrapper } from "../CardWrapper";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/Form/FormError";
import { FormSuccess } from "@/components/shared/Form/FormSucess";

import { cn } from "@/lib/utils";
import { BottomGradient } from "@/components/ui/BottomGradient";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OauthAccountNotLinked"
      ? "L'email est déjà utilisé par un autre compte"
      : "";

  //! TVa permettre d'inititer un état de chargement lors de la soumission du formulaire et permettra de désactiver les boutons au submit du formulaire
  const [isPending, startTransition] = useTransition();

  // Afficher ou non le form de l'auth à deux facteurs
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  //! Schema de validation
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //! SUBMIT
  const onSubmit = (values: z.infer<typeof userLoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then(
          (data?: {
            error?: string;
            success?: string;
            twoFactor?: boolean;
          }) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
            }

            if (data?.twoFactor) {
              setShowTwoFactor(true);
            }
          }
        )
        .catch(() =>
          setError("Une erreur s'est produite. Veuillez réessayer.")
        );
    });
  };

  return (
    <CardWrapper
      headerLabel="Connectez-vous"
      backButtonLabel="Vous n'avez pas de compte ?"
      backButtonHref="/auth/inscription"
      showSocial
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {showTwoFactor && (
          <div>
            <Label htmlFor="code">Code de vérification</Label>
            <Input id="code" placeholder="123456" type="text" />
          </div>
        )}

        {!showTwoFactor && (
          <>
            <LabelInputContainer>
              <label className="text-white text-sm" htmlFor="mail">
                Email
              </label>
              <Input
                id="mail"
                placeholder="Tyler"
                type="text"
                {...form.register("email")}
              />
              <BottomGradient />
            </LabelInputContainer>

            <LabelInputContainer>
              <label className="text-white text-sm" htmlFor="mail">
                Mot de passe
              </label>
              <Input
                id="password"
                placeholder="Tyler"
                type="password"
                {...form.register("password")}
              />
              <BottomGradient />
            </LabelInputContainer>
          </>
        )}

        <FormError message={error || urlError} />
        <FormSuccess message={success} />

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isPending}
        >
          SE CONNECTER &rarr;
          <BottomGradient />
        </button>
      </form>
    </CardWrapper>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
