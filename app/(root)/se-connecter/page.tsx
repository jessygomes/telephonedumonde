import { LoginForm } from "@/components/Auth/Form/LoginForm";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
