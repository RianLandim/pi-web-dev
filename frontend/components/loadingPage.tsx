import { CircleNotch } from "@phosphor-icons/react";
import NavBar from "../app/components/navBar";

export default function LoadingPage() {
  return (
    <main className="bg-main h-screen w-full pt-16 relative text-whiteApp">
      <article className="h-[92%] w-full space-y-24 px-6 flex flex-col pb-6 items-center">
        <div className="flex justify-between w-full items-center">
          {/*  I want to write the name of the cliente below */}
          <h1 className="text-xl">Carregando...</h1>
        </div>
        <div className="">
          <CircleNotch size={60} className="animate-spin" />
        </div>
      </article>
      <NavBar />
    </main>
  );
}
