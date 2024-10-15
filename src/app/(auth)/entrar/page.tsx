import { rem, Stack } from "@mantine/core";
import SingInCardMobile from "./_components/SingInCardMobile";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="bg-main flex h-screen w-full flex-col items-center justify-center p-6">
      <figure>
        <Image src="/logoApp.svg" alt="logo image" width={100} height={100} />
      </figure>

      <Stack gap={rem(10)} bg="white" p={rem(12)} className="w-full rounded-md">
        <h1 className="text-2xl">Bem vindo(a)!</h1>
        <h2 className="text-xs">
          Por favor, insira os dados para fazer login.
        </h2>

        <SingInCardMobile />
      </Stack>
    </main>
  );
}
