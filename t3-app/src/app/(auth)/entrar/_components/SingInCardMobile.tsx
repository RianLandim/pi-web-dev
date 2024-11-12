"use client";

import { z } from "zod";

import Link from "next/link";
import { useForm, zodResolver } from "@mantine/form";
import { Button, TextInput, PasswordInput, Stack, rem } from "@mantine/core";
import { signIn } from "next-auth/react";

const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email obrigatório" })
    .min(1, "Email obrigatório")
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Senha obrigatória" })
    .min(1, "Senha obrigatória"),
});

type SignInProps = z.infer<typeof signInFormSchema>;

export default function SignInCardMobile() {
  const form = useForm<SignInProps>({
    validate: zodResolver(signInFormSchema),
  });

  const submit = (data: SignInProps) => {
    void signIn("credentials", undefined, data);
  };

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4"
      onSubmit={form.onSubmit(submit)}
    >
      <Stack w="100%" p={rem(4)}>
        <TextInput
          withAsterisk
          label="E-mail"
          placeholder="johndoe@gmail.com"
          key={form.key("email")}
          size="lg"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Senha"
          placeholder="********"
          size="lg"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
      </Stack>

      <Button w="100%" size="lg" type="submit">
        Entrar
      </Button>

      <Link
        href="/recovery-password"
        className="mt-4 text-center text-sm underline hover:cursor-pointer"
      >
        Esqueceu a senha?
      </Link>

      <div className="flex w-full flex-col items-center justify-center text-sm font-light">
        <p>Ainda não tem um conta?</p>
        <Link href="/sign-up" className="underline hover:cursor-pointer">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
