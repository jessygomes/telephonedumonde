import { RegisterForm } from "@/components/Auth/Form/RegisterForm";
import { Suspense } from "react";

export default function page() {
  return (
    <section className="">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </section>
  );
}
