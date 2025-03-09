import { z } from "zod";

export const promptSchema = z.object({
  userEmail: z.string().email(),
  userName: z.string().optional(),
  userImage: z.string().optional(),
  prompt: z.string().min(1),
  result: z.string().min(1),
  imageUrl: z.string().optional().or(z.string().startsWith("data:image/")),
  createdAt: z.date(),
});
