"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { registerUser } from "@/actions"; // Path to your actions.ts file

// 1. Define the validation schema. This MUST match the schema in your server action.
const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// Infer the TypeScript type from the schema
type SignupFormValues = z.infer<typeof SignupSchema>;

export default function SignUpPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. This function is called when the react-hook-form validation passes.
  const onSubmit = (values: SignupFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // 3. The Server Action is called here with the validated 'values' object.
      registerUser(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);
          form.reset(); // Clear the form on success
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        
        {/* 4. The form uses the handleSubmit function from react-hook-form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Display general form error or success message */}
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-md"><p>{error}</p></div>}
          {success && <div className="p-3 bg-green-100 text-green-700 rounded-md"><p>{success}</p></div>}

          {/* Form Inputs with react-hook-form registration */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input id="name" {...form.register("name")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            {form.formState.errors.name && <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" {...form.register("email")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            {form.formState.errors.email && <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" {...form.register("password")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            {form.formState.errors.password && <p className="mt-1 text-sm text-red-500">{form.formState.errors.password.message}</p>}
          </div>
          
          <button type="submit" disabled={isPending} className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:bg-gray-400">
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-medium text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}