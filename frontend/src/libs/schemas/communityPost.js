import { z } from "zod";
import { promptSchema } from "./promptschema";

export const communityPostSchema = promptSchema.extend({
  originalId: z.string().min(1),
  likes: z.array(z.string()).default([]),
  comments: z.array(z.object({
    userEmail: z.string().email(),
    text: z.string().min(1),
    createdAt: z.date(),
  })).default([]),
});
