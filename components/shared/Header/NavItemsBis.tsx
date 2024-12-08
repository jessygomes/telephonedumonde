"use client";
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
  session: { user: { name: string; email: string } } | null;
}

export const NavItemsBis = ({ onLinkClick, session }: NavItemsProps) => {
  const pathname = usePathname();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const handleSearchClick = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const isActive = pathname === "/mon-compte";

  return (
    <ul className="flex gap-6 items-center">
      <li className="relative flex">
        <MdOutlineSearch
          size={25}
          className={`cursor-pointer z-20 transition-transform duration-300 ${
            isSearchVisible ? "translate-x-[-215px]" : ""
          }`}
          onClick={handleSearchClick}
        />
        <input
          type="text"
          className={`absolute right-0 h-full pl-4 pr-2 py-2 bg-noir-900 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-300 placeholder:text-xs ${
            isSearchVisible ? "w-[200px] opacity-100" : "w-0 opacity-0"
          }`}
          placeholder="Recherche..."
        />
      </li>
      <li>
        <Link
          href={session ? "/mon-compte" : "se-connecter"}
          onClick={handleLinkClick}
        >
          <svg width="0" height="0">
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#d20c08", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#6a0704", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
          <MdOutlineAccountCircle
            size={25}
            style={isActive ? { fill: "url(#gradient1)" } : {}}
            className={`${isActive ? "neon-bg bg-white rounded-full" : ""}`}
          />
        </Link>
      </li>
      <li>
        <MdOutlineShoppingCart size={25} className="cursor-pointer" />
      </li>
    </ul>
  );
};
