import {
  ChatCircle,
  CurrencyCircleDollar,
  House,
  UserCircle,
  Wrench,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <section
      className="absolute w-full h-[8%] flex bg-main items-center drop-shadow-navBarShadow 
      justify-between px-10 bottom-0 right-0 text-white"
    >
      {/* <Link href={}>
      
      </Link> */}
      <Wrench weight="fill" size={32} />

      <Link href="/calendario">
        <House size={32} weight="fill" />
        {pathname === "/calendario" && (
          <div className="rounded-sm h-1 w-full bg-green-500 "></div>
        )}
      </Link>

      <Link href="/notificacoes">
        <ChatCircle size={32} weight="fill" />
        {pathname === "/notificacoes" && (
          <div className="rounded-sm h-1 w-full bg-green-500 "></div>
        )}
      </Link>

      <Link href="/baseDeClientes">
        <UserCircle size={32} weight="fill" />
        {pathname === "/baseDeClientes" && (
          <div className="rounded-sm h-1 w-full bg-green-500 "></div>
        )}
      </Link>

      <Link href="/pagamentos-gerais">
        <CurrencyCircleDollar size={32} weight="fill" />
        {pathname === "/pagamentos-gerais" && (
          <div className="rounded-sm h-1 w-full bg-green-500 "></div>
        )}
      </Link>
    </section>
  );
}
