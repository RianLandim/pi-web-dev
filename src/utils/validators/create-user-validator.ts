import { z } from "zod";

const REQUIRED_ERROR_MESSAGE = "Campo obrigatorio";

export const createUserValidator = z.object({
  name: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155),
  email: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .email()
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155),
  password: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .min(8, "Senha deve conter no minimo 8 caracteres")
    .max(155),
});
