import Link from "next/link"

import { Logo } from "@/components/logo"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/social-icons"

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
]

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
]

function Footer() {
  return (
    <footer className="bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium text-indigo-400">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-xs text-white/40 sm:flex-row sm:items-center sm:gap-6">
            <p>Copyright 2024 — Programming Hero</p>
            <div className="flex items-center gap-2">
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms &amp; Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
