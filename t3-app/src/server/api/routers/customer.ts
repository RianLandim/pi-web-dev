import { createCustomerValidator } from "~/utils/validators/create-customer-validator";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const customerRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCustomerValidator)
    .mutation(async ({ ctx, input: { address, ...customer } }) => {
      await ctx.db.$transaction(async (tx) => {
        const prismaAddress = await tx.address.create({
          data: address,
        });

        await tx.customer.create({
          data: {
            ...customer,
            addressId: prismaAddress.id,
          },
        });
      });
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const customers = await ctx.db.customer.findMany({
      include: {
        address: true,
        _count: {
          select: {
            services: true,
            Machine: true,
          },
        },
      },
    });

    return customers;
  }),

  listById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input: { id } }) => {
      const customer = await ctx.db.customer.findUnique({
        where: {
          id,
        },
      });

      if (!customer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cliente não encontrado",
        });
      }

      return customer;
    }),
});
