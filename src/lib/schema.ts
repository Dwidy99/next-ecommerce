import { z } from "zod";

export const schemaSignIn = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password must have at least 5 characters" }),
});

export const schemaCategory = z.object({
  name: z
    .coerce.string()
    .refine(val => val.trim().length > 0, { message: "Name is required" })
    .min(4, { message: "Name should have at least 4 characters" }),
});