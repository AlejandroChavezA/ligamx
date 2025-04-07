"use client"; // Make it a Client Component for useState

import { useState, useEffect } from "react"; // Import useState and useEffect
import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { MatchesSection } from "@/components/matches-section"
import { FeaturedTeamsSection } from "@/components/featured-teams-section"
import Image from "next/image"
import Link from "next/link"
import { MatchList } from "@/components/match-list"
import { StatsOverview } from "@/components/stats-overview"
import { TeamFilter } from "@/components/team-filter"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ChevronRight, TrendingUp } from "lucide-react"

// Helper function to generate avatar URL
const getAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

// NOTE: getPartidos cannot be defined inside a Client Component if called during SSR part
// It should be fetched via useEffect or moved to a Server Component parent/utility function.
// For simplicity here, we'll fetch in useEffect.

export default function Home() {
  const featuredTeams = [
    "Club América", "Guadalajara", "Cruz Azul", "UNAM Pumas", "Tigres UANL", "Monterrey"
  ];
  
  const [partidos, setPartidos] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [selectedTemporada, setSelectedTemporada] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPartidos() {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:3010/api/students/sas/partidos', {
          cache: 'no-store',
        });
        if (!res.ok) {
          console.error(`Error fetching partidos: ${res.status} ${res.statusText}`)
          throw new Error('Failed to fetch partidos');
        }
        const data = await res.json();
        const validPartidos = Array.isArray(data) ? data : [];
        setPartidos(validPartidos);
        
        // Extract unique temporadas (use p.nombre based on table structure)
        const uniqueTemporadas = [...new Set(validPartidos.map(p => p.nombre).filter(Boolean))]; // Use p.nombre
        // Sort temporadas if needed
        uniqueTemporadas.sort((a, b) => b.localeCompare(a)); 
        setTemporadas(uniqueTemporadas);
        if (uniqueTemporadas.length > 0) {
             // Optionally set the default selected tab to the most recent temporada
             // setSelectedTemporada(uniqueTemporadas[0]); 
        }

      } catch (error) {
        console.error("Fetch error inside fetchPartidos:", error);
        setPartidos([]); // Set empty on error
        setTemporadas([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPartidos();
  }, []); // Fetch on initial mount

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats overview */}
        <StatsSection />

        {/* Recent matches section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <CalendarDays className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-2xl font-bold text-foreground">Partidos por Temporada</h2>
            </div>
            {/* TeamFilter might need adjustments if it depends on partidos data */}
            {/* <TeamFilter /> */}
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground">Cargando partidos...</p>
          ) : (
            <Tabs value={selectedTemporada} onValueChange={setSelectedTemporada} className="mb-6">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                {temporadas.map(temporada => (
                  <TabsTrigger key={temporada} value={temporada}>{temporada}</TabsTrigger>
                ))}
              </TabsList>
              {/* Content for "Todos" */}
              <TabsContent value="todos">
                 {/* Pass all partidos and the selected filter value */}
                <MatchList partidos={partidos} selectedTemporada="todos" />
              </TabsContent>
              {/* Content for each specific temporada */}
              {temporadas.map(temporada => (
                <TabsContent key={temporada} value={temporada}>
                  <MatchList partidos={partidos} selectedTemporada={temporada} />
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Link to all partidos page can remain if it exists */}
          {/* <div className="text-center mt-8"> ... </div> */}
        </div>

        {/* Featured teams section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Equipos destacados</h2>
            <Link href="/equipos" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
              Ver todos
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredTeams.map((team) => (
              <Card key={team} className="overflow-hidden border stats-card">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={getAvatarUrl(team)} 
                      alt={team}
                      fill
                      className="object-cover team-logo"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center text-foreground">{team}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

