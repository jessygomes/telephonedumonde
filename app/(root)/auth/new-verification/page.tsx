import { NewVerificationForm } from "@/components/Auth/Form/NewVerificationForm";
import { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
}
