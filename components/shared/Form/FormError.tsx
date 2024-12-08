import React from "react";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-white p-3 rounded-sm rubik flex items-center justify-center gap-x-2 text-sm text-destructive">
      <p className="">{message}</p>
    </div>
  );
};
