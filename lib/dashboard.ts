import { DEFAULT_USER_ROLE, USER_ROLES, type UserRole } from "@/lib/user-fields"

/**
 * Dashboard base path: every role gets its own subtree.
 */
export const DASHBOARD_PATH = "/dashboard"

function isRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as readonly string[]).includes(value)
  )
}

/**
 * The dashboard path a user with `role` belongs to.
 *
 * Unknown/missing roles fall back to the default so a user document without
 * a `role` (e.g. one created before the field existed) still lands somewhere
 * valid instead of a 404.
 */
export function dashboardPath(role?: string | null): string {
  return `${DASHBOARD_PATH}/${isRole(role) ? role : DEFAULT_USER_ROLE}`
}

/**
 * The role segment of a dashboard pathname, or `null` for anything that
 * isn't a role-scoped dashboard route (`/dashboard`, `/dashboard/foo`, …).
 */
export function dashboardPathRole(pathname: string): UserRole | null {
  const segments = pathname.split("/")
  // ["", "dashboard", "<role>", …]
  return isRole(segments[2]) && segments[1] === "dashboard" ? segments[2] : null
}
