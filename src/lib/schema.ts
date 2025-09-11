import { Files } from "lucide-react";
import { refine, z } from "zod";

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
    .min(4, { message: "Name must have at least 4 characters" }),

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
    
    images_id: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Please upload 3 image product",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type)
        })

        return validate;
      },
      {
        message: "Upload file should image"
      }
    )
});