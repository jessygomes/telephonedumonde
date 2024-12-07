import { auth } from "@/auth";
import Link from "next/link";

import { NavItems } from "./NavItems";
import { NavItemsBis } from "./NavItemsBis";
import Image from "next/image";
import { NavMobile } from "./NavMobile";

export default async function Header() {
  const session = await auth();

  return (
    <header className="wrapper text-white">
      <div className="flex justify-between items-center">
        <Link href={"/"} className="font-font1 text-2xl tracking-widest">
          <Image
            src="/logo/Telephone_du_monde.png"
            alt="Logo"
            width={80}
            height={50}
          />
        </Link>

        <nav className="hidden md:block">
          <NavItems />
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
                    },
                  }
                : null
            }
          />
        </nav>

        <NavMobile
          session={
            session
              ? {
                  ...session,
                  user: {
                    name: session.user?.name ?? "",
                    email: session.user?.email ?? "",
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
