"use client"

import { SignInForm } from "@/components/auth/sign-in-form"
import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
  const handleSignIn = async (data: { email: string; password: string }) => {
    const { data: signInData, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    })
    if (error) {
      console.error("Sign-in failed:", error.message)
      return
    }

    console.log("Sign-in successful:", signInData)
  }

  return <SignInForm onSubmit={handleSignIn} />
}
