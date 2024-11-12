"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../../_components/card";
import Link from "next/link";

import { useHookFormMask } from "use-mask-input";
import { Button, Input } from "@mantine/core";

const signInFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  phone: z
    .string({ required_error: "Telefone obrigatório" })
    .min(11, "Telefone obrigatório"),
  email: z.string().min(1, "Email obrigatório").email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type SignInProps = z.infer<typeof signInFormSchema>;

export default function RegisterInCardMobile() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInProps>({
    resolver: zodResolver(signInFormSchema),
  });
  const registerWithMask = useHookFormMask(register);

  function submit(data: SignInProps) {
    console.log(data);
  }

  return (
    <Card otherCSS="space-y-4" onSubmit={handleSubmit(submit)}>
      <div className="flex w-full flex-col items-center justify-center space-y-6">
        <Input
          id="name"
          placeholder={errors.name?.message ?? "Nome"}
          type="text"
          className={`h-10 w-full pl-2 ${
            errors.name ? "placeholder:text-red-500" : "text-black"
          } `}
          {...register("name")}
        />
        <Input
          id="email"
          placeholder={errors.email?.message ?? "E-mail"}
          type="email"
          className={`h-10 w-full pl-2 ${
            errors.email ? "placeholder:text-red-500" : "text-black"
          } `}
          {...register("email")}
        />

        <Input
          id="telefone"
          placeholder={errors.phone?.message ?? "Telefone"}
          type="text"
          className={`h-10 w-full pl-2 ${
            errors.phone ? "placeholder:text-red-500" : "text-black"
          }`}
          {...registerWithMask("phone", ["(99) 9 9999-9999"])}
        />

        <Input
          id="password"
          placeholder={errors.password?.message ?? "Senha"}
          type="password"
          className={`h-10 w-full pl-2 ${
            errors.password ? "placeholder:text-red-500" : "text-black"
          } `}
          {...register("password")}
        />
      </div>

      <div className="flex flex-col space-y-7">
        <Button
          type="submit"
          variant={"default"}
          className="h-8 w-36 bg-whiteApp font-bold text-main"
        >
          CADASTRAR
        </Button>

        <Link
          href="/recovery-password"
          className="mt-4 text-center text-sm underline hover:cursor-pointer"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <div className="flex w-full flex-col items-center justify-center text-sm font-light">
        <p>Ainda não tem um conta?</p>
        <Link href="/sign-up" className="underline hover:cursor-pointer">
          Cadastre-se
        </Link>
      </div>
    </Card>
  );
}
