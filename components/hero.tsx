import Image from "next/image"
import Link from "next/link"
import { BriefcaseBusinessIcon } from "lucide-react"

import globe from "@/app/images/globe.png"
import { JobSearch } from "@/components/job-search"
import { Stats } from "@/components/stats"
import { Button } from "@/components/ui/button"

const trendingSearches = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-150 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(99,102,241,0.1),transparent)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 pt-14 pb-10 text-center sm:pt-20 lg:pt-24">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r from-transparent to-border sm:w-16"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] uppercase backdrop-blur sm:text-[11px]">
            <BriefcaseBusinessIcon
              aria-hidden="true"
              className="size-3.5 text-orange-500"
            />
            <span className="font-semibold text-orange-500">50,000+</span>
            <span className="text-foreground/80">New jobs this month</span>
          </span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-l from-transparent to-border sm:w-16"
          />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster
        </p>

        <JobSearch />

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">
            Trending Position
          </span>
          {trendingSearches.map((term) => (
            <Button
              key={term}
              nativeButton={false}
              render={<Link href={`/jobs?q=${encodeURIComponent(term)}`} />}
              variant="outline"
              size="xs"
              className="rounded-full border-border/60 bg-card/60 text-muted-foreground hover:text-foreground"
            >
              {term}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative mt-2">
        <div className="relative mx-auto h-[calc(80px+50vw)] w-full overflow-hidden sm:h-[calc(120px+50vw)] lg:h-[calc(150px+50vw)]">
          <Image
            src={globe}
            alt=""
            width={1440}
            height={1882}
            sizes="100vw"
            loading="eager"
            className="absolute inset-x-0 top-[calc(80px-58.9vw)] h-auto w-full max-w-none sm:top-[calc(120px-58.9vw)] lg:top-[calc(150px-58.9vw)]"
          />
          <p className="absolute inset-x-0 top-[calc(80px+15vw)] z-10 px-4 text-center text-xl font-medium text-balance text-white/90 sm:top-[calc(120px+15vw)] sm:text-3xl lg:top-[calc(150px+15vw)] lg:text-4xl">
            Assisting over 15,000 job seekers
            <br className="hidden sm:block" /> find their dream positions.
          </p>
        </div>

        <div className="relative z-10 mx-auto -mt-10 w-full max-w-350 px-4 pb-12 sm:mt-[-20vw] sm:px-6 lg:px-8">
          <Stats />
        </div>
      </div>
    </section>
  )
}

export { Hero }
