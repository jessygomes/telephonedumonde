"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { userRegisterSchema } from "@/lib/validator";
import { register } from "@/lib/actions/auth.actions";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/Form/FormError";
import { FormSuccess } from "@/components/shared/Form/FormSucess";

import { cn } from "@/lib/utils/utils";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { CardWrapper } from "../CardWrapper";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  //! Schema de validation
  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  //! Fonction de soumission du formulaire
  const onSubmit = (values: z.infer<typeof userRegisterSchema>) => {
    // Reset des messages d'erreur et de succès
    setError("");
    setSuccess("");

    console.log(values);

    // Server Action (je peux aussi utiliser fetch ici)
    startTransition(() => {
      register(values).then((data: { error?: string; success?: string }) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Inscrivez-vous"
      backButtonLabel="Vous avez dèjà un compte ? Connectez-vous"
      backButtonHref="/se-connecter"
      showSocial
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-2">
          <LabelInputContainer>
            <label className="text-white text-sm" htmlFor="firstName">
              Prénom
            </label>
            <Input
              id="firstName"
              placeholder="Tyler"
              type="text"
              {...form.register("firstName")}
            />
            <BottomGradient />
          </LabelInputContainer>

          <LabelInputContainer>
            <label className="text-white text-sm" htmlFor="lastName">
              Nom
            </label>
            <Input
              id="lastName"
              placeholder="Brown"
              type="text"
              {...form.register("lastName")}
            />
            <BottomGradient />
          </LabelInputContainer>
        </div>

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

        <div className="flex gap-2">
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
          Créer mon compte &rarr;
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
    <div className={cn("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
