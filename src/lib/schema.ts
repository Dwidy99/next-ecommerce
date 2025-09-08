import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

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

export const schemaLocation = z.object({
  name: z
    .coerce.string()
    .refine(val => val.trim().length > 0, { message: "Name is required" })
    .min(4, { message: "Name should have at least 4 characters" }),
});

export const schemaBrand = schemaCategory.extend({
  image: z
    .instanceof(File)
    .refine(file => file?.name?.trim().length > 0, {
      message: "Image is required",
    })
    .refine(file => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File type is not valid",
    }),
});
