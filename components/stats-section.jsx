import { TrendingUp } from "lucide-react"
import { StatsOverview } from "@/components/stats-overview"

export function StatsSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resumen de estadísticas</h2>
      </div>
      <StatsOverview />
    </div>
  )
}

