import { Files } from "lucide-react";
import { refine, z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
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


export const schemaProduct = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(4, { message: "Name must have at least 4 characters" })
    .max(255),

  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(4, { message: "Description must have at least 5 characters" }),

  price: z
    .string()
    .min(1, { message: "Price is required" }),

  stock: z
    .string()
    .min(1, { message: "Stock is required" }),

  brand_id: z
    .string()
    .min(1, { message: "Brand is required" }),

  category_id: z
    .string()
    .min(1, { message: "Category is required" }),

  location_id: z
    .string()
    .min(1, { message: "Location is required" }),

  images: z
    .array(z.instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File is too large",
      })
      .refine((file) => ALLOW_MIME_TYPES.includes(file.type), {
        message: "Invalid file type",
      })
    )
    .refine((files) => {
      if (files.length === 0) return true;
      return files.length === 3;
    }, {
      message: "Please upload exactly 3 images",
    })
    .refine((files) => {
      if (files.length === 0) return true;
      return files.every((file) => ALLOW_MIME_TYPES.includes(file.type));
    }, {
      message: "All files must be valid image types (jpg, jpeg, png)",
    })
    .refine((files) => {
      if (files.length === 0) return true;
      return files.every((file) => file.size <= MAX_FILE_SIZE);
    }, {
      message: `Each image must be less than ${MAX_FILE_SIZE / 1024} KB`,
    }),
});


export const schemaProductEdit = schemaProduct.extend({
  id: z.number().min(1, { message: "Product ID is required" }),
}).omit({ images: true });
