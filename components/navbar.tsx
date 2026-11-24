"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDownIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { cn } from "cn"

import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut, useSession } from "@/lib/auth-client"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

const signInHref = "/signin"
const getStartedHref = "/signup"

type SessionUser = NonNullable<ReturnType<typeof useSession>["data"]>["user"]

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

function UserAvatar({
  user,
  size = "sm",
}: {
  user: SessionUser
  size?: "default" | "sm"
}) {
  return (
    <Avatar size={size}>
      {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  )
}

function RoleBadge({ role }: { role?: string | null }) {
  if (!role) return null

  return (
    <span className="inline-flex w-fit shrink-0 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand-accent capitalize">
      {role}
    </span>
  )
}

function UserMenu({ user }: { user: SessionUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 gap-2 rounded-xl px-2 pr-2.5 hover:bg-brand/10 hover:text-foreground"
          />
        }
      >
        <UserAvatar user={user} />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
          {user.name}
        </span>
        <ChevronDownIcon className="text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="block px-2.5 py-2">
            <span className="block truncate text-sm font-medium text-foreground">
              {user.name}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {user.email}
            </span>
            {user.role ? (
              <span className="mt-1.5">
                <RoleBadge role={user.role} />
              </span>
            ) : null}
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => void signOut()}
        >
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const { data: session, isPending } = useSession()
  const user = session?.user

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
            {!isPending && (
              <>
                <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
                {user ? (
                  <UserMenu user={user} />
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
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
                {!isPending && user && (
                  <>
                    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3">
                      <UserAvatar user={user} size="default" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <RoleBadge role={user.role} />
                    </div>
                    <Button
                      variant="outline"
                      className="h-11 w-full gap-2 text-base"
                      onClick={() => {
                        setOpen(false)
                        void signOut()
                      }}
                    >
                      <LogOutIcon />
                      Sign out
                    </Button>
                  </>
                )}

                {!isPending && !user && (
                  <>
                    <Button
                      nativeButton={false}
                      render={
                        <Link
                          href={signInHref}
                          onClick={() => setOpen(false)}
                        />
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
                  </>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { Navbar }
