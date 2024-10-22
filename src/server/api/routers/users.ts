import { TRPCError } from "@trpc/server";

import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createUserValidator } from "~/utils/validators/create-user-validator";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserValidator)
    .query(async ({ ctx, input: data }) => {
      await ctx.db.user.create({
        data,
      });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();

    return users;
  }),

  listById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input: { id } }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado!",
        });
      }

      return user;
    }),
});
