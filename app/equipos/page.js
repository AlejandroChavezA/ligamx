import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Shield, Users } from "lucide-react"

// Helper function to generate avatar URL
const getAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

// Function to fetch teams from the API
async function getTeams() {
  try {
    // Ensure fetch uses absolute URL for server-side rendering/fetching
    const res = await fetch('https://fullstack4-dte6hbhbh4akaubk.canadacentral-01.azurewebsites.net/api/students/sas/equipos', {
      cache: 'no-store', // Avoid caching issues during development or if data changes often
    });

    if (!res.ok) {
      // Log error details if response is not ok
      console.error(`Error fetching teams: ${res.status} ${res.statusText}`)
      throw new Error('Failed to fetch teams');
    }

    const data = await res.json();
    console.log("Data received from API:", JSON.stringify(data, null, 2)); // Log the received data structure
    // Assuming the API returns an array of team objects directly
    // Or if it's nested, adjust accordingly e.g., data.teams
    return data; 
  } catch (error) {
    console.error("Fetch error inside getTeams:", error);
    // Return an empty array or handle the error as needed
    return []; 
  }
}

// Make the page component async
export default async function TeamsPage() {
  console.log("Fetching teams in TeamsPage component..."); // Log when fetching starts
  // Fetch teams data
  const teams = await getTeams();
  console.log("Teams data received by component:", JSON.stringify(teams, null, 2)); // Log the data the component uses

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-primary/10">
      <div className="pt-12 pb-8 bg-gradient-to-br from-purple-500 via-blue-500 to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">Equipos Liga MX</h1>
          <p className="mt-3 text-lg text-purple-100 tracking-wide">Explora todos los equipos de la temporada actual</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        <div className="bg-card rounded-xl shadow-lg border backdrop-blur-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Equipos participantes</h2>
                <p className="text-sm text-muted-foreground mt-1">Temporada 2024</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-5 w-5 mr-2" />
              <span>{teams.length} equipos</span>
            </div>
          </div>

          {teams.length === 0 ? (
            <div className="text-center py-16 bg-card/50 rounded-xl border backdrop-blur-sm">
              <p className="text-lg text-muted-foreground">No se pudieron cargar los equipos o no hay equipos disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <Card key={team.id || team._id} className="group overflow-hidden border bg-gradient-to-br from-card to-card/80 hover:from-purple-500/10 hover:to-primary/10 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-primary/10 ring-2 ring-primary/30 group-hover:ring-primary/50 group-hover:ring-[3px] transition-all duration-300 shadow-lg">
                      <Image
                        src={team.logoUrl || getAvatarUrl(team.nombre)}
                        alt={team.nombre || 'Logo del equipo'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative">
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{team.nombre}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">
                        {team.ciudad || 'Ciudad Desconocida'}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 pb-4 relative">
                    <div className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">
                      <span className="font-medium">Fundado en {team.anio_fundacion}</span>
                      <span className="font-medium">Colores: {team.colores}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer - Assuming it's defined in RootLayout */}
      {/* <footer className="bg-gradient-purple text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-medium">
            © {new Date().getFullYear()} LigaMXStats - Todas las estadísticas en tiempo real
          </p>
        </div>
      </footer> */}
    </div>
  )
}

