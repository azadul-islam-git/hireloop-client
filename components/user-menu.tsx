"use client"

import { ChevronDownIcon, LogOutIcon } from "lucide-react"

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
import { signOut, useSession } from "@/lib/auth-client"

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

/**
 * Avatar + name dropdown with the account identity and sign-out action.
 * Used by the marketing navbar and by the dashboard sidebar footer (the
 * dashboard hides the navbar, so it needs its own sign-out affordance).
 */
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

export { RoleBadge, UserAvatar, UserMenu, getInitials }
export type { SessionUser }
