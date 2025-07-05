import { Heading } from "./ui/heading"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  icon?: any
}

export function PageHeader({ title, description, actions, icon: Icon }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-8 w-8 text-primary" />}
        <div>
          <Heading as="h1" className="text-2xl font-bold tracking-tight">
            {title}
          </Heading>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}