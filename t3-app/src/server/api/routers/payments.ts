import { createPaymentValidator } from "~/utils/validators/create-payment.validator";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const paymentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPaymentValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.payment.create({
        data: input,
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const payments = await ctx.db.payment.findMany();

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
