"use client";

import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <button
      type="button"
      className="flex justify-center mx-auto rounded-lg hover:text-grey-500 transition-all ease-in-out duration-200"
    >
      <Link href={href} className="text-sm rubik">
        {label}
      </Link>
    </button>
  );
};
