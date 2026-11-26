import { authClient } from "@/lib/auth-client"

type SessionSnapshot = {
  data?: { user?: { email?: string | null } | null } | null
}

/**
 * Waits until the client session store holds the session for `email`.
 *
 * `signIn.email` / `sign-up/email` make better-auth notify its session
 * signal, which fires a *concurrent* get-session fetch — that fetch can
 * cancel the `refetch()` we start ourselves, so awaiting `refetch()` alone
 * can resolve while the store still holds the previous account's session.
 * Navigating at that point makes the dashboard guard decide on the wrong
 * role and bounce through the wrong dashboard path.
 *
 * One `refetch()` as insurance, then poll until the store catches up
 * (whichever fetch wins, its response carries the new session).
 */
export async function syncSessionTo(
  email: string | null | undefined,
  refetch: () => Promise<void>
): Promise<void> {
  const atom = authClient.$store.atoms.session as unknown as {
    get(): SessionSnapshot | undefined
  }
  const matches = () => {
    const current = atom.get()
    return email ? current?.data?.user?.email === email : current?.data != null
  }

  if (matches()) return
  await refetch().catch(() => {})
  if (matches()) return

  const deadline = Date.now() + 3000
  while (!matches() && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
}
