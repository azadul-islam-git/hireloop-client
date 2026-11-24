import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

import { userAdditionalFields } from "@/lib/user-fields"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
const db = client.db("hireloopDB")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: userAdditionalFields,
  },
  // The role is picked while signing up, so it has to be client-writable —
  // but a session must never be able to change it afterwards, otherwise
  // `POST /update-user { role: "admin" }` would be a privilege escalation.
  // Server-side flows (scripts, an admin plugin) don't run through that
  // endpoint, so they may still change it.
  databaseHooks: {
    user: {
      update: {
        before: async (data, ctx) => {
          if (!("role" in data)) return
          const currentRole = ctx?.context?.session?.user?.role
          if (data.role === currentRole) return
          if (ctx?.path === "/update-user") {
            // Revert the role, let the rest of the update (name, image…) through.
            return { data: { role: currentRole } }
          }
        },
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
