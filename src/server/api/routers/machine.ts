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
});
