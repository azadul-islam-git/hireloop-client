/**
 * Roles a person can pick when signing up.
 *
 * Shared by `lib/auth.ts` (database schema) and `lib/auth-client.ts` (the
 * sign-up payload typing) so the two can never drift apart.
 */
export const USER_ROLES: ["seeker", "recruiter", "admin"] = [
  "seeker",
  "recruiter",
  "admin",
]

export type UserRole = (typeof USER_ROLES)[number]

export const DEFAULT_USER_ROLE: UserRole = "seeker"

function isRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as readonly string[]).includes(value)
  )
}

/**
 * Standard Schema validator — better-auth runs it on every incoming value,
 * because the MongoDB adapter does not enforce the `type` union on its own.
 */
const roleValidator = {
  "~standard": {
    version: 1 as const,
    vendor: "hireloop",
    validate: (value: unknown) =>
      isRole(value)
        ? { value }
        : {
            issues: [
              { message: `role must be one of: ${USER_ROLES.join(", ")}` },
            ],
          },
  },
}

/**
 * Extra columns on the `user` table.
 *
 * `input: true` lets the sign-up body set the role, while `defaultValue`
 * covers sign-ups that don't send one (social sign-in). Changing the role
 * *after* sign-up is rejected in `databaseHooks.user.update.before`
 * (see `lib/auth.ts`).
 */
export const userAdditionalFields = {
  role: {
    type: USER_ROLES,
    required: false as const,
    input: true as const,
    defaultValue: DEFAULT_USER_ROLE,
    validator: { input: roleValidator },
  },
}
