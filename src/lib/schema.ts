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