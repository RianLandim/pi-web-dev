import { PartType } from "@prisma/client";
import { z } from "zod";

const REQUIRED_ERROR_MESSAGE = "Campo obrigatorio";
const MAX_CHAR_ERROR_MESSAGE = "Limite de 155 caracteres atingido";

export const createMachineValidator = z.object({
  name: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  type: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  description: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE)
    .optional(),
  problem: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  partType: z.nativeEnum(PartType),
  customerId: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
});
