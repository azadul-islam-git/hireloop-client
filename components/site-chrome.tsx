"use client"

import { usePathname } from "next/navigation"

type SiteChromeProps = {
  children: React.ReactNode
  /** Passed as a slot from the server layout so it stays server-rendered. */
  navbar: React.ReactNode
  footer: React.ReactNode
}

/**
 * Renders the marketing chrome (navbar + footer) around every page except
 * the dashboard, which has its own shell (sidebar + `SidebarTrigger`).
 *
 * `/dashboard` and everything under it are the only paths excluded —
 * `/signin`, `/signup` and the public pages keep both.
 */
export function SiteChrome({ children, navbar, footer }: SiteChromeProps) {
  const pathname = usePathname()
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/")

  return (
    <>
      {!isDashboard && navbar}
      {children}
      {!isDashboard && footer}
    </>
  )
}
