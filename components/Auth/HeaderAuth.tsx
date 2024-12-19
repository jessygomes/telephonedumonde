import Link from "next/link";

interface HeaderAuthProps {
  label: string;
}

export const HeaderAuth = ({ label }: HeaderAuthProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
      <Link
        href="/"
        className="text-2xl font-bold kronaOne -tracking-[0.25rem]"
      >
        Téléphone du Monde
      </Link>
      <p className="text-muted-foreground text-sm rubik">{label}</p>
    </div>
  );
};
