import { z } from "zod";

export const addressValidator = z.object({
  zipCode: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  number: z.number(),
});

export const createCustomerValidator = z.object({
  id: z.string(),
  name: z.string(),
  contact: z.string(),
  address: addressValidator,
});
