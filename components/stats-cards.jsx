import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Flag, Timer } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
        <div className="h-2 bg-yellow-400"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold">Tarjetas Amarillas</CardTitle>
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold">247</div>
          <p className="text-xs text-muted-foreground font-medium">+12% desde la última jornada</p>
          <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
        <div className="h-2 bg-red-500"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold">Tarjetas Rojas</CardTitle>
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold">23</div>
          <p className="text-xs text-muted-foreground font-medium">-2% desde la última jornada</p>
          <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
        <div className="h-2 bg-blue-500"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold">Tiros de Esquina</CardTitle>
          <Flag className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold">583</div>
          <p className="text-xs text-muted-foreground font-medium">+5% desde la última jornada</p>
          <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
        <div className="h-2 bg-green-500"></div>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold">Tiempo Promedio</CardTitle>
          <Timer className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold">94'</div>
          <p className="text-xs text-muted-foreground font-medium">+2 min desde la última jornada</p>
          <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
        </CardContent>
      </Card>
    </div>
  )
}

