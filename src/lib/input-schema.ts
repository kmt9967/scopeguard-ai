import { z } from "zod";

export const MAX_SOURCE_CHARACTERS = 80_000;
export const MAX_TOTAL_CHARACTERS = 250_000;

export const projectInputSchema = z.object({
  projectName: z.string().trim().min(1).max(160),
  clientName: z.string().trim().min(1).max(160),
  originalScope: z.string().trim().min(1).max(MAX_SOURCE_CHARACTERS),
  notes: z.string().max(MAX_SOURCE_CHARACTERS),
  sources: z.array(z.object({
    id: z.string().regex(/^SRC-\d{2,}$/),
    title: z.string().trim().min(1).max(240),
    type: z.enum(["Brief", "Meeting notes", "Email", "Chat", "Task", "Change request", "Other"]),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    content: z.string().trim().min(1).max(MAX_SOURCE_CHARACTERS),
  })).min(1).max(30),
}).superRefine((input, context) => {
  const ids = input.sources.map((source) => source.id);
  if (new Set(ids).size !== ids.length) context.addIssue({ code: "custom", path: ["sources"], message: "Source IDs must be unique." });
  const total = input.originalScope.length + input.notes.length + input.sources.reduce((sum, source) => sum + source.content.length, 0);
  if (total > MAX_TOTAL_CHARACTERS) context.addIssue({ code: "custom", path: ["sources"], message: "Combined source material is too large." });
});
