import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    </div>
  )
}
