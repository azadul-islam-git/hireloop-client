"use client"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient, useSession } from "@/lib/auth-client"
import { syncSessionTo } from "@/lib/session-sync"
import type { UserRole } from "@/lib/user-fields"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const { refetch } = useSession()
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
      // Email sign-up returns the created user below; the callback only
      // applies to OAuth flows, which don't pick a role yet.
      callbackURL: "/",
    })
    if (error) {
      console.error("Sign-up failed:", error.message)
      return
    }

    if (data) {
      // Wait until the store really holds the new account before navigating,
      // so the dashboard guard never decides on an empty/stale session.
      await syncSessionTo(data.user?.email, refetch)

      // Land on the dashboard for the role picked during sign-up.
      router.push("/")
      router.refresh()
    }
  }

  return <SignUpForm onSubmit={handleSignUp} />
}
