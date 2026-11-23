"use client"

import * as React from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"

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

interface SignInFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void>
}

function SignInForm({ onSubmit }: SignInFormProps): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }

    try {
      setIsLoading(true)
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/70 shadow-2xl ring-border/60 backdrop-blur-xl [--card-spacing:1.5rem]">
      <CardHeader className="justify-items-center text-center">
        <Logo className="mb-3" />
        <CardTitle className="text-xl sm:text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to continue to your HireLoop dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="signin-email"
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
                id="signin-email"
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="signin-password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <LockIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="signin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
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
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="remember"
              value="true"
              className="size-4 rounded border-input accent-brand"
            />
            Remember me
          </label>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-xl bg-brand text-base text-brand-foreground hover:bg-brand/90"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-brand-accent transition-colors hover:text-brand"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export { SignInForm }
