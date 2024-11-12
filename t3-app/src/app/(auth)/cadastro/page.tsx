import RegisterInCardMobile from "./_components/RegisterInCardMobile";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="bg-main flex justify-center flex-col items-center w-full h-screen">
      <figure>
        <Image src="/logoApp.svg" alt="logo image" width={100} height={100} />
      </figure>

      <section className="px-6 flex-col space-y-5 items-center justify-center text-center">
        <div>
          <h1 className="text-2xl ">Bem vindo(a)!</h1>
          <h2 className="text-sm text-pretty px-3">
            Por favor, insira os dados para fazer cadastro.
          </h2>
        </div>

        <RegisterInCardMobile />
      </section>
    </main>
  );
}
