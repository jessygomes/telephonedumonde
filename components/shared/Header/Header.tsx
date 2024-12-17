import { auth } from "@/auth";
import Link from "next/link";

import { NavItems } from "./NavItems";
import { NavItemsBis } from "./NavItemsBis";
import Image from "next/image";
import { NavMobile } from "./NavMobile";

export default async function Header() {
  const session = await auth();

  return (
    <header className="px-8 lg:px-16 text-white sticky top-0 z-50 bg-noir-900 overflow-hidden">
      <div className="flex justify-between items-center">
        <Link href={"/"} className="">
          <Image
            src="/logo/Telephone_du_monde.png"
            alt="Logo"
            width={80}
            height={50}
          />
        </Link>

        <div className="flex sm:gap-10 lg:gap-20">
          <nav className="hidden md:block">
            <NavItems
              session={
                session
                  ? {
                      ...session,
                      user: {
                        name: session.user?.name ?? "",
                        email: session.user?.email ?? "",
                        role: session.user?.role ?? "",
                      },
                    }
                  : null
              }
            />
          </nav>

          <nav className="hidden md:flex items-center">
            <NavItemsBis
              session={
                session
                  ? {
                      ...session,
                      user: {
                        name: session.user?.name ?? "",
                        email: session.user?.email ?? "",
                        role: session.user?.role ?? "",
                      },
                    }
                  : null
              }
            />
          </nav>
        </div>

        <NavMobile
          session={
            session
              ? {
                  ...session,
                  user: {
                    name: session.user?.name ?? "",
                    email: session.user?.email ?? "",
                    role: session.user?.role ?? "",
                  },
                }
              : null
          }
        />

        {/* <div className="md:hidden">
          <MdOutlineShoppingCart size={30} className="cursor-pointer" />
        </div> */}
      </div>
    </header>
  );
}
