import NewPasswordForm from "@/components/Auth/Form/NewPasswordForm";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <section className="p-4 mt-10 md:w-2/3 flex justify-center items-center mx-auto">
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </section>
  );
}
