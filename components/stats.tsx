import {
  BriefcaseBusinessIcon,
  Building2Icon,
  StarIcon,
  UserSearchIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"

const stats = [
  { icon: BriefcaseBusinessIcon, value: "50K", label: "Active Jobs" },
  { icon: Building2Icon, value: "12K", label: "Companies" },
  { icon: UserSearchIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

function Stats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, label }) => (
        <Card
          key={label}
          className="min-h-42.5 justify-between gap-6 rounded-2xl bg-card/80 p-5 ring-border/60 backdrop-blur-md sm:min-h-52.5 sm:p-6"
        >
          <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
          <div>
            <p className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

export { Stats }
