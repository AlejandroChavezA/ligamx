import Link from "next/link"
import { CalendarDays, ChevronRight } from "lucide-react"
import { MatchList } from "@/components/match-list"
import { TeamFilter } from "@/components/team-filter"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MatchesSection() {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <CalendarDays className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Partidos recientes</h2>
        </div>
        <TeamFilter />
      </div>

      <Tabs defaultValue="todos" className="mb-6">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
          <TabsTrigger value="proximos">Próximos</TabsTrigger>
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
      </Tabs>

      <div className="text-center mt-8">
        <Button asChild variant="outline">
          <Link href="/partidos" className="inline-flex items-center">
            Ver todos los partidos
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

