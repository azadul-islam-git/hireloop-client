"use client"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/lib/user-fields"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const handleSignUp = async (formData: {
    name: string
    email: string
    password: string
    role: UserRole
  }) => {
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      callbackURL: "/",
    })
    if (error) {
      console.error("Sign-up failed:", error.message)
      return
    }
    console.log("Sign-up successful:", data)

    if (!error && data) {
      router.push("/")
    }
  }

  return <SignUpForm onSubmit={handleSignUp} />
}
