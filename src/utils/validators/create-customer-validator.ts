import { z } from "zod";

const REQUIRED_ERROR_MESSAGE = "Campo obrigatorio";
const MAX_CHAR_ERROR_MESSAGE = "Limite de 155 caracteres atingido";

export const addressValidator = z.object({
  zipCode: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  street: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  neighborhood: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  city: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  state: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  number: z.number({ required_error: REQUIRED_ERROR_MESSAGE }),
});

export const createCustomerValidator = z.object({
  name: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  contact: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  email: z
    .string({ required_error: REQUIRED_ERROR_MESSAGE })
    .email("Digite um e-mail valido")
    .min(1, REQUIRED_ERROR_MESSAGE)
    .max(155, MAX_CHAR_ERROR_MESSAGE),
  address: addressValidator,
});

export type CreateCustomerValidatorProps = z.infer<
  typeof createCustomerValidator
>;
