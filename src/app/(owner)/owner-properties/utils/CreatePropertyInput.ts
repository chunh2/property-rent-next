import { z } from "zod";

export const CreatePropertySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),

  description: z
    .string()
    .max(65535, "Description cannot exceed 65535 characters")
    .optional(),

  price: z
    .number({
      invalid_type_error: "Price must be a number",
      required_error: "Price is required",
    })
    .min(0.01, "Price must be greater than 0")
    .max(99999999.99, "Price cannot exceed 99 999 999.99")
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
      message: "Price must be at most 2 decimal places",
    }),

  address: z
    .string({ required_error: "Address is required" })
    .min(1, "Address is required")
    .max(255, "Address cannot exceed 255 characters"),

  city: z
    .string({ required_error: "City is required" })
    .min(1, "City is required")
    .max(255, "City cannot exceed 255 characters"),

  bedroom: z
    .number({ required_error: "Number of bedrooms is required" })
    .int("Number of bedrooms must be a whole number")
    .nonnegative("Number of bedrooms cannot be negative number"),

  bathroom: z
    .number({ required_error: "Number of bathrooms is required" })
    .int("Number of bathrooms must be a whole number")
    .nonnegative("Number of bathrooms cannot be negative number"),

  property_type_id: z
    .number({ required_error: "Property type is required" })
    .min(1, "Invalid property type"),

  state_id: z
    .number({ required_error: "State is required" })
    .min(1, "Invalid state"),

  property_images: z
    .custom<File[]>((val) => Array.isArray(val), "Invalid file input")
    .refine((files) => files?.length > 0, "At least 1 image is required")
    .refine((files) => files?.length <= 10, "Up to 10 images only")
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
      "Each file must be less than 2MB"
    )
    .refine(
      (files) => files.every((file) => file.type.startsWith("image/")),
      "Only image files are allowed"
    ),
});

export type CreatePropertyType = z.infer<typeof CreatePropertySchema>;
