"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChevronRightIcon,
  EuroIcon,
  GlobeIcon,
  MapPinIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "cn"
import { createJob } from "@/lib/actions/jobs"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

const JOB_CATEGORIES = {
  engineering: "Engineering & Tech",
  design: "Design",
  marketing: "Marketing",
  sales: "Sales",
  finance: "Finance",
  operations: "Operations",
  other: "Other",
} as const

const SALARY_FREQUENCIES = {
  hour: "per hour",
  day: "per day",
  month: "per month",
  year: "per year",
} as const

function SectionHeading({
  number,
  children,
}: {
  number: number
  children: React.ReactNode
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-base font-semibold text-foreground">
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full bg-brand ring-4 ring-brand/15"
      />
      {number}. {children}
    </h2>
  )
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <Label htmlFor={htmlFor} className="text-sm text-foreground">
      {children}
      {required ? <span className="text-destructive">*</span> : null}
    </Label>
  )
}

const fieldInput =
  "h-11 rounded-xl border-border/60 bg-background/40 px-3.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-brand/60 focus-visible:ring-brand/30 dark:bg-input/30"

const AddJobPage = () => {
  // Nothing more complex than native FormData — every control below is
  // uncontrolled and submits a hidden input (Base UI Select/Switch do this
  // too), so one `Object.fromEntries()` collects the whole form.
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget))
    const job = {
      ...data,
      isRemote: data.isRemote === "on",
      minSalary: data.minSalary ? Number(data.minSalary) : null,
      maxSalary: data.maxSalary ? Number(data.maxSalary) : null,
    }
    console.log("add-job form data:", job)

    // send the job data to the database
    const formData = new FormData(event.currentTarget)
    const result = await createJob(formData)
    console.log("created job", result)
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb + title */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <span>Manage Jobs</span>
        <ChevronRightIcon aria-hidden="true" className="size-3" />
        <span className="text-foreground">Create New Listing</span>
      </nav>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Post a New Job
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
        <Button
          type="submit"
          form="add-job-form"
          className="h-11 shrink-0 gap-2 rounded-xl bg-brand px-5 text-brand-foreground shadow-lg shadow-brand/25 hover:bg-brand/90"
        >
          Publish Job
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>

      <form
        id="add-job-form"
        onSubmit={handleSubmit}
        className="mt-8 space-y-8"
      >
        {/* ── 1. Basic Information ─────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeading number={1}>Basic Information</SectionHeading>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="job-title" required>
              Job Title
            </FieldLabel>
            <Input
              id="job-title"
              name="title"
              required
              placeholder="Frontend Developer"
              className={fieldInput}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="company-name" required>
                Company Name
              </FieldLabel>
              <Input
                id="company-name"
                name="company"
                required
                placeholder="HirePulse Network"
                className={fieldInput}
              />
            </div>

            <div className="space-y-1.5">
              <FieldLabel htmlFor="job-category" required>
                Job Category
              </FieldLabel>
              <Select
                name="category"
                required
                defaultValue="engineering"
                items={JOB_CATEGORIES}
              >
                <SelectTrigger
                  id="job-category"
                  className={cn(fieldInput, "w-full")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(JOB_CATEGORIES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <fieldset className="space-y-1.5">
            <legend className="text-sm text-foreground">
              Job Type <span className="text-destructive">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((type) => (
                <label
                  key={type}
                  className={cn(
                    "flex h-11 cursor-pointer items-center justify-center rounded-xl border border-border/60 bg-background/40 text-sm font-medium text-muted-foreground shadow-sm transition-colors",
                    "hover:border-brand/50 hover:text-foreground",
                    "has-checked:border-brand has-checked:bg-brand/10 has-checked:text-foreground has-checked:ring-1 has-checked:ring-brand/70",
                    "has-focus-visible:ring-2 has-focus-visible:ring-brand/70"
                  )}
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={type}
                    required
                    defaultChecked={type === "Full-time"}
                    className="peer sr-only"
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {/* ── 2. Location, Compensation & Timeline ─────────────── */}
        <section className="space-y-4 border-t border-border/60 pt-8">
          <SectionHeading number={2}>
            Location, Compensation &amp; Timeline
          </SectionHeading>

          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-4 shadow-sm">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <GlobeIcon aria-hidden="true" className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                Remote Work Allowed{" "}
                <span className="text-muted-foreground">(isRemote)</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Enable worldwide or distributed candidate applications
              </p>
            </div>
            <Switch name="isRemote" aria-label="Remote work allowed" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="location" required>
                Job Location
              </FieldLabel>
              <div className="relative">
                <MapPinIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="location"
                  name="location"
                  required
                  placeholder="New York, USA"
                  className={cn(fieldInput, "pl-10")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <FieldLabel htmlFor="deadline">Application Deadline</FieldLabel>
              <div className="relative">
                <CalendarIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className={cn(fieldInput, "pl-10")}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="min-salary">Min Salary / Rate</FieldLabel>
              <div className="relative">
                <EuroIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="min-salary"
                  name="minSalary"
                  type="number"
                  min={0}
                  placeholder="25"
                  className={cn(fieldInput, "pl-10")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <FieldLabel htmlFor="max-salary">Max Salary / Rate</FieldLabel>
              <div className="relative">
                <EuroIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="max-salary"
                  name="maxSalary"
                  type="number"
                  min={0}
                  placeholder="40"
                  className={cn(fieldInput, "pl-10")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
              <Select
                name="salaryFrequency"
                defaultValue="hour"
                items={SALARY_FREQUENCIES}
              >
                <SelectTrigger
                  id="frequency"
                  className={cn(fieldInput, "w-full")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SALARY_FREQUENCIES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* ── 3. Responsibilities & Requirements ────────────────── */}
        <section className="space-y-4 border-t border-border/60 pt-8">
          <SectionHeading number={3}>
            Responsibilities &amp; Requirements
          </SectionHeading>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="responsibilities" required>
              Key Responsibilities
            </FieldLabel>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              required
              rows={4}
              placeholder="Describe what the person will own day to day…"
              className={fieldInput}
            />
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="qualifications" required>
              Qualifications &amp; Requirements
            </FieldLabel>
            <Textarea
              id="qualifications"
              name="qualifications"
              required
              rows={4}
              placeholder="List the must-have skills and experience…"
              className={fieldInput}
            />
          </div>
        </section>

        {/* Extra submit target for keyboard users at the end of the form. */}
        <div className="flex justify-end border-t border-border/60 pt-6">
          <Button
            type="submit"
            className="h-11 gap-2 rounded-xl bg-brand px-6 text-brand-foreground hover:bg-brand/90"
          >
            <BriefcaseIcon className="size-4" />
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddJobPage
