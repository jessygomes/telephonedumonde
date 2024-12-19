"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { headerLinkMain, headerLinkAdmin } from "@/lib/constant";

interface NavItemsProps {
  session: { user: { name: string; email: string; role: string } } | null;
  onLinkClick?: () => void;
}

export const NavItems = ({ onLinkClick, session }: NavItemsProps) => {
  const pathname = usePathname();

  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLUListElement>(null);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  useEffect(() => {
    const activeElement = navRef.current?.querySelector(".active");
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    } else {
      setIndicatorStyle({});
    }
  }, [pathname]);

  const links =
    session?.user.role === "admin" ? headerLinkAdmin : headerLinkMain;

  const isAdminActive = (href: string) => {
    const adminPaths = [
      "/admin-tel-du-monde",
      "/admin-tel-du-monde/clients",
      "/admin-tel-du-monde/produits",
      "/admin-tel-du-monde/commandes",
      "/admin-tel-du-monde/produits/add-model",
      "/admin-tel-du-monde/produits/add-variant",
      "/admin-tel-du-monde/produits/models",
    ];
    return (
      adminPaths.includes(pathname) && href.startsWith("/admin-tel-du-monde")
    );
  };

  // const isConceptActive = pathname === "/concept";
  // const isBoutiqueActive = pathname === "/boutique";

  return (
    <div className="relative">
      <ul
        ref={navRef}
        className="flex justify-center gap-20 pb-2 relative rounded-md"
      >
        {links.map((link, index) => {
          const isActive = pathname === link.href || isAdminActive(link.href);

          return (
            <li
              key={index}
              className={`${
                isActive
                  ? "active z-10 font-font1 text-white font-bold"
                  : "font-thin"
              } text-sm font-font1 pt-1 px-2 tracking-widest hover:text-white/70 transition-all duration-300`}
            >
              <Link href={link.href} onClick={handleLinkClick}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* <div
        className={`h-[1px] rounded-full transition-all ease-in-out duration-300 ${
          isConceptActive
            ? "bg-gradient-to-l from-white to-transparent"
            : isBoutiqueActive
            ? "bg-gradient-to-r from-noir-900 via-white to-transparent"
            : "bg-gradient-to-r from-white to-transparent"
        }`}
      /> */}
      <div
        className="absolute bottom-0 h-10  rounded-t-xl bg-transparent  transition-all duration-300"
        style={indicatorStyle}
      />
    </div>
  );
};
