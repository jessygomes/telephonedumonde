import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../Auth/LogOutBtn";

export default function Footer() {
  return (
    <footer className="text-white bg-noir-800 py-8">
      <div className="flex-center flex-col gap-8">
        <p className="font-font1 tracking-widest text-xl">TELEPHONE DU MONDE</p>

        <LogoutBtn>
          <p className="text-white text-xs">DECONNEXION</p>
        </LogoutBtn>

        <div className="flex gap-8">
          <Link
            href="/mentions-legales"
            className="text-xs hover:neon-effect transition-all ease-in-out duration-300"
          >
            Mentions Légales
          </Link>
          <Link
            href="/cgv"
            className="text-xs hover:neon-effect transition-all ease-in-out duration-300"
          >
            CGV
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="text-xs hover:neon-effect transition-all ease-in-out duration-300"
          >
            Politique de confidentialité
          </Link>
          <Link
            href="/contact"
            className="text-xs hover:neon-effect transition-all ease-in-out duration-300"
          >
            Livaisons & retours
          </Link>
          <Link
            href="/contact"
            className="text-xs hover:neon-effect transition-all ease-in-out duration-300"
          >
            Contact
          </Link>
        </div>
        <p className="text-[10px]">
          Website by{" "}
          <Link
            href={"https://www.inthegleam.com/"}
            target="_blank"
            className="hover:neon-effect transition-all ease-in-out duration-300 font-font1 tracking-widest"
          >
            INTHEGLEAM
          </Link>
        </p>
      </div>
    </footer>
  );
}
