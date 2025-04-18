import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedTeamsSection() {
  // Lista de equipos destacados
  const featuredTeams = ["Club América", "Guadalajara", "Cruz Azul", "UNAM Pumas", "Tigres UANL", "Monterrey"]

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Equipos destacados</h2>
        <Link href="/equipos" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
          Ver todos
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {featuredTeams.map((team) => (
          <Card key={team} className="overflow-hidden border stats-card">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 mb-3">
                <Image src="/placeholder.svg?height=64&width=64" alt={team} fill className="object-contain team-logo" />
              </div>
              <h3 className="text-sm font-medium text-center">{team}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

