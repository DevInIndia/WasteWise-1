import { z } from "zod";

export const promptSchema = z.object({
  userEmail: z.string().email(),
  prompt: z.string().min(1),
  result: z.string().min(1),
  imageUrl: z.string().optional().or(z.string().startsWith("data:image/")), // Allow base64 images
  createdAt: z.date(),
});
