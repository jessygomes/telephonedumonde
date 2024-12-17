import { NewVerificationForm } from "@/components/Auth/Form/NewVerificationForm";
import { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <section className="p-4 mt-10 md:w-2/3 flex justify-center items-center mx-auto">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </section>
  );
}
