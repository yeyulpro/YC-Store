import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "use@ for valid email..." }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
