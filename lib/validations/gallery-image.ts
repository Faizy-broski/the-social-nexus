import { z } from "zod";

export const galleryImageSchema = z.object({
  imagePath: z.string().trim().min(1, "Upload an image."),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export type GalleryImageValues = z.infer<typeof galleryImageSchema>;
