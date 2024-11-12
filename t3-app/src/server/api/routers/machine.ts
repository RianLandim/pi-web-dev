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

  list: publicProcedure.query(async ({ ctx }) => {
    const machines = await ctx.db.machine.findMany();

    return machines;
  }),
});
