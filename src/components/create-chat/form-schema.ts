import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(30, "Maximum 30 characters"),
  image: z.custom<File>(),
});
