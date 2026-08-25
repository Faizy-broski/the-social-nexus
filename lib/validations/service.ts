import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const headingPartsSchema = z.object({
  before: z.string().trim().min(1),
  highlight: z.string().trim().optional(),
  after: z.string().trim().optional(),
});

export const serviceFeatureSchema = z.object({
  id: z.string().uuid().optional(),
  icon: z.string().trim().min(1, "Pick an icon."),
  title: z.string().trim().min(1, "Enter a feature title."),
  description: z.string().trim().min(1, "Enter a feature description."),
  sortOrder: z.number().int(),
});

export const serviceSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Enter a slug.")
    .regex(slugRegex, "Use lowercase letters, numbers and hyphens only."),
  number: z.string().trim().min(1, "Enter a display number (e.g. 01)."),
  title: z.array(z.string().trim().min(1)).min(1, "Add at least one title line."),
  heroDescription: z.string().trim().min(1, "Enter a hero description."),
  imagePath: z.string().trim().min(1, "Upload an image."),
  overviewFocus: z.string().trim().min(1, "Enter an overview focus phrase."),
  overviewTeam: z.string().trim().min(1, "Enter an overview team phrase."),
  overviewHeading: headingPartsSchema.optional(),
  overviewParagraph: z.string().trim().optional(),
  cardsHeading: headingPartsSchema.optional(),
  sortOrder: z.number().int(),
  published: z.boolean(),
  features: z.array(serviceFeatureSchema),
});

export type ServiceValues = z.infer<typeof serviceSchema>;
export type ServiceFeatureValues = z.infer<typeof serviceFeatureSchema>;
export type HeadingParts = z.infer<typeof headingPartsSchema>;
