"use client"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  const handleSignUp = async (formData: {
    name: string
    email: string
    password: string
  }) => {
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    })
    if (error) {
      console.error("Sign-up failed:", error.message)
    }

    console.log("Sign-up successful:", data)
  }

  return <SignUpForm onSubmit={handleSignUp} />
}
