import * as z from "zod";
const passwordValidation = new RegExp(
  "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{\":;'?/<>.,])(?!.*\\s).{6,10}$"
);

export const registerSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "use@ for valid email..." }),

  password: z.string().regex(passwordValidation, {
    message:
      "Password must be 6-10 chars, include uppercase, lowercase, number, special char, and no spaces.",
  }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
