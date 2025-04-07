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
  const [equiposMap, setEquiposMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch both partidos and equipos data
        const [partidosRes, equiposRes] = await Promise.all([
          fetch('http://localhost:3010/api/students/sas/partidos', {
            cache: 'no-store',
          }),
          fetch('http://localhost:3010/api/students/sas/equipos', {
            cache: 'no-store',
          })
        ]);

        if (!partidosRes.ok || !equiposRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const partidosData = await partidosRes.json();
        const equiposData = await equiposRes.json();

        // Create equipos map
        const equiposMapping = {};
        equiposData.forEach(equipo => {
          equiposMapping[equipo.id] = equipo.nombre;
        });

        setEquiposMap(equiposMapping);
        setPartidos(Array.isArray(partidosData) ? partidosData : []);

      } catch (error) {
        console.error("Fetch error:", error);
        setPartidos([]);
        setEquiposMap({});
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []); // Fetch on initial mount

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-primary/10">
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats overview */}
        <StatsSection />

        {/* Current matchday section */}
        <div className="mb-12">
          <div className="bg-card rounded-xl shadow-lg border backdrop-blur-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <CalendarDays className="h-6 w-6 text-primary mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Jornada 15</h2>
                  <p className="text-sm text-muted-foreground mt-1">Partidos de la jornada actual</p>
                </div>
              </div>
              <Link 
                href="/partidos" 
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Ver todos los partidos
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-16 bg-card/50 rounded-xl border backdrop-blur-sm">
                <p className="text-lg text-muted-foreground">Cargando partidos...</p>
              </div>
            ) : (
              <div>
                <MatchList 
                  partidos={partidos.filter(partido => partido.jornada === 15)} 
                  equiposMap={equiposMap}
                />
              </div>
            )}
          </div>
        </div>

        {/* Featured teams section */}
        <div className="mb-12">
          <div className="bg-card rounded-xl shadow-lg border backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Equipos destacados</h2>
              </div>
              <Link 
                href="/equipos" 
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Ver todos
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredTeams.map((team) => (
                <Card key={team} className="group overflow-hidden border bg-card hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden bg-muted ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <Image
                        src={getAvatarUrl(team)} 
                        alt={team}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-center text-foreground">{team}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

