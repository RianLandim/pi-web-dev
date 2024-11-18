import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createScheduleValidator } from "~/utils/validators/create-schedule-validator";

export const serviceRouter = createTRPCRouter({
  create: publicProcedure
    .input(createScheduleValidator)
    .mutation(async ({ ctx, input }) => {
      const { payment, ...data } = input;

      await ctx.db.$transaction(async (tx) => {
        const checkout = await tx.checkout.create({
          data: {
            status: "OPEN",
          },
        });

        await tx.payment.create({
          data: {
            dueAt: payment.dueAt,
            value: payment.amount,
            checkoutId: checkout.id,
          },
        });

        await tx.service.create({
          data: {
            checkoutId: checkout.id,
            ...data,
          },
        });
      });
    }),

  list: publicProcedure.query(async ({ ctx }) => {
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
