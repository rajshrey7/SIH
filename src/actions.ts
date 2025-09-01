"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export async function registerUser(values: z.infer<typeof signupSchema>) {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data provided." };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "Account created successfully. You can now sign in." };
  } catch (error) {
    console.error("REGISTRATION ACTION ERROR:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}