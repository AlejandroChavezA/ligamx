import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, ChevronRight, Flag, MapPin, Shield, TrendingUp, Trophy, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Función para obtener datos del equipo (simulada)
function getTeamData(id) {
  // Datos de ejemplo para un equipo
  const teams = {
    "america": {
      id: "america",
      name: "Club América",
      logo: "/placeholder.svg?height=120&width=120",
      city: "Ciudad de México",
      stadium: "Estadio Azteca",
      founded: 1916,
      coach: "André Jardine",
      colors: "Amarillo y Azul",
      website: "https://www.clubamerica.com.mx",
      position: 1,
      points: 38,
      matches: {
        played: 17,
        won: 12,
        drawn: 2,
        lost: 3
      },
      goals: {
        scored: 28,
        conceded: 14
      },
      cards: {
        yellow: 32,
        red: 2
      },
      recentMatches: [
        {
          id: 1,
          date: "2023-04-15",
          opponent: "Guadalajara",
          isHome: true,
          result: "3-2",
          status: "Finalizado"
        },
        {
          id: 5,
          date: "2023-05-21",
          opponent: "Cruz Azul",
          isHome: true,
          result: "Próximo",
          status: "Próximo"
        },
        {
          id: 8,
          date: "2023-04-02",
          opponent: "Monterrey",
          isHome: false,
          result: "1-2",
          status: "Finalizado"
        },
        {
          id: 12,
          date: "2023-03-25",
          opponent: "Tigres UANL",
          isHome: true,
          result: "2-0",
          status: "Finalizado"
        },
        {
          id: 15,
          date: "2023-03-18",
          opponent: "Toluca",
          isHome: false,
          result: "1-1",
          status: "Finalizado"
        }
      ],
      topPlayers: [
        { name: "Henry Martín", position: "Delantero", goals: 9, assists: 3, image: "/placeholder.svg?height=60&width=60" },
        { name: "Álvaro Fidalgo", position: "Mediocampista", goals: 5, assists: 7, image: "/placeholder.svg?height=60&width=60" },
        { name: "Jonathan Rodríguez", position: "Delantero", goals: 6, assists: 2, image: "/placeholder.svg?height=60&width=60" },
        { name: "Richard Sánchez", position: "Mediocampista", goals: 3, assists: 4, image: "/placeholder.svg?height=60&width=60" }
      ]
    },
    "guadalajara": {
      id: "guadalajara",
      name: "Guadalajara",
      logo: "/placeholder.svg?height=120&width=120",
      city: "Guadalajara",
      stadium: "Estadio Akron",
      founded: 1906,
      coach: "Fernando Gago",
      colors: "Rojo y Blanco",
      website: "https://www.chivasdecorazon.com.mx",
      position: 5,
      points: 28,
      matches: {
        played: 17,
        won: 8,
        drawn: 4,
        lost: 5
      },
      goals: {
        scored: 22,
        conceded: 18
      },
      cards: {
        yellow: 42,
        red: 3
      },
      recentMatches: [
        {
          id: 1,
          date: "2023-04-15",
          opponent: "Club América",
          isHome: false,
          result: "2-3",
          status: "Finalizado"
        },
        {
          id: 6,
          date: "2023-05-22",
          opponent: "Toluca",
          isHome: true,
          result: "Próximo",
          status: "Próximo"
        },
        {
          id: 9,
          date: "2023-04-03",
          opponent: "Cruz Azul",
          isHome: true,
          result: "2-1",
          status: "Finalizado"
        },
        {
          id: 13,
          date: "2023-03-26",
          opponent: "UNAM Pumas",
          isHome: false,
          result: "0-0",
          status: "Finalizado"
        },
        {
          id: 16,
          date: "2023-03-19",
          opponent: "Santos Laguna",
          isHome: true,
          result: "3-1",
          status: "Finalizado"
        }
      ],
      topPlayers: [
        { name: "Alexis Vega", position: "Delantero", goals: 7, assists: 4, image: "/placeholder.svg?height=60&width=60" },
        { name: "Fernando Beltrán", position: "Mediocampista", goals: 3, assists: 6, image: "/placeholder.svg?height=60&width=60" },
        { name: "Roberto Alvarado", position: "Mediocampista", goals: 5, assists: 3, image: "/placeholder.svg?height=60&width=60" },
        { name: "Jesús Sánchez", position: "Defensa", goals: 1, assists: 2, image: "/placeholder.svg?height=60&width=60" }
      ]
    },
    // Puedes agregar más equipos aquí
  };
  
  return teams[id] || teams["america"]; // Devuelve América como predeterminado si no se encuentra el ID
}

export default function TeamDetailPage({ params }) {
  const team = getTeamData(params.id);
  
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/equipos" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a equipos
          </Link>
        </div>
        
        {/* Encabezado del equipo */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-8">
                <Image 
                  src={team.logo || "/placeholder.svg"} 
                  alt={team.name}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{team.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    {team.city}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    Fundado en {team.founded}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    DT: {team.coach}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-center">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Posición actual</div>
                  <div className="text-4xl font-bold text-primary">{team.position}°</div>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-sm">
                    {team.points} pts
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Partidos</div>
              <div className="mt-1 flex justify-center gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{team.matches.won}</div>
                  <div className="text-xs text-gray-500">G</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-500">{team.matches.drawn}</div>
                  <div className="text-xs text-gray-500">E</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{team.matches.lost}</div>
                  <div className="text-xs text-gray-500">P</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Goles</div>
              <div className="mt-1 flex justify-center gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{team.goals.scored}</div>
                  <div className="text-xs text-gray-500">A favor</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{team.goals.conceded}</div>
                  <div className="text-xs text-gray-500">En contra</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarjetas</div>
              <div className="mt-1 flex justify-center gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-500">{team.cards.yellow}</div>
                  <div className="text-xs text-gray-500">Amarillas</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{team.cards.red}</div>
                  <div className="text-xs text-gray-500">Rojas</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Estadio</div>
              <div className="text-lg font-medium mt-1">{team.stadium}</div>
            </div>
          </div>
        </div>
        
        {/* Contenido principal */}
        <Tabs defaultValue="partidos" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="partidos">Partidos</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
            <TabsTrigger value="jugadores">Jugadores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="partidos">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Partidos recientes</h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/partidos" className="inline-flex items-center">
                    Ver todos
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {team.recentMatches.map((match) => (
                  <Link href={`/partidos/${match.id}`} key={match.id}>
                    <Card className="border hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">
                              {new Date(match.date).toLocaleDateString('es-ES', { 
                                day: 'numeric', 
                                month: 'long'
                              })}
                            </span>
                          </div>
                          <Badge variant={match.status === "Finalizado" ? "secondary" : "outline"} className="text-xs">
                            {match.status}
                          </Badge>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {match.isHome ? (
                              <>
                                <div className="relative w-8 h-8">
                                  <Image 
                                    src={team.logo || "/placeholder.svg"} 
                                    alt={team.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="font-medium">{team.name}</span>
                              </>
                            ) : (
                              <>
                                <div className="relative w-8 h-8">
                                  <Image 
                                    src="/placeholder.svg?height=32&width=32" 
                                    alt={match.opponent}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="font-medium">{match.opponent}</span>
                              </>
                            )}
                          </div>
                          
                          <div className="text-center px-4">
                            {match.status === "Finalizado" ? (
                              <span className="font-bold">{match.result}</span>
                            ) : (
                              <span className="text-sm text-gray-500">vs</span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-3 justify-end">
                            {match.isHome ? (
                              <>
                                <span className="font-medium">{match.opponent}</span>
                                <div className="relative w-8 h-8">
                                  <Image 
                                    src="/placeholder.svg?height=32&width=32" 
                                    alt={match.opponent}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <span className="font-medium">{team.name}</span>
                                <div className="relative w-8 h-8">
                                  <Image 
                                    src={team.logo || "/placeholder.svg"} 
                                    alt={team.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="estadisticas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    Rendimiento
                  </CardTitle>
                  <CardDescription>Temporada Apertura 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Victorias</span>
                        <span className="text-sm font-medium">{Math.round((team.matches.won / team.matches.played) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full" 
                          style={{ width: `${(team.matches.won / team.matches.played) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Empates</span>
                        <span className="text-sm font-medium">{Math.round((team.matches.drawn / team.matches.played) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className="h-2 bg-gray-500 rounded-full" 
                          style={{ width: `${(team.matches.drawn / team.matches.played) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Derrotas</span>
                        <span className="text-sm font-medium">{Math.round((team.matches.lost / team.matches.played) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className="h-2 bg-red-500 rounded-full" 
                          style={{ width: `${(team.matches.lost / team.matches.played) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{team.goals.scored}</div>
                        <div className="text-sm text-gray-500">Goles a favor</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">{team.goals.conceded}</div>
                        <div className="text-sm text-gray-500">Goles en contra</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">{team.goals.scored - team.goals.conceded}</div>
                        <div className="text-sm text-gray-500">Diferencia</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-primary mr-2" />
                    Logros recientes
                  </CardTitle>
                  <CardDescription>Últimos 5 años</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Campeón Liga MX</h4>
                        <p className="text-sm text-gray-500">Apertura 2022</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Trophy className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Subcampeón Liga MX</h4>
                        <p className="text-sm text-gray-500">Clausura 2021</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Campeón CONCACAF Champions League</h4>
                        <p className="text-sm text-gray-500">2021</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Shield className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">Campeón de Campeones</h4>
                        <p className="text-sm text-gray-500">2022</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Flag className="h-5 w-5 text-primary mr-2" />
                    Estadísticas por jornada
                  </CardTitle>
                  <CardDescription>Temporada Apertura 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {Array.from({ length: 17 }).map((_, i) => {
                      // Simulamos datos aleatorios para el gráfico
                      const goalsScored = Math.floor(Math.random() * 4);
                      const goalsConceded = Math.floor(Math.random() * 3);
                      
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex flex-col items-center">
                            <div 
                              className="w-full bg-green-500 rounded-t-sm" 
                              style={{ height: `${goalsScored * 15}%` }}
                            ></div>
                            <div 
                              className="w-full bg-red-500" 
                              style={{ height: `${goalsConceded * 15}%` }}
                            ></div>
                          </div>
                          <div className="text-xs mt-2">{i + 1}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center mt-4 gap-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 mr-2"></div>
                      <span className="text-sm">Goles a favor</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 mr-2"></div>
                      <span className="text-sm">Goles en contra</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="jugadores">
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Jugadores destacados</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {team.topPlayers.map((player, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-center">
                        <div className="relative w-12 h-12 mr-3">
                          <Image 
                            src={player.image || "/placeholder.svg"} 
                            alt={player.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{player.name}</h3>
                          <p className="text-sm text-gray-500">{player.position}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 grid grid-cols-2 gap-2 text-center">
                        <div>
                          <div className="text-xl font-bold text-primary">{player.goals}</div>
                          <div className="text-xs text-gray-500">Goles</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-primary">{player.assists}</div>
                          <div className="text-xs text-gray-500">Asistencias</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link href="/jugadores" className="inline-flex items-center">
                    Ver todos los jugadores
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
