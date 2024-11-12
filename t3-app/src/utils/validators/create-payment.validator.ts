import { z } from "zod";

export const createPaymentValidator = z.object({
  id: z.string(),
  checkoutId: z.string(),
  value: z.number(),
  dueAt: z.date(),
});

export type createPaymentValidorProps = z.infer<typeof createPaymentValidator>;
