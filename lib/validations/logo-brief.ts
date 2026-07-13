import { z } from "zod";

import { phoneRegex } from "@/lib/validations/country-codes";

export { COUNTRY_CODES } from "@/lib/validations/country-codes";

export const logoBriefFormSchema = z.object({
  contactName: z
    .string()
    .trim()
    .min(1, "Enter the contact person's name.")
    .max(120, "Name is too long."),
  contactEmail: z
    .string()
    .trim()
    .min(1, "Enter a contact email address.")
    .email("Enter a valid email address."),
  countryCode: z.string().min(1, "Select your country code."),
  contactPhone: z
    .string()
    .trim()
    .min(1, "Enter a contact phone number.")
    .regex(phoneRegex, "Enter a valid phone number."),
  logoName: z
    .string()
    .trim()
    .min(1, "Enter the name your logo should feature."),
  companySlogan: z.string().trim().optional(),
  competitorsReference: z.string().trim().optional(),
  businessDescription: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about your business (min 10 characters)."),
  logoRequirements: z.string().trim().optional(),
  primaryColor: z.string().trim().optional(),
  secondaryColor: z.string().trim().optional(),
  // File input value is validated client-side (accept + size) rather than
  // through Zod — see lib/validations/web-brief.ts for why.
  attachment: z.any().optional(),
});

export type LogoBriefFormValues = z.infer<typeof logoBriefFormSchema>;
