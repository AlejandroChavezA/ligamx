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

export default function Home() {
  const featuredTeams = [
    "Club América", "Guadalajara", "Cruz Azul", "UNAM Pumas", "Tigres UANL", "Monterrey"
  ];

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats overview */}
        <StatsSection />

        {/* Recent matches */}
        <MatchesSection />

        {/* Featured teams */}
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
                  {/* Updated Image component */}
                  <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={getAvatarUrl(team)} // Generate avatar URL
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

