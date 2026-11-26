"use client"

import { SignInForm } from "@/components/auth/sign-in-form"
import { authClient, useSession } from "@/lib/auth-client"
import { syncSessionTo } from "@/lib/session-sync"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const { refetch } = useSession()

  const handleSignIn = async (data: { email: string; password: string }) => {
    const { data: signInData, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      // No `callbackURL` on purpose: with one, better-auth answers
      // `redirect: true` and its client plugin hard-navigates to that URL,
      // which would bypass the role-based redirect below.
    })
    if (error) {
      console.error("Sign-in failed:", error.message)
      return
    }

    // `signIn.email` does not write to the session store, and better-auth's
    // own post-sign-in fetch can cancel ours — wait until the store really
    // holds this account before navigating, so the dashboard guard never
    // decides on the previous account's session.
    await syncSessionTo(signInData?.user?.email, refetch)

    router.push("/")
    router.refresh()
  }

  return <SignInForm onSubmit={handleSignIn} />
}
