import React from "react";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-primary-900/50 p-3 rounded-md rubik flex items-center justify-center gap-x-2 text-sm text-destructive">
      <p className="">{message}</p>
    </div>
  );
};
