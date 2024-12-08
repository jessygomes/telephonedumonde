"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  MdMenu,
  MdClose,
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
} from "react-icons/md";

interface NavItemsProps {
  session: { user: { name: string; email: string; role: string } } | null;
}

export const NavMobile = ({ session }: NavItemsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="md:hidden">
      <div className="flex items-center justify-between text-white">
        <button onClick={handleOpen} className="text-2xl">
          <MdMenu size={40} className="text-white" />
        </button>
      </div>

      <div
        ref={navRef}
        className={`fixed top-0 right-0 w-64 h-full bg-black/10 backdrop-blur-lg text-white transform flex flex-col justify-center ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className=" flex items-center justify-between">
          <div className="absolute top-4 left-4 text-lg font-bold">Menu</div>
          <button
            onClick={handleClose}
            className="text-2xl absolute top-4 right-4"
          >
            <MdClose />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-8 font-font1 text-2xl tracking-widest">
          <li>
            <Link href="/" onClick={handleClose}>
              Home
            </Link>
          </li>
          <div className="h-[1px] bg-white" />
          <li>
            <Link href="/boutique" onClick={handleClose}>
              Boutique
            </Link>
          </li>
          <div className="h-[1px] bg-white" />
          <li>
            <Link href="/concept" onClick={handleClose}>
              Concept
            </Link>
          </li>
          <div className="h-[1px] bg-white" />
          <li className="flex gap-8">
            <Link
              href={session ? "/mon-compte" : "se-connecter"}
              onClick={handleClose}
            >
              <MdOutlineAccountCircle size={40} />
            </Link>
            <MdOutlineShoppingCart size={40} className="cursor-pointer" />
          </li>
        </ul>
      </div>
    </nav>
  );
};
