"use client";

import ModalConnexion from "@/components/Auth/ModalConnexion";
import ModalPanier from "@/components/Panier/ModalPanier";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
  MdOutlineSearch,
} from "react-icons/md";

interface NavItemsProps {
  onLinkClick?: () => void;
  session: { user: { name: string; email: string; role: string } } | null;
}

export const NavItemsBis = ({ onLinkClick, session }: NavItemsProps) => {
  const pathname = usePathname();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPanierOpen, setIsPanierOpen] = useState(false);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const handleAccountClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setIsModalOpen(true);
    } else {
      handleLinkClick();
    }
  };

  const handleSearchClick = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const isActive = pathname === "/mon-compte";

  return (
    <>
      <ul className="flex gap-6 items-center">
        <li className="relative flex">
          <MdOutlineSearch
            size={25}
            className={`cursor-pointer z-20 hover:text-white/70 transition-transform duration-300 ${
              isSearchVisible ? "translate-x-[-215px]" : ""
            }`}
            onClick={handleSearchClick}
          />
          <input
            type="text"
            className={`absolute right-0 h-full pl-4 pr-2 py-2 bg-noir-900 border-[1px] border-white rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-300 placeholder:text-xs ${
              isSearchVisible ? "w-[200px] opacity-100" : "w-0 opacity-0"
            }`}
            placeholder="Recherche..."
          />
        </li>
        <li>
          <Link
            href={session ? "/mon-compte" : "#"}
            onClick={handleAccountClick}
          >
            <MdOutlineAccountCircle
              size={25}
              className={`${
                isActive
                  ? "bg-gradient-to-t from-primary-500 to-second-500 rounded-full"
                  : "hover:text-white/70"
              }`}
            />
          </Link>
        </li>
        <li>
          <MdOutlineShoppingCart
            size={25}
            onClick={() => setIsPanierOpen(true)}
            className="cursor-pointer hover:text-white/70"
          />
        </li>
      </ul>

      <ModalConnexion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ModalPanier
        isOpen={isPanierOpen}
        onClose={() => setIsPanierOpen(false)}
      />
    </>
  );
};
