import { createServiceValidator } from "~/utils/validators/create-service-validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const serviceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createServiceValidator)
    .mutation(async ({ ctx, input: data }) => {
      await ctx.db.service.create({
        data,
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const services = await ctx.db.service.findMany();

    return services;
  }),

  listById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input: { id } }) => {
      const service = await ctx.db.service.findUnique({
        where: {
          id,
        },
      });

      if (!service) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Serviço não encontrado",
        });
      }

      return service;
    }),
});
