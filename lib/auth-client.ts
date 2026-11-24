import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

import { userAdditionalFields } from "@/lib/user-fields"

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  // Types `role` on `authClient.signUp.email` / the session user.
  plugins: [inferAdditionalFields({ user: userAdditionalFields })],
})

export const { signIn, signUp, useSession } = createAuthClient()
