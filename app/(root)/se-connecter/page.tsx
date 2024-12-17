import { LoginForm } from "@/components/Auth/Form/LoginForm";
import { Suspense } from "react";

export default function page() {
  return (
    <section className="p-4 w-full mt-10 md:w-1/3 mx-auto">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
