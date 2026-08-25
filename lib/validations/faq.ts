import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().trim().min(1, "Enter a question.").max(300, "Question is too long."),
  answer: z.string().trim().min(1, "Enter an answer.").max(4000, "Answer is too long."),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export type FaqValues = z.infer<typeof faqSchema>;
