import { auth } from "@/auth";
import Link from "next/link";

import { NavItems } from "./NavItems";
import { NavItemsBis } from "./NavItemsBis";

export default async function Header() {
  const session = await auth();

  return (
    <header className="wrapper text-white">
      <div className="flex justify-between items-center">
        <Link href={"/"} className="font-font1 text-2xl tracking-widest">
          TEL DU MONDE
        </Link>

        <nav className="">
          <NavItems />
        </nav>

        <nav className="flex items-center">
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
      </div>
    </header>
  );
}
