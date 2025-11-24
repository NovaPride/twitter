import { z } from "zod";

export const schema = z.object({
  image: z.custom<File>(),
});
