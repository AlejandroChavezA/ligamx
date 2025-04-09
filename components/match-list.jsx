import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Trophy, Swords, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Helper function to generate avatar URL 
const getAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name || '?')}&background=random&color=fff&size=64`;

// MatchList now accepts partidos and equiposMap
export function MatchList({ partidos = [], equiposMap = {} }) { 
  
  if (!partidos || partidos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No hay partidos para mostrar.</p> 
      </div>
    )
  }

  // Helper to format datetime string
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: 'Fecha desc.', time: '' };
    try {
      const dateObj = new Date(dateTimeString);
      const formattedDate = dateObj.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      const formattedTime = dateObj.toLocaleTimeString("es-ES", {
        hour: '2-digit',
        minute: '2-digit'
      });
      return { date: formattedDate, time: formattedTime };
    } catch (e) {
      console.error("Error formatting date:", e);
      return { date: 'Fecha inválida', time: '' };
    }
  };

  const getStatusVariant = (status) => {
    const lowerStatus = status?.toLowerCase();
    if (lowerStatus === 'finalizado') return 'default';
    if (lowerStatus === 'próximo' || lowerStatus === 'proximo' || lowerStatus === 'programado') return 'default';
    return 'outline';
  };

  const getCardStyle = (status) => {
    const lowerStatus = status?.toLowerCase();
    if (lowerStatus === 'próximo' || lowerStatus === 'proximo' || lowerStatus === 'programado') {
      return "border-2 border-primary/40 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-primary/20";
    }
    if (lowerStatus === 'finalizado') {
      return "border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/20";
    }
    return "border";
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {partidos.map((match) => {
            const { date: matchDate, time: matchTime } = formatDateTime(match.fecha);
            
            const homeTeamName = equiposMap[match.equipo_local_id] || `ID: ${match.equipo_local_id}`;
            const awayTeamName = equiposMap[match.equipo_visitante_id] || `ID: ${match.equipo_visitante_id}`;
            const isUpcoming = match.estado?.toLowerCase() === 'próximo' || match.estado?.toLowerCase() === 'proximo' || match.estado?.toLowerCase() === 'programado';
            const isFinished = match.estado?.toLowerCase() === 'finalizado';
            
            return (
              <Card key={match.id} className={cn(
                "transition-all duration-300 group backdrop-blur-sm",
                getCardStyle(match.estado)
              )}>
                <CardContent className="p-0">
                  {/* Header with gradient */}
                  <div className={cn(
                    "p-3 flex justify-between items-center border-b",
                    isUpcoming && "bg-gradient-to-r from-purple-500/20 via-blue-500/25 to-primary/20",
                    isFinished && "bg-gradient-to-r from-green-500/20 via-emerald-500/25 to-teal-500/20"
                  )}>
                    <div className="flex items-center gap-3">
                      {match.jornada && (
                        <div className="flex items-center gap-2">
                          <Trophy className={cn(
                            "w-5 h-5",
                            isUpcoming && "text-purple-500",
                            isFinished && "text-green-500"
                          )} />
                          <span className={cn(
                            "font-black text-xl tracking-tight",
                            isUpcoming && "text-purple-500",
                            isFinished && "text-green-500"
                          )}>J{match.jornada}</span>
                          <span className="text-muted-foreground">•</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-foreground/70" />
                        <span className="font-semibold text-foreground text-sm">{matchDate}</span>
                        {matchTime && (
                          <>
                            <Clock className="w-4 h-4 ml-2 text-foreground/70" />
                            <span className="font-medium text-foreground/90 text-sm">{matchTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge 
                      variant={getStatusVariant(match.estado)}
                      className={cn(
                        "text-xs capitalize px-3 py-1 font-semibold tracking-wide transition-all duration-300",
                        isUpcoming && "bg-purple-500/20 text-purple-700 dark:text-purple-300 hover:bg-purple-500/30 group-hover:bg-purple-500/30 group-hover:scale-105",
                        isFinished && "bg-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-500/30 group-hover:bg-green-500/30 group-hover:scale-105"
                      )}
                    >
                      {match.estado || 'Estado desc.'}
                    </Badge>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      {/* Home Team */}
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={cn(
                          "relative w-16 h-16 rounded-full overflow-hidden bg-muted ring-2 shadow-lg transition-all duration-300 group-hover:shadow-2xl",
                          isUpcoming && "ring-purple-500/30 group-hover:ring-purple-500/50",
                          isFinished && "ring-green-500/30 group-hover:ring-green-500/50"
                        )}>
                          <Image
                            src={match.homeTeamLogo || getAvatarUrl(homeTeamName)}
                            alt={homeTeamName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-bold text-xl tracking-tight group-hover:translate-x-1 transition-transform duration-300">{homeTeamName}</span>
                      </div>

                      {/* Score / VS */}
                      <div className="flex items-center justify-center px-6">
                        {isFinished ? (
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl font-black text-green-600 dark:text-green-400">{match.goles_local || 0}</span>
                            <span className="text-xl text-muted-foreground">-</span>
                            <span className="text-3xl font-black text-green-600 dark:text-green-400">{match.goles_visitante || 0}</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 bg-purple-500/10 px-4 py-2 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                            <Swords className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">VS</span>
                          </div>
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center space-x-3 flex-1 justify-end">
                        <span className="font-bold text-xl tracking-tight group-hover:-translate-x-1 transition-transform duration-300">{awayTeamName}</span>
                        <div className={cn(
                          "relative w-16 h-16 rounded-full overflow-hidden bg-muted ring-2 shadow-lg transition-all duration-300 group-hover:shadow-2xl",
                          isUpcoming && "ring-purple-500/30 group-hover:ring-purple-500/50",
                          isFinished && "ring-green-500/30 group-hover:ring-green-500/50"
                        )}>
                          <Image
                            src={match.awayTeamLogo || getAvatarUrl(awayTeamName)}
                            alt={awayTeamName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

