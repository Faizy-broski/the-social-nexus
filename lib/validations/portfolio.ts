import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const portfolioItemSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Enter a slug.")
    .regex(slugRegex, "Use lowercase letters, numbers and hyphens only."),
  title: z.string().trim().min(1, "Enter a title.").max(160, "Title is too long."),
  categories: z.array(z.string().trim().min(1)).min(1, "Add at least one category."),
  stack: z.array(z.string().trim().min(1)),
  previewHref: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^https?:\/\//.test(v), "Enter a valid URL starting with http:// or https://"),
  imagePath: z.string().trim().min(1, "Upload an image."),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export type PortfolioItemValues = z.infer<typeof portfolioItemSchema>;
