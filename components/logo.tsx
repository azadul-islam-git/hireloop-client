import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

import logo from "@/app/images/logo.png"

function Logo({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Hireloop home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={logo}
        alt="hireloop logo"
        preload
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  )
}

export { Logo }
