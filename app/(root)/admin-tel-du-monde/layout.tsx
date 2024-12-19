import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="">
        <h1 className="wrapper text-white font-font1 tracking-widest text-xl">
          ADMINISTRATION DU SITE
        </h1>

        <div className="bg-gradient-to-r from-noir-800 to-noir-900">
          <ul className="flex justify-around p-2 text-white font-font1 uppercase tracking-widest">
            <li>
              <Link href="/admin-tel-du-monde">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin-tel-du-monde/produits">Produits</Link>
            </li>
            <li>
              <Link href="/admin-tel-du-monde/commandes">Commandes</Link>
            </li>
            <li>
              <Link href="/admin-tel-du-monde/clients">Clients</Link>
            </li>
          </ul>
        </div>
      </section>
      {children}
    </>
  );
}
