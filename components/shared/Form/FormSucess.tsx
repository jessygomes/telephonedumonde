import React from "react";

interface FormSuccessProps {
  message: string | undefined;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className=" bg-emerald-500/15 p-3 rounded-sm rubik flex items-center justify-center gap-x-2 text-sm text-emerald-500">
      <p className="">{message}</p>
    </div>
  );
};
