import { House, UserCircle, Wrench } from "@phosphor-icons/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <section className="absolute bottom-0 right-0 flex h-[8%] w-full items-center justify-between bg-main px-4 text-white drop-shadow-navBarShadow">
      <Link href="/calendario">
        <House size={32} weight="fill" />
      </Link>

      <Link href="/clientes">
        <UserCircle size={32} weight="fill" />
      </Link>

      <Link href="/maquinas">
        <Wrench weight="fill" size={32} />
      </Link>
      {/* 
      <Link href="/calendario">
        <Bell size={32} weight="fill" />
      </Link> */}
    </section>
  );
}
