import Image from "next/image"
import Link from "next/link"

import ctaBackground from "@/app/images/cta-bg.png"
import { Button } from "@/components/ui/button"

function Footnote() {
  return (
    <section className="relative overflow-hidden bg-[#050505] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-150 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(99,102,241,0.5),transparent_70%)]" />
        <Image
          src={ctaBackground}
          alt=""
          width={1440}
          height={964}
          sizes="100vw"
          className="absolute inset-x-0 top-0 h-auto w-full opacity-90"
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-24 text-center sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-white/60 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href="/signup" />}
            className="h-11 w-full rounded-lg bg-white px-5 text-sm font-medium text-[#050505] hover:bg-white/90 sm:w-auto"
          >
            Create a free account
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/pricing" />}
            variant="outline"
            className="h-11 w-full rounded-lg border-white/15 bg-white/5 px-5 text-sm font-medium text-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  )
}

export { Footnote }
