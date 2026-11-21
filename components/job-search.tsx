"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MapPinIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function JobSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [location, setLocation] = React.useState("")

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams()

    if (query.trim()) {
      params.set("q", query.trim())
    }

    if (location.trim()) {
      params.set("location", location.trim())
    }

    const search = params.toString()
    router.push(search ? `/jobs?${search}` : "/jobs")
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-border/60 bg-card/70 p-2 shadow-sm backdrop-blur-xl transition-colors focus-within:border-brand/50 sm:flex sm:items-center sm:rounded-full sm:p-1.5"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Job title, skill or company"
          aria-label="Job title, skill or company"
          className="h-10 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
        />
      </div>

      <div className="mx-3 h-px bg-border sm:mx-0 sm:h-6 sm:w-px" />

      <div className="flex flex-1 items-center gap-2 px-3">
        <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          name="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Location or Remote"
          aria-label="Location or Remote"
          className="h-10 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
        />
      </div>

      <Button
        type="submit"
        aria-label="Search jobs"
        className="mt-2 h-10 w-full gap-2 rounded-xl bg-brand px-4 text-brand-foreground hover:bg-brand/90 sm:mt-0 sm:size-10 sm:shrink-0 sm:rounded-lg sm:px-0"
      >
        <SearchIcon />
        <span className="sm:hidden">Search Jobs</span>
      </Button>
    </form>
  )
}

export { JobSearch }
