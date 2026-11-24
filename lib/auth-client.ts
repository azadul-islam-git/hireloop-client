import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

import { userAdditionalFields } from "@/lib/user-fields"

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  // Types `role` on `authClient.signUp.email` / the session user.
  plugins: [inferAdditionalFields({ user: userAdditionalFields })],
})

// Everything is re-exported from this one instance so session state
// (`useSession`) and actions (`signOut`, `signIn`, …) share a single store —
// otherwise signing out would not update components reading the session.
export const { signIn, signUp, signOut, useSession } = authClient
