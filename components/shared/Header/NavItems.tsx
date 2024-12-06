"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { headerLinkMain } from "@/lib/constant";

interface NavItemsProps {
  onLinkClick?: () => void;
}

export const NavItems = ({ onLinkClick }: NavItemsProps) => {
  const pathname = usePathname();
  // const [activeLink, setActiveLink] = useState<string | null>(null);
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

  return (
    <div className="relative">
      <ul ref={navRef} className="flex justify-center gap-20 pb-1 relative">
        {headerLinkMain.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <li
              key={index}
              className={`${
                isActive ? "active z-10 font-font1 gradient-text" : ""
              } text-base font-font1 pt-1 px-2 tracking-widest transition-all duration-300`}
            >
              <Link href={link.href} onClick={handleLinkClick}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="h-[1px] neon-bg bg-white rounded-full" />
      <div
        className="absolute bottom-0 h-8 neon-bg rounded-t-md bg-white transition-all duration-300"
        style={indicatorStyle}
      />
    </div>
  );
};
