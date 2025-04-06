import { CalendarDays } from "lucide-react"
import { MatchList } from "@/components/match-list"
import { TeamFilter } from "@/components/team-filter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PartidosPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="pt-8 pb-4 bg-gradient-to-r from-purple-700 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Partidos Liga MX</h1>
          <p className="mt-2 text-purple-100">Todos los partidos de la temporada actual con estadísticas detalladas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <CalendarDays className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendario de partidos</h2>
          </div>
          <TeamFilter />
        </div>

        <Tabs defaultValue="todos" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
            <TabsTrigger value="proximos">Próximos</TabsTrigger>
            <TabsTrigger value="jornada">Jornada actual</TabsTrigger>
          </TabsList>
          <TabsContent value="todos">
            <MatchList />
          </TabsContent>
          <TabsContent value="finalizados">
            <MatchList filter="finalizados" />
          </TabsContent>
          <TabsContent value="proximos">
            <MatchList filter="proximos" />
          </TabsContent>
          <TabsContent value="jornada">
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Jornada 17 - Fase regular</p>
              <MatchList filter="proximos" />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Filtros avanzados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Temporada</label>
              <select className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                <option>Apertura 2023</option>
                <option>Clausura 2023</option>
                <option>Apertura 2022</option>
                <option>Clausura 2022</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jornada</label>
              <select className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                <option>Todas</option>
                <option>Jornada 1</option>
                <option>Jornada 2</option>
                <option>Jornada 3</option>
                <option>Jornada 4</option>
                <option>Jornada 5</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estadio</label>
              <select className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                <option>Todos</option>
                <option>Estadio Azteca</option>
                <option>Estadio BBVA</option>
                <option>Estadio Akron</option>
                <option>Estadio Universitario</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

