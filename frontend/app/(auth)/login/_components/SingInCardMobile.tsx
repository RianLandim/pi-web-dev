"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../../_components/card";
import Link from "next/link";
import { Input } from "../../../../package/ui/src/input";
import { Button } from "../../../../package/ui/src/button";

const signInFormSchema = z.object({
  email: z.string().min(1, "Email obrigatório").email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type SignInProps = z.infer<typeof signInFormSchema>;

export default function SignInCardMobile() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInProps>({
    resolver: zodResolver(signInFormSchema),
  });

  function submit(data: SignInProps) {
    console.log(data);
  }

  return (
    <Card otherCSS="space-y-4" onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col space-y-5 justify-center items-center">
        <Input
          id="email"
          placeholder={(errors.email && errors.email.message) || "E-mail"}
          type="email"
          className={`pl-2 ${
            errors.email ? "placeholder:text-red-500" : "text-black"
          }  `}
          {...register("email")}
        />

        <Input
          id="password"
          placeholder={(errors.password && errors.password.message) || "Senha"}
          type="password"
          className={`pl-2 w-11/12 ${
            errors.email ? "placeholder:text-red-500" : "text-black"
          }  `}
          {...register("password")}
        />
      </div>

      <div className="flex flex-col space-y-7">
        <Button type="submit" variant={"default"} className="bg-whiteApp text-main h-8 w-36">
          Entrar
        </Button>

        <Link
          href="/recovery-password"
          className="mt-4 text-sm text-center hover:cursor-pointer underline"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <div className="text-sm font-light flex flex-col justify-center items-center w-full">
        <p>Ainda não tem um conta?</p>
        <Link href="/sign-up" className="hover:cursor-pointer underline">
          Cadastre-se
        </Link>
      </div>
    </Card>
  );
}
``;
