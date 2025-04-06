import { BarChart3, PieChart, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamFilter } from "@/components/team-filter"

export default function EstadisticasPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="pt-8 pb-4 bg-gradient-to-r from-purple-700 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Estadísticas Liga MX</h1>
          <p className="mt-2 text-purple-100">
            Análisis detallado de todos los equipos y jugadores de la Liga MX
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <TrendingUp className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Estadísticas generales
            </h2>
          </div>
          <TeamFilter />
        </div>
        
        <Tabs defaultValue="equipos" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="equipos">Equipos</TabsTrigger>
            <TabsTrigger value="jugadores">Jugadores</TabsTrigger>
            <TabsTrigger value="arbitros">Árbitros</TabsTrigger>
          </TabsList>
          
          <TabsContent value="equipos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 text-primary mr-2" />
                    Goles por equipo
                  </CardTitle>
                  <CardDescription>Temporada Apertura 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { team: "Club América", value: 28 },
                      { team: "Monterrey", value: 25 },
                      { team: "Tigres UANL", value: 23 },
                      { team: "Cruz Azul", value: 21 },
                      { team: "Toluca", value: 19 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-36 text-sm font-medium truncate">{item.team}</div>
                        <div className="flex-1">
                          <div className="h-2 bg-primary rounded-full" style={{ width: `${(item.value / 30) * 100}%` }}></div>
                        </div>
                        <div className="w-10 text-right text-sm font-bold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 text-yellow-500 mr-2" />
                    Tarjetas amarillas
                  </CardTitle>
                  <CardDescription>Temporada Apertura 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { team: "Guadalajara", value: 42 },
                      { team: "Toluca", value: 38 },
                      { team: "UNAM Pumas", value: 36 },
                      { team: "Santos Laguna", value: 35 },
                      { team: "Cruz Azul", value: 32 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-36 text-sm font-medium truncate">{item.team}</div>
                        <div className="flex-1">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(item.value / 50) * 100}%` }}></div>
                        </div>
                        <div className="w-10 text-right text-sm font-bold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
                    Tiros de esquina
                  </CardTitle>
                  <CardDescription>Temporada Apertura 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { team: "Tigres UANL", value: 87 },
                      { team: "Club América", value: 82 },
                      { team: "Monterrey", value: 76 },
                      { team: "Cruz Azul", value: 71 },
                      { team: "León", value: 68 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-36 text-sm font-medium truncate">{item.team}</div>
                        <div className="flex-1">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(item.value / 100) * 100}%` }}></div>
                        </div>
                        <div className="w-10 text-right text-sm font-bold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Distribución de goles por jornada</CardTitle>
                <CardDescription>Temporada Apertura 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between gap-2">
                  {Array.from({ length: 17 }).map((_, i) => {
                    const height = Math.floor(Math.random() * 60) + 20;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t-sm" 
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs mt-2">{i + 1}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-4 text-sm text-gray-500">Jornada</div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 text-primary mr-2" />
                    Posesión promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-6">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-primary" 
                        style={{ 
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                          transform: 'rotate(54deg)'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">54%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-primary mr-2"></div>
                      <span className="text-sm">Club América - 54%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 mr-2"></div>
                      <span className="text-sm">Promedio de la liga - 46%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Efectividad de tiros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Club América</span>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Monterrey</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Tigres UANL</span>
                        <span className="text-sm font-medium">26%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '26%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Cruz Azul</span>
                        <span className="text-sm font-medium">24%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Toluca</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="jugadores">
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Selecciona un equipo para ver las estadísticas de sus jugadores.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="arbitros">
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Estadísticas de árbitros próximamente.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
