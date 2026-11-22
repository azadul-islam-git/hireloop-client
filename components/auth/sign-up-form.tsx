"use client"

import * as React from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface SignUpFormProps {
  onSubmit: (formData: {
    name: string
    email: string
    password: string
  }) => Promise<void>
}

function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    ) as {
      name: string
      email: string
      password: string
    }
    console.log("sign-up form data:", data)

    setIsLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/70 shadow-2xl ring-border/60 backdrop-blur-xl [--card-spacing:1.5rem]">
      <CardHeader className="justify-items-center text-center">
        <Logo className="mb-3" />
        <CardTitle className="text-xl sm:text-2xl">
          Create your account
        </CardTitle>
        <CardDescription>
          Start applying to jobs in minutes — it&apos;s free
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="signup-name"
              className="text-sm font-medium text-foreground"
            >
              Full name
            </label>
            <div className="relative">
              <UserIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="signup-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Doe"
                className="h-11 rounded-xl pr-3 pl-9"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <div className="relative">
              <MailIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="signup-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 rounded-xl pr-3 pl-9"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <LockIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="h-11 rounded-xl pr-11 pl-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use 8 or more characters with a mix of letters, numbers and
              symbols.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-xl bg-brand text-base text-brand-foreground hover:bg-brand/90"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-brand-accent transition-colors hover:text-brand"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export { SignUpForm }
