"use client"

import { CalendarDays, FileText } from 'lucide-react'

import { Badge } from "@/components/ui/badge"

export function RecentAssignments() {
  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Quiz",
      class: "Class 10B",
      dueDate: "Yesterday",
      status: "needs grading",
      submissions: 28,
    },
    {
      id: 2,
      title: "Algebra Homework",
      class: "Class 9A",
      dueDate: "2 days ago",
      status: "needs grading",
      submissions: 30,
    },
    {
      id: 3,
      title: "Calculus Test",
      class: "Class 11C",
      dueDate: "3 days ago",
      status: "needs grading",
      submissions: 25,
    },
  ]

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <div key={assignment.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{assignment.title}</span>
            </div>
            <Badge variant="secondary">{assignment.class}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              <span>Due {assignment.dueDate}</span>
            </div>
            <span>{assignment.submissions} submissions</span>
          </div>
        </div>
      ))}
    </div>
  )
}
