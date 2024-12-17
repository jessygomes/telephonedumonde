import { RegisterForm } from "@/components/Auth/Form/RegisterForm";
import { Suspense } from "react";

export default function page() {
  return (
    <section className="p-4 mt-10 md:w-1/3 flex justify-center items-center mx-auto">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </section>
  );
}
