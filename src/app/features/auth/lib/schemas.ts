import { z } from "zod";

export const loginFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof loginFormSchema>;
