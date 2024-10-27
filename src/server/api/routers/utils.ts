import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const utilsRouter = createTRPCRouter({
  fetchCep: publicProcedure
    .input(
      z.object({
        cep: z.string().min(8, "Cep deve conter 8 caracteres"),
      }),
    )
    .mutation(async ({ input: { cep } }) => {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const responseJSON = (await response.json()) as unknown;

      if (!response.ok) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: JSON.stringify(responseJSON),
          message: "Ocorreu um erro ao buscar CEP",
        });
      }

      const parsedResponse = z
        .object({
          cep: z.string(),
          logradouro: z.string(),
          complemento: z.string(),
          unidade: z.string(),
          bairro: z.string(),
          localidade: z.string(),
          uf: z.string(),
          estado: z.string(),
          regiao: z.string(),
          ibge: z.string(),
          gia: z.string(),
          ddd: z.string(),
          siafi: z.string(),
        })
        .safeParse(responseJSON);

      if (!parsedResponse.success) {
        throw new TRPCError({
          code: "PARSE_ERROR",
          cause: parsedResponse.error.flatten().fieldErrors,
          message: "Ocorre um erro ao buscar CEP",
        });
      }

      return parsedResponse.data;
    }),
});
