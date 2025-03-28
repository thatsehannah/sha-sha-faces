import { z } from "zod";
import { FormNewService } from "./types";

export const newServiceSchema = z.object({
  name: z
    .string()
    .max(50, {
      message: "Service name is too long, should be less than 50 characters",
    })
    .nonempty("Service name is required"),
  price: z
    .string()
    .max(5)
    .nonempty("Must provide your price for this service")
    .refine(
      (value) => {
        const price = parseInt(value);
        return typeof price === "number";
      },
      { message: "Price must be a valid number" }
    ),
  durationHours: z
    .string()
    .max(2)
    .nonempty("Must provide an hour")
    .refine(
      (value) => {
        const hour = parseInt(value);
        return typeof hour === "number";
      },
      { message: "Hour must be a valid number" }
    ),
  durationMinutes: z
    .string()
    .max(2)
    .nonempty("Put 0 if no minute duration is required")
    .refine(
      (value) => {
        if (value) {
          const minutes = parseInt(value);
          return typeof minutes === "number";
        }
      },
      { message: "Minute(s) must be a valid number" }
    ),
  description: z.string().nonempty("Description is required"),
});

export const validateNewServiceSchema = (data: FormNewService) => {
  const result = newServiceSchema.safeParse(data);

  if (!result.success) {
    throw new Error(
      "Please fix the above errors before creating a new appointment."
    );
  }

  return result.data;
};
