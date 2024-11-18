import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createScheduleValidator } from "~/utils/validators/create-schedule-validator";

export const serviceRouter = createTRPCRouter({
  create: publicProcedure
    .input(createScheduleValidator)
    .mutation(async ({ ctx, input: data }) => {
      await ctx.db.$transaction(async (tx) => {
        const checkout = await tx.checkout.create({
          data: {
            status: "OPEN",
          },
        });

        console.log({ checkout });

        await tx.service.create({
          data: {
            checkoutId: checkout.id,
            priority: data.priority,
            scheduledAt: data.scheduledAt,
            customerId: data.customerId,
          },
        });
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
