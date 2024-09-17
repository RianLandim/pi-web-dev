import { z } from "zod";

export const userValidator = z.object({
  // id: z.string(),
  email: z.string().email(),
  password: z.string(),
});


export type UserValidator = z.infer<typeof userValidator>