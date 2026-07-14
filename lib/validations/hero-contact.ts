import { z } from "zod";

const phoneRegex = /^[0-9()#&+*=.\-\s]{7,20}$/;

export const heroContactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Enter your full name.")
    .max(120, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(phoneRegex, "Only numbers and phone characters (#, -, *, etc) are accepted."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long.")
    .optional()
    .or(z.literal("")),
});

export type HeroContactFormValues = z.infer<typeof heroContactFormSchema>;
