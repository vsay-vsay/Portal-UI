import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "./ui/heading"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Heading as="h1" className="text-2xl font-bold tracking-tight">
          {title}
        </Heading>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
