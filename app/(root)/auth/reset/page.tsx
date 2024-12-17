import ResetForm from "@/components/Auth/Form/ResetForm";
import { Suspense } from "react";

export default function ResetRoute() {
  return (
    <section className="p-4 mt-10 md:w-2/3 flex justify-center items-center mx-auto">
      <Suspense>
        <ResetForm />
      </Suspense>
    </section>
  );
}
