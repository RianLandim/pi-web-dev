import { createPaymentValidator } from "~/utils/validators/create-payment.validator";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const paymentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPaymentValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.payment.create({
        data: input,
      });
    }),

  list: publicProcedure
    .input(z.object({ customerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const payments = await ctx.db.payment.findMany({
        where: {
          checkout: {
            Service: {
              customerId: input.customerId,
            },
          },
        },
        include: {
          checkout: {
            include: {
              Service: true,
            },
          },
        },
      });

      return payments;
    }),

  update: protectedProcedure
    .input(
      createPaymentValidator.partial().and(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...payment } = input;

      await ctx.db.payment.update({
        where: {
          id,
        },
        data: payment,
      });
    }),
});
