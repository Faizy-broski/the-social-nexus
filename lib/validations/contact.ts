import { z } from "zod";

export const REGIONS = [
  "Middle East & North Africa",
  "USA",
  "Canada",
  "Kingdom of Saudi Arabia",
  "Australia & New Zealand",
  "Asia",
  "Europe",
  "Rest of World",
] as const;

export const SERVICES = [
  "Remote IT Resources",
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "AI Bots (Automations, Voicebots)",
  "SEO",
  "Digital Marketing",
  "AI Development",
  "Other IT Services",
] as const;

// Basic phone check: digits plus common phone punctuation, 7-20 chars long.
const phoneRegex = /^[0-9()#&+*=.\-\s]{7,20}$/;

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Enter your first name.")
    .max(60, "First name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Enter your last name.")
    .max(60, "Last name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(phoneRegex, "Only numbers and phone characters (#, -, *, etc) are accepted."),
  companyName: z
    .string()
    .trim()
    .min(1, "Enter your company name.")
    .max(120, "Company name is too long."),
  companyUrl: z
    .string()
    .trim()
    .min(1, "Enter your company URL.")
    .max(200, "URL is too long."),
  region: z.enum([...REGIONS] as const, { error: "Select a region." }),
  service: z.enum([...SERVICES] as const, { error: "Select the service you're looking for." }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about your project (min 10 characters).")
    .max(2000, "Project details are too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;