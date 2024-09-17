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
      {/* <Link href={}></Link> */}
      <Wrench weight="fill" size={32} />

      <Link href="/payments">
        <CurrencyCircleDollar size={32} weight="fill" />
      </Link>

      <Link href="/calendar">
        <House size={32} weight="fill" />
      </Link>

      <Link href="/calendar">
        <ChatCircle size={32} weight="fill" />
      </Link>

      <Link href="/clientdatabase">
        <UserCircle size={32} weight="fill" />
      </Link>
    </section>
  );
}
