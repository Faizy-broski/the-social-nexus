import { z } from "zod";

import { phoneRegex } from "@/lib/validations/country-codes";

export { COUNTRY_CODES } from "@/lib/validations/country-codes";

export const YES_NO = ["Yes", "No"] as const;

// URLs are optional on this form, but if a value is entered it must look
// like a real one — an empty string still needs to satisfy `.optional()`,
// so the empty case is short-circuited before the URL check runs.
const optionalUrl = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || /^https?:\/\/.+\..+/i.test(value), {
    message: "Enter a full URL, e.g. https://domain.com/",
  });

export const webBriefFormSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
  countryCode: z.string().min(1, "Select your country code."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(phoneRegex, "Enter a valid phone number."),
  currentWebsiteUrl: optionalUrl,
  currentWebHost: z
    .string()
    .trim()
    .min(1, "Let us know your current web host."),
  domainPurchased: z
    .string()
    .trim()
    .min(1, "Let us know if you've already purchased a domain."),
  providingImages: z.enum([...YES_NO] as const, {
    error: "Let us know if you'll be providing images.",
  }),
  hasContent: z.enum([...YES_NO] as const, {
    error: "Let us know if your content is ready.",
  }),
  companyDescription: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about your company (min 10 characters)."),
  themeFeel: z
    .string()
    .trim()
    .min(10, "Describe the theme/feel you're after (min 10 characters)."),
  colors: z.string().trim().min(1, "Let us know your preferred colors."),
  competitorSites: z
    .string()
    .trim()
    .min(1, "Share at least one site you admire or compete with."),
  additionalInfo: z
    .string()
    .trim()
    .min(1, "Share any additional details, or write \"None\"."),
  pagesNeeded: z
    .string()
    .trim()
    .min(1, "List the pages you'll need for your site."),
  servicesProducts: z
    .string()
    .trim()
    .min(1, "Tell us about your services or products."),
  competitiveAdvantage: z
    .string()
    .trim()
    .min(1, "Tell us what sets you apart from the competition."),
  customerAcquisition: z
    .string()
    .trim()
    .min(1, "Tell us how you currently attract new customers."),
  socialMedia: z.string().trim().optional(),
  // File input value is validated client-side (accept + size) rather than
  // through Zod — z.instanceof(FileList) would reference the `FileList`
  // global at schema-evaluation time, which throws during server-side
  // rendering where no FileList exists.
  attachment: z.any().optional(),
});

export type WebBriefFormValues = z.infer<typeof webBriefFormSchema>;
