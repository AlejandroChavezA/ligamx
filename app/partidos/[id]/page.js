import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Calendar, Clock, Flag, MapPin, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Esta función simularía obtener los datos del partido desde una API
function getMatchData(id) {
  // Datos de ejemplo para un partido
  return {
    id: id,
    date: "2023-04-15",
    time: "19:00",
    status: "Finalizado",
    stadium: "Estadio Azteca",
    attendance: "67,523",
    homeTeam: {
      name: "Club América",
      logo: "/placeholder.svg?height=80&width=80",
      score: 3,
      goals: [
        { player: "Henry Martín", minute: 23 },
        { player: "Álvaro Fidalgo", minute: 45 },
        { player: "Jonathan Rodríguez", minute: 78 }
      ],
      yellowCards: [
        { player: "Richard Sánchez", minute: 34 },
        { player: "Sebastián Cáceres", minute: 56 }
      ],
      redCards: []
    },
    awayTeam: {
      name: "Guadalajara",
      logo: "/placeholder.svg?height=80&width=80",
      score: 2,
      goals: [
        { player: "Alexis Vega", minute: 12 },
        { player: "Fernando Beltrán", minute: 67 }
      ],
      yellowCards: [
        { player: "Gilberto Sepúlveda", minute: 23 },
        { player: "Fernando Beltrán", minute: 45 },
        { player: "Jesús Sánchez", minute: 76 }
      ],
      redCards: [
        { player: "Gilberto Sepúlveda", minute: 82 }
      ]
    },
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 15, away: 9 },
      shotsOnTarget: { home: 7, away: 4 },
      corners: { home: 7, away: 5 },
      fouls: { home: 10, away: 14 },
      offsides: { home: 2, away: 3 }
    }
  }
}

export default function MatchDetailPage({ params }) {
  const match = getMatchData(params.id)
  
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/partidos" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a partidos
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
          <div className="p-6 match-card-header">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(match.date).toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                {match.time}
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                {match.stadium}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Asistencia: {match.attendance}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center py-6">
              <div className="flex flex-col items-center md:items-end md:flex-1 mb-4 md:mb-0">
                <div className="relative w-20 h-20 mb-2">
                  <Image 
                    src={match.homeTeam.logo || "/placeholder.svg"} 
                    alt={match.homeTeam.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{match.homeTeam.name}</h2>
              </div>
              
              <div className="flex items-center justify-center mx-8 my-4">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold mx-3">{match.homeTeam.score}</span>
                    <span className="text-xl text-gray-400 mx-1">-</span>
                    <span className="text-4xl font-bold mx-3">{match.awayTeam.score}</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {match.status}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start md:flex-1">
                <div className="relative w-20 h-20 mb-2">
                  <Image 
                    src={match.awayTeam.logo || "/placeholder.svg"} 
                    alt={match.awayTeam.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{match.awayTeam.name}</h2>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="resumen" className="p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
              <TabsTrigger value="alineaciones">Alineaciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resumen">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Goles</h3>
                  <div className="space-y-4">
                    {match.homeTeam.goals.map((goal, index) => (
                      <div key={`home-goal-${index}`} className="flex items-center">
                        <div className="w-1/2 flex justify-end pr-4">
                          <div className="flex items-center">
                            <span className="font-medium">{goal.player}</span>
                            <span className="ml-2 text-sm text-gray-500">{goal.minute}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                          <span className="text-primary text-xs">⚽</span>
                        </div>
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                    
                    {match.awayTeam.goals.map((goal, index) => (
                      <div key={`away-goal-${index}`} className="flex items-center">
                        <div className="w-1/2"></div>
                        <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                          <span className="text-primary text-xs">⚽</span>
                        </div>
                        <div className="w-1/2 flex justify-start pl-4">
                          <div className="flex items-center">
                            <span className="font-medium">{goal.player}</span>
                            <span className="ml-2 text-sm text-gray-500">{goal.minute}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Tarjetas</h3>
                  <div className="space-y-4">
                    {match.homeTeam.yellowCards.map((card, index) => (
                      <div key={`home-yellow-${index}`} className="flex items-center">
                        <div className="w-1/2 flex justify-end pr-4">
                          <div className="flex items-center">
                            <span className="font-medium">{card.player}</span>
                            <span className="ml-2 text-sm text-gray-500">{card.minute}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                    
                    {match.homeTeam.redCards.map((card, index) => (
                      <div key={`home-red-${index}`} className="flex items-center">
                        <div className="w-1/2 flex justify-end pr-4">
                          <div className="flex items-center">
                            <span className="font-medium">{card.player}</span>
                            <span className="ml-2 text-sm text-gray-500">{card.minute}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                    
                    {match.awayTeam.yellowCards.map((card, index) => (
                      <div key={`away-yellow-${index}`} className="flex items-center">
                        <div className="w-1/2"></div>
                        <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="w-1/2 flex justify-start pl-4">
                          <div className="flex items-center">
                            <span className="font-medium">{card.player}</span>
                            <span className="ml-2 text-sm text-gray-500">{card.minute}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {match.awayTeam.redCards.map((card, index) => (
                      <div key={`away-red-${index}`} className="flex items-center">
                        <div className="w-1/2"></div>
                        <div className="w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="w-1/2 flex justify-start pl-4">
                          <div className="flex items-center">
                            <span className="font-medium">{card.player}</span>
                            <span className="ml-2 text-sm text-gray-500">{card.minute}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="estadisticas">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-1/4 text-right pr-4">
                    <span className="font-bold">{match.stats.possession.home}%</span>
                  </div>
                  <div className="w-1/2">
                    <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-primary" 
                        style={{ width: `${match.stats.possession.home}%` }}
                      ></div>
                    </div>
                    <div className="text-center text-sm font-medium mt-1">Posesión</div>
                  </div>
                  <div className="w-1/4 pl-4">
                    <span className="font-bold">{match.stats.possession.away}%</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/4 text-right pr-4">
                    <span className="font-bold">{match.stats.shots.home}</span>
                  </div>
                  <div className="w-1/2">
                    <div className="flex justify-between text-sm">
                      <div className="bg-primary h-4" style={{ width: `${(match.stats.shots.home / (match.stats.shots.home + match.stats.shots.away)) * 100}%` }}></div>
                      <div className="bg-gray-300 dark:bg-gray-700 h-4" style={{ width: `${(match.stats.shots.away / (match.stats.shots.home + match.stats.shots.away)) * 100}%` }}></div>
                    </div>
                    <div className="text-center text-sm font-medium mt-1">Tiros totales</div>
                  </div>
                  <div className="w-1/4 pl-4">
                    <span className="font-bold">{match.stats.shots.away}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/4 text-right pr-4">
                    <span className="font-bold">{match.stats.shotsOnTarget.home}</span>
                  </div>
                  <div className="w-1/2">
                    <div className="flex justify-between text-sm">
                      <div className="bg-primary h-4" style={{ width: `${(match.stats.shotsOnTarget.home / (match.stats.shotsOnTarget.home + match.stats.shotsOnTarget.away)) * 100}%` }}></div>
                      <div className="bg-gray-300 dark:bg-gray-700 h-4" style={{ width: `${(match.stats.shotsOnTarget.away / (match.stats.shotsOnTarget.home + match.stats.shotsOnTarget.away)) * 100}%` }}></div>
                    </div>
                    <div className="text-center text-sm font-medium mt-1">Tiros a puerta</div>
                  </div>
                  <div className="w-1/4 pl-4">
                    <span className="font-bold">{match.stats.shotsOnTarget.away}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/4 text-right pr-4">
                    <span className="font-bold">{match.stats.corners.home}</span>
                  </div>
                  <div className="w-1/2">
                    <div className="flex justify-between text-sm">
                      <div className="bg-primary h-4" style={{ width: `${(match.stats.corners.home / (match.stats.corners.home + match.stats.corners.away)) * 100}%` }}></div>
                      <div className="bg-gray-300 dark:bg-gray-700 h-4" style={{ width: `${(match.stats.corners.away / (match.stats.corners.home + match.stats.corners.away)) * 100}%` }}></div>
                    </div>
                    <div className="text-center text-sm font-medium mt-1">Tiros de esquina</div>
                  </div>
                  <div className="w-1/4 pl-4">
                    <span className="font-bold">{match.stats.corners.away}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/4 text-right pr-4">
                    <span className="font-bold">{match.stats.fouls.home}</span>
                  </div>
                  <div className="w-1/2">
                    <div className="flex justify-between text-sm">
                      <div className="bg-primary h-4" style={{ width: `${(match.stats.fouls.home / (match.stats.fouls.home + match.stats.fouls.away)) * 100}%` }}></div>
                      <div className="bg-gray-300 dark:bg-gray-700 h-4" style={{ width: `${(match.stats.fouls.away / (match.stats.fouls.home + match.stats.fouls.away)) * 100}%` }}></div>
                    </div>
                    <div className="text-center text-sm font-medium mt-1">Faltas</div>
                  </div>
                  <div className="w-1/4 pl-4">
                    <span className="font-bold">{match.stats.fouls.away}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/4 text-right pr-4">
                    <span className="font-bold">{match.stats.offsides.home}</span>
                  </div>
                  <div className="w-1/2">
                    <div className="flex justify-between text-sm">
                      <div className="bg-primary h-4" style={{ width: `${(match.stats.offsides.home / (match.stats.offsides.home + match.stats.offsides.away)) * 100}%` }}></div>
                      <div className="bg-gray-300 dark:bg-gray-700 h-4" style={{ width: `${(match.stats.offsides.away / (match.stats.offsides.home + match.stats.offsides.away)) * 100}%` }}></div>
                    </div>
                    <div className="text-center text-sm font-medium mt-1">Fuera de juego</div>
                  </div>
                  <div className="w-1/4 pl-4">
                    <span className="font-bold">{match.stats.offsides.away}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="alineaciones">
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Información de alineaciones no disponible para este partido.
                </p>
                <Button variant="outline" className="mt-4">
                  Solicitar información
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Flag className="h-5 w-5 text-primary mr-2" />
                Tiros de esquina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{match.stats.corners.home}</div>
                  <div className="text-sm text-gray-500">{match.homeTeam.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">vs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{match.stats.corners.away}</div>
                  <div className="text-sm text-gray-500">{match.awayTeam.name}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Tarjetas amarillas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{match.homeTeam.yellowCards.length}</div>
                  <div className="text-sm text-gray-500">{match.homeTeam.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">vs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{match.awayTeam.yellowCards.length}</div>
                  <div className="text-sm text-gray-500">{match.awayTeam.name}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Tarjetas rojas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{match.homeTeam.redCards.length}</div>
                  <div className="text-sm text-gray-500">{match.homeTeam.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">vs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{match.awayTeam.redCards.length}</div>
                  <div className="text-sm text-gray-500">{match.awayTeam.name}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
