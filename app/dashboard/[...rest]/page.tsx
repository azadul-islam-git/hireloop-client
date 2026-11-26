import { notFound } from "next/navigation"

/**
 * Matches every dashboard path deeper than the role roots
 * (`/dashboard/seeker/jobs`, typos, other roles' sub-paths, …).
 *
 * Without it those URLs render the marketing root 404 *outside* the
 * dashboard layout, so the role guard in the layout never runs. Rendering
 * here keeps them inside the dashboard shell (and the role redirect) while
 * still answering 404 for pages that don't exist yet.
 */
export default function DashboardCatchAllPage() {
  notFound()
}
