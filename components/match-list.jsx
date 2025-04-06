import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Flag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Remove static teamLogos mapping
// const teamLogos = { ... }

// Sample Liga MX match data
const allMatches = [
  {
    id: 1,
    date: "2023-04-15",
    homeTeam: "Club América",
    awayTeam: "Guadalajara",
    homeScore: 3,
    awayScore: 2,
    yellowCards: { home: 2, away: 3 },
    redCards: { home: 0, away: 1 },
    corners: { home: 7, away: 5 },
    status: "Finalizado",
    time: "19:00",
  },
  {
    id: 2,
    date: "2023-04-14",
    homeTeam: "Cruz Azul",
    awayTeam: "UNAM Pumas",
    homeScore: 1,
    awayScore: 1,
    yellowCards: { home: 3, away: 2 },
    redCards: { home: 0, away: 0 },
    corners: { home: 6, away: 4 },
    status: "Finalizado",
    time: "21:00",
  },
  {
    id: 3,
    date: "2023-04-13",
    homeTeam: "Tigres UANL",
    awayTeam: "Monterrey",
    homeScore: 2,
    awayScore: 0,
    yellowCards: { home: 1, away: 2 },
    redCards: { home: 0, away: 0 },
    corners: { home: 5, away: 8 },
    status: "Finalizado",
    time: "19:00",
  },
  {
    id: 4,
    date: "2023-05-20",
    homeTeam: "Santos Laguna",
    awayTeam: "Toluca",
    homeScore: null,
    awayScore: null,
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    status: "Próximo",
    time: "20:00",
  },
  {
    id: 5,
    date: "2023-05-21",
    homeTeam: "Club América",
    awayTeam: "Cruz Azul",
    homeScore: null,
    awayScore: null,
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    status: "Próximo",
    time: "19:00",
  },
]

// Helper function to generate avatar URL
const getAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=64`;

export function MatchList({ filter = "todos" }) {
  // Filter matches based on the filter prop
  const matches = allMatches.filter((match) => {
    if (filter === "todos") return true
    if (filter === "finalizados") return match.status === "Finalizado"
    if (filter === "proximos") return match.status === "Próximo"
    return true
  })

  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No hay partidos disponibles.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Link href={`/partidos/${match.id}`} key={match.id}>
          <Card className="border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-0">
              <div className="match-card-header p-3 flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(match.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  • {match.time}
                </div>
                <Badge variant={match.status === "Finalizado" ? "secondary" : "outline"} className="text-xs">
                  {match.status}
                </Badge>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                      <Image
                        // Use generated avatar URL
                        src={getAvatarUrl(match.homeTeam)}
                        alt={match.homeTeam}
                        fill
                        className="object-cover team-logo"
                      />
                    </div>
                    <span className="font-medium">{match.homeTeam}</span>
                  </div>

                  <div className="flex items-center justify-center px-4">
                    {match.status === "Finalizado" ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">{match.homeScore}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-xl font-bold">{match.awayScore}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-500">vs</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 flex-1 justify-end">
                    <span className="font-medium">{match.awayTeam}</span>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                      <Image
                        // Use generated avatar URL
                        src={getAvatarUrl(match.awayTeam)}
                        alt={match.awayTeam}
                        fill
                        className="object-cover team-logo"
                      />
                    </div>
                  </div>
                </div>

                {match.status === "Finalizado" && (
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-sm">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-1">
                        <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Amarillas</span>
                      </div>
                      <div className="flex justify-between w-full">
                        <span className="font-medium">{match.yellowCards.home}</span>
                        <span className="font-medium">{match.yellowCards.away}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-1">
                        <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Rojas</span>
                      </div>
                      <div className="flex justify-between w-full">
                        <span className="font-medium">{match.redCards.home}</span>
                        <span className="font-medium">{match.redCards.away}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center mb-1">
                        <Flag className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Esquinas</span>
                      </div>
                      <div className="flex justify-between w-full">
                        <span className="font-medium">{match.corners.home}</span>
                        <span className="font-medium">{match.corners.away}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

