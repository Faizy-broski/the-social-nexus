import { z } from "zod";

// Accepts youtube.com / youtu.be links with or without a protocol, e.g.
// "youtube.com/@handle" or "https://www.youtube.com/channel/UC...".
const youtubeUrlRegex =
  /^(https?:\/\/)?((www|m)\.)?(youtube\.com|youtu\.be)\/\S+$/i;

export const youtubeAuditSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
  channelUrl: z
    .string()
    .trim()
    .min(1, "Enter your YouTube channel link.")
    .max(300, "Link is too long.")
    .regex(youtubeUrlRegex, "Enter a valid YouTube channel link."),
  challenge: z
    .string()
    .trim()
    .max(2000, "Message is too long.")
    .optional()
    .or(z.literal("")),
});

export type YoutubeAuditValues = z.infer<typeof youtubeAuditSchema>;
