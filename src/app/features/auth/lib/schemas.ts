import { z } from "zod";

export const loginFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  email: z.string().email(),
});

export type User = z.infer<typeof loginFormSchema>;
