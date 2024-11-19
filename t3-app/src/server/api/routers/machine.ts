import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createMachineValidator } from "~/utils/validators/create-machine-validator";

export const machineRouter = createTRPCRouter({
  create: publicProcedure
    .input(createMachineValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.machine.create({
        data: {
          ...input,
        },
      });
    }),

  list: publicProcedure
    .input(
      z
        .object({
          customerId: z.string().optional(),
          name: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const machines = await ctx.db.machine.findMany({
        include: {
          Customer: true,
        },
        where: {
          customerId: input?.customerId,
          name: { contains: input?.name },
        },
      });

      return machines;
    }),
});
