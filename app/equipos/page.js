import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// Helper function to generate avatar URL
const getAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

// Function to fetch teams from the API
async function getTeams() {
  try {
    // Ensure fetch uses absolute URL for server-side rendering/fetching
    const res = await fetch('http://localhost:3010/api/students/sas/equipos', {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="pt-8 pb-4 bg-gradient-to-r liga-mx-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Equipos Liga MX</h1> {/* Adjusted title slightly */}
          <p className="mt-2 text-purple-100">Información de los equipos de la temporada</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          {/* Display message if no teams were fetched */}
          {teams.length === 0 ? (
            <p className="text-center text-muted-foreground">No se pudieron cargar los equipos o no hay equipos disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <Link href={`/equipos/${team.id || team._id}`} key={team.id || team._id}>
                  <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted"> 
                        <Image 
                          src={team.logoUrl || getAvatarUrl(team.nombre)}
                          alt={team.nombre || 'Logo del equipo'}
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div>
                        <CardTitle>{team.nombre}</CardTitle>
                        <CardDescription>{team.ciudad || 'Ciudad Desconocida'}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
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

