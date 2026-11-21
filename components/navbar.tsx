"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { cn } from "cn"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

const signInHref = "/sign-in"
const getStartedHref = "/get-started"

function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 rounded-2xl border border-border/60 bg-card/70 px-4 shadow-sm backdrop-blur-xl sm:px-5">
        <Logo />

        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-2 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive(link.href) && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden items-center gap-2 lg:flex">
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
            <Button
              nativeButton={false}
              render={<Link href={signInHref} />}
              variant="ghost"
              className="text-brand-accent hover:bg-brand/10 hover:text-brand-accent"
            >
              Sign In
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={getStartedHref} />}
              className="h-10 rounded-xl bg-brand px-5 text-brand-foreground hover:bg-brand/90"
            >
              Get Started
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>

            <SheetContent side="right" className="gap-0 p-0">
              <SheetHeader className="flex-row items-center border-b border-border/60 p-4">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse Hireloop pages and account links.
                </SheetDescription>
                <Logo onClick={() => setOpen(false)} />
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col gap-1 p-4"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      isActive(link.href) && "bg-muted text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <SheetFooter className="border-t border-border/60 p-4">
                <Button
                  nativeButton={false}
                  render={
                    <Link href={signInHref} onClick={() => setOpen(false)} />
                  }
                  variant="outline"
                  className="h-11 w-full text-base"
                >
                  Sign In
                </Button>
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href={getStartedHref}
                      onClick={() => setOpen(false)}
                    />
                  }
                  className="h-11 w-full rounded-xl bg-brand text-base text-brand-foreground hover:bg-brand/90"
                >
                  Get Started
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { Navbar }
