import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Flag, Timer, TrendingUp } from "lucide-react"

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border stats-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarjetas Amarillas</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">247</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12% desde la última jornada</span>
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border stats-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarjetas Rojas</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">23</h3>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>-2% desde la última jornada</span>
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border stats-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tiros de Esquina</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">583</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+5% desde la última jornada</span>
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Flag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border stats-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tiempo Promedio</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">94'</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+2 min desde la última jornada</span>
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Timer className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

