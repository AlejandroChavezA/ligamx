"use client"

import Link from "next/link"
import Image from "next/image"
import { BarChart3, PieChart, TrendingUp, Trophy, Goal, Users, Star, Award, Timer, Activity, Table } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamFilter } from "@/components/team-filter"
import { useState, useEffect } from "react"

// Helper function to generate avatar URL (reused from other components)
const getAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;

// Function to calculate standings from matches
const calculateStandings = (matches, equiposMap) => {
  console.log('Calculating standings with matches:', JSON.stringify(matches, null, 2));
  console.log('Using equipos map:', equiposMap);

  const standings = {};

  // Initialize standings object
  Object.values(equiposMap).forEach(teamName => {
    standings[teamName] = {
      name: teamName,
      points: 0,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0
    };
  });

  // Calculate statistics from matches
  matches.forEach(match => {
    console.log('Processing match:', match);
    
    // Verificar si el partido está finalizado y tiene los datos necesarios
    if (match.estado?.toLowerCase() === 'finalizado' && 
        match.equipo_local && 
        match.equipo_visitante && 
        match.goles_local !== undefined && 
        match.goles_visitante !== undefined) {
      
      const localTeam = match.equipo_local;
      const visitorTeam = match.equipo_visitante;
      
      console.log('Match teams:', { localTeam, visitorTeam });
      console.log('Match goals:', { local: match.goles_local, visitor: match.goles_visitante });
      
      if (standings[localTeam] && standings[visitorTeam]) {
        const localGoals = parseInt(match.goles_local) || 0;
        const visitorGoals = parseInt(match.goles_visitante) || 0;

        // Update local team stats
        standings[localTeam].played++;
        standings[localTeam].goalsFor += localGoals;
        standings[localTeam].goalsAgainst += visitorGoals;

        // Update visitor team stats
        standings[visitorTeam].played++;
        standings[visitorTeam].goalsFor += visitorGoals;
        standings[visitorTeam].goalsAgainst += localGoals;

        if (localGoals > visitorGoals) {
          standings[localTeam].wins++;
          standings[localTeam].points += 3;
          standings[visitorTeam].losses++;
        } else if (localGoals < visitorGoals) {
          standings[visitorTeam].wins++;
          standings[visitorTeam].points += 3;
          standings[localTeam].losses++;
        } else {
          standings[localTeam].draws++;
          standings[visitorTeam].draws++;
          standings[localTeam].points += 1;
          standings[visitorTeam].points += 1;
        }
      }
    }
  });

  console.log('Final standings before sorting:', standings);

  // Calculate goal difference and convert to array
  const sortedStandings = Object.values(standings)
    .map(team => ({
      ...team,
      goalDifference: team.goalsFor - team.goalsAgainst
    }))
    .sort((a, b) => 
      b.points - a.points || 
      b.goalDifference - a.goalDifference || 
      b.goalsFor - a.goalsFor
    );

  console.log('Final sorted standings:', sortedStandings);
  return sortedStandings;
};

// Function to calculate top scorers
const calculateTopScorers = (matches, equiposMap) => {
  const scorers = {};
  
  console.log('Analyzing matches for scorers:', matches); // Debug log

  matches.forEach(match => {
    if (match.estado?.toLowerCase() === 'finalizado') {
      // Get goals from local team
      const localGoals = parseInt(match.goles_local) || 0;
      const visitorGoals = parseInt(match.goles_visitante) || 0;
      
      // If there are goals, add a placeholder scorer
      if (localGoals > 0) {
        const localTeam = equiposMap[match.local_id];
        const scorerName = `Jugador ${localTeam}`;
        if (!scorers[scorerName]) {
          scorers[scorerName] = {
            name: scorerName,
            team: localTeam,
            goals: 0
          };
        }
        scorers[scorerName].goals += localGoals;
      }
      
      if (visitorGoals > 0) {
        const visitorTeam = equiposMap[match.visitante_id];
        const scorerName = `Jugador ${visitorTeam}`;
        if (!scorers[scorerName]) {
          scorers[scorerName] = {
            name: scorerName,
            team: visitorTeam,
            goals: 0
          };
        }
        scorers[scorerName].goals += visitorGoals;
      }
    }
  });

  console.log('Calculated scorers:', scorers); // Debug log

  return Object.values(scorers)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 5); // Get top 5 scorers
};

// Function to calculate overall stats
const calculateOverallStats = (matches) => {
  let totalGoals = 0;
  let totalMatches = 0;

  matches.forEach(match => {
    if (match.estado?.toLowerCase() === 'finalizado') {
      totalMatches++;
      totalGoals += (parseInt(match.goles_local) || 0) + (parseInt(match.goles_visitante) || 0);
    }
  });

  return {
    totalGoals,
    totalMatches,
    averageGoals: totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : 0
  };
};

export default function EstadisticasPage() {
  const [matches, setMatches] = useState([]);
  const [equiposMap, setEquiposMap] = useState({});
  const [standings, setStandings] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [overallStats, setOverallStats] = useState({ totalGoals: 0, totalMatches: 0, averageGoals: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from API...');
        const [matchesRes, equiposRes] = await Promise.all([
          fetch('https://fullstack4-dte6hbhbh4akaubk.canadacentral-01.azurewebsites.net/api/students/sas/partidos'),
          fetch('https://fullstack4-dte6hbhbh4akaubk.canadacentral-01.azurewebsites.net/api/students/sas/equipos')
        ]);

        if (!matchesRes.ok || !equiposRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const matchesData = await matchesRes.json();
        const equiposData = await equiposRes.json();

        console.log('Raw matches data:', JSON.stringify(matchesData, null, 2));
        console.log('Raw equipos data:', JSON.stringify(equiposData, null, 2));

        // Create equipos map
        const equiposMapping = {};
        equiposData.forEach(equipo => {
          equiposMapping[equipo.id] = equipo.nombre;
        });

        console.log('Equipos mapping:', equiposMapping);

        setMatches(matchesData);
        setEquiposMap(equiposMapping);
        
        // Calculate all statistics
        console.log('Calculating standings...');
        const calculatedStandings = calculateStandings(matchesData, equiposMapping);
        console.log('Calculated standings:', calculatedStandings);

        console.log('Calculating top scorers...');
        const calculatedTopScorers = calculateTopScorers(matchesData, equiposMapping);
        console.log('Calculated top scorers:', calculatedTopScorers);

        console.log('Calculating overall stats...');
        const calculatedOverallStats = calculateOverallStats(matchesData);
        console.log('Calculated overall stats:', calculatedOverallStats);

        setStandings(calculatedStandings);
        setTopScorers(calculatedTopScorers);
        setOverallStats(calculatedOverallStats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-primary/10">
      {/* Header Section */}
      <div className="pt-12 pb-8 bg-gradient-to-br from-purple-500 via-blue-500 to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">Estadísticas Liga MX</h1>
          <p className="mt-3 text-lg text-purple-100 tracking-wide">Análisis detallado y estadísticas de la temporada actual</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
            <div className="h-2 bg-primary"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold">Goles Totales</CardTitle>
              <Goal className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{overallStats.totalGoals}</div>
              <p className="text-xs text-muted-foreground font-medium">Promedio de {overallStats.averageGoals} por partido</p>
              <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
            <div className="h-2 bg-blue-500"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold">Partidos Jugados</CardTitle>
              <Activity className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{overallStats.totalMatches}</div>
              <p className="text-xs text-muted-foreground font-medium">Jornada actual: 15</p>
              <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
            <div className="h-2 bg-green-500"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold">Promedio por Partido</CardTitle>
              <Timer className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{overallStats.averageGoals}</div>
              <p className="text-xs text-muted-foreground font-medium">Goles por encuentro</p>
              <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 pulse-on-hover">
            <div className="h-2 bg-yellow-400"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold">Equipos</CardTitle>
              <Star className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{standings.length}</div>
              <p className="text-xs text-muted-foreground font-medium">Participantes del torneo</p>
              <p className="text-xs text-primary font-bold mt-2">Liga MX Apertura 2023</p>
            </CardContent>
          </Card>
        </div>

        {/* Standings Table */}
        <Card className="bg-card rounded-xl shadow-lg border backdrop-blur-sm mb-8">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Table className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold">Tabla General</CardTitle>
              <CardDescription>Clasificación actual del torneo</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Cargando tabla...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pos</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Equipo</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">PJ</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">G</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">E</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">P</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">GF</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">GC</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">DIF</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team, index) => (
                      <tr 
                        key={team.name}
                        className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium
                            ${index < 4 ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-primary/10 ring-1 ring-primary/20">
                              <Image
                                src={getAvatarUrl(team.name)}
                                alt={team.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium text-foreground">{team.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4 text-muted-foreground">{team.played}</td>
                        <td className="text-center py-3 px-4 text-muted-foreground">{team.wins}</td>
                        <td className="text-center py-3 px-4 text-muted-foreground">{team.draws}</td>
                        <td className="text-center py-3 px-4 text-muted-foreground">{team.losses}</td>
                        <td className="text-center py-3 px-4 text-muted-foreground">{team.goalsFor}</td>
                        <td className="text-center py-3 px-4 text-muted-foreground">{team.goalsAgainst}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`font-medium ${
                            team.goalDifference > 0 ? 'text-green-500' :
                            team.goalDifference < 0 ? 'text-red-500' :
                            'text-muted-foreground'
                          }`}>
                            {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="font-bold text-primary">{team.points}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Scorers Section */}
        <Card className="bg-card rounded-xl shadow-lg border backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Trophy className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold">Tabla de Goleadores</CardTitle>
              <CardDescription>Los mejores anotadores de la temporada</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {topScorers.map((scorer, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-primary/5 hover:from-purple-500/10 hover:to-primary/10 transition-colors">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-primary/10 ring-2 ring-primary/30">
                    <Image
                      src={getAvatarUrl(scorer.name)}
                      alt={scorer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{scorer.name}</h4>
                    <p className="text-sm text-muted-foreground">{scorer.team}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{scorer.goals}</p>
                      <p className="text-xs text-muted-foreground">Goles</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
