import {
  ChatCircle,
  CurrencyCircleDollar,
  House,
  UserCircle,
  Wrench,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <section
      className="absolute w-full h-[8%] flex bg-main items-center
               drop-shadow-navBarShadow justify-between px-4 bottom-0 right-0"
    >
      <Wrench weight="fill" size={32} />

      <Link href="/pagamentos">
        <CurrencyCircleDollar size={32} weight="fill" />
      </Link>

      <Link href="/calendario">
        <House size={32} weight="fill" />
      </Link>

      <Link href="/calendario">
        <ChatCircle size={32} weight="fill" />
      </Link>

      <Link href="/clientes">
        <UserCircle size={32} weight="fill" />
      </Link>
    </section>
  );
}
