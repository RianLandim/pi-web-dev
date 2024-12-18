import { z } from "zod";

const REQUIRED_ERROR_MESSAGE = "Campo obrigatorio";
const MAX_CHAR_ERROR_MESSAGE = "Limite de 155 caracteres atingido";

export const schedulePriority = z.enum(["HIGH", "MEDIUM", "LOW"]);

export const createScheduleValidator = z.object({
  name: z
    .string()
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  customerId: z
    .string()
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  description: z
    .string()
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  scheduledAt: z.date({ required_error: REQUIRED_ERROR_MESSAGE }),
  priority: schedulePriority,
  payment: z.object({
    amount: z.number().min(1, REQUIRED_ERROR_MESSAGE),
    dueAt: z.date({ required_error: REQUIRED_ERROR_MESSAGE }),
  }),
});

export type CreateScheduleValidatorProps = z.infer<
  typeof createScheduleValidator
>;
