import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// Liga MX teams with logos
const teams = [
  {
    id: "america",
    name: "Club América",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Ciudad de México",
    stadium: "Estadio Azteca",
  },
  {
    id: "guadalajara",
    name: "Guadalajara",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Guadalajara",
    stadium: "Estadio Akron",
  },
  {
    id: "cruzazul",
    name: "Cruz Azul",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Ciudad de México",
    stadium: "Estadio Azteca",
  },
  {
    id: "pumas",
    name: "UNAM Pumas",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Ciudad de México",
    stadium: "Estadio Olímpico Universitario",
  },
  {
    id: "tigres",
    name: "Tigres UANL",
    logo: "/placeholder.svg?height=80&width=80",
    city: "San Nicolás de los Garza",
    stadium: "Estadio Universitario",
  },
  {
    id: "monterrey",
    name: "Monterrey",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Monterrey",
    stadium: "Estadio BBVA",
  },
  {
    id: "santos",
    name: "Santos Laguna",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Torreón",
    stadium: "Estadio Corona",
  },
  {
    id: "toluca",
    name: "Toluca",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Toluca",
    stadium: "Estadio Nemesio Díez",
  },
  {
    id: "leon",
    name: "León",
    logo: "/placeholder.svg?height=80&width=80",
    city: "León",
    stadium: "Estadio León",
  },
  {
    id: "tijuana",
    name: "Tijuana",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Tijuana",
    stadium: "Estadio Caliente",
  },
  {
    id: "atlas",
    name: "Atlas",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Guadalajara",
    stadium: "Estadio Jalisco",
  },
  {
    id: "pachuca",
    name: "Pachuca",
    logo: "/placeholder.svg?height=80&width=80",
    city: "Pachuca",
    stadium: "Estadio Hidalgo",
  },
]

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="bg-gradient-purple text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <Image src="/placeholder.svg?height=40&width=40" alt="Liga MX Logo" fill className="object-contain" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tighter">
                Liga<span className="text-yellow-300">MX</span>Stats
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="/link"
                className="text-white/80 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Partidos
              </a>
              <a
                href="/equipos"
                className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Equipos
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Estadísticas
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Noticias
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Equipos de la <span className="text-primary">Liga MX</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Link href={`/equipos/${team.id}`} key={team.id}>
                <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="relative w-16 h-16">
                      <Image src={team.logo || "/placeholder.svg"} alt={team.name} fill className="object-contain" />
                    </div>
                    <div>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription>{team.city}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-1">
                      <span className="font-bold">Estadio:</span> {team.stadium}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-purple text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-medium">
            © {new Date().getFullYear()} LigaMXStats - Todas las estadísticas en tiempo real
          </p>
        </div>
      </footer>
    </div>
  )
}

