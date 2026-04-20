import { z } from "zod"

export const locationSchema = z.object({
  name: z
    .coerce.string()
    .refine((value) => value.trim().length > 0, {
      message: "Name is required",
    })
    .min(4, { message: "Name should have at least 4 characters" }),
})
