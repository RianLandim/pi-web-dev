import { z } from "zod";

const REQUIRED_ERROR_MESSAGE = "Campo Obrigatorio";
const MAX_CHAR_ERROR_MESSAGE = "Maximo de 155 caracteres atingido";

export const createServiceValidator = z.object({
  status: z.enum(["OPEN", "PROGRESS", "CANCELLED", "FINISHED"]),
  scheduledAt: z.date(),
  customerId: z
    .string()
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  checkoutId: z
    .string()
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
});
