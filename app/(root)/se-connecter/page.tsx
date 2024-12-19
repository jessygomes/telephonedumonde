import { LoginForm } from "@/components/Auth/Form/LoginForm";
import { Suspense } from "react";

export default function page() {
  return (
    <section className="">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
