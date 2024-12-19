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

import { BottomGradient } from "@/components/ui/BottomGradient";
import Link from "next/link";

interface LoginFormProps {
  onClose?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
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
              if (onClose) {
                onClose();
              }
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
    <div className="flex flex-col">
      <CardWrapper
        headerLabel="Connectez-vous"
        backButtonLabel="Vous n'avez pas de compte ? Créer un compte"
        backButtonHref="/creer-mon-compte"
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
              <div>
                <label className="text-white text-sm" htmlFor="mail">
                  Email
                </label>
                <Input
                  id="mail"
                  placeholder="monde@mail.com"
                  type="text"
                  className="text-noir-900"
                  {...form.register("email")}
                />
              </div>

              <div>
                <label className="text-white text-sm" htmlFor="mail">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  placeholder="Mot de passe"
                  type="password"
                  className="text-noir-900"
                  {...form.register("password")}
                />
              </div>
            </>
          )}

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <button
            className="bg-gradient-to-t px-2 relative group/btn from-primary-900  to-primary-500 block w-full text-white rounded-md h-10 font-medium "
            type="submit"
            disabled={isPending}
          >
            SE CONNECTER &rarr;
            <BottomGradient />
          </button>
        </form>
      </CardWrapper>
      <Link
        className="text-center text-noir-100 text-xs hover:text-white/70 transition-all ease-in-out duration-150"
        href="/auth/reset"
      >
        Mot de passe oublié ?
      </Link>
    </div>
  );
};
