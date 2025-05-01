"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1800,
  },
  {
    name: "Feb",
    total: 2200,
  },
  {
    name: "Mar",
    total: 2800,
  },
  {
    name: "Apr",
    total: 2400,
  },
  {
    name: "May",
    total: 2900,
  },
  {
    name: "Jun",
    total: 3300,
  },
  {
    name: "Jul",
    total: 3200,
  },
  {
    name: "Aug",
    total: 3500,
  },
  {
    name: "Sep",
    total: 3600,
  },
  {
    name: "Oct",
    total: 3800,
  },
  {
    name: "Nov",
    total: 4000,
  },
  {
    name: "Dec",
    total: 4200,
  },
]

export function OverviewChart() {
  const { theme } = useTheme()

  // Determine the bar color based on the current theme
  const getBarColor = () => {
    if (!theme) return "var(--primary)"

    if (theme.includes("blue")) return "hsl(217, 91%, 60%)"
    if (theme.includes("green")) return "hsl(142, 71%, 45%)"
    if (theme.includes("purple")) return "hsl(267, 84%, 60%)"

    return theme === "dark" ? "hsl(210, 40%, 98%)" : "hsl(222.2, 47.4%, 11.2%)"
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill={getBarColor()} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
