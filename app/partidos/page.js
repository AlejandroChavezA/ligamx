"use client"; // Make it a Client Component

import { useState, useEffect } from "react";
import Link from "next/link"; // Keep Link if needed elsewhere
import { CalendarDays } from "lucide-react"
import { MatchList } from "@/components/match-list"
import { TeamFilter } from "@/components/team-filter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card as FilterCard } from "@/components/ui/card"; // Alias Card to avoid conflict if needed

// Function to fetch partidos - can be defined outside or imported
async function getPartidos() {
  try {
    const res = await fetch('http://localhost:3010/api/students/sas/partidos', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch partidos');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error in getPartidos:", error);
    return [];
  }
}

// Function to fetch equipos
async function getEquipos() {
  try {
    const res = await fetch('http://localhost:3010/api/students/sas/equipos', { cache: 'no-store' }); // Use equipos endpoint
    if (!res.ok) throw new Error('Failed to fetch equipos');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error in getEquipos:", error);
    return [];
  }
}

export default function PartidosPage() {
  const [allPartidos, setAllPartidos] = useState([]);
  const [filteredPartidos, setFilteredPartidos] = useState([]);
  const [equiposMap, setEquiposMap] = useState({}); // State for equipos map {id: nombre}
  const [temporadas, setTemporadas] = useState([]);
  const [selectedTemporada, setSelectedTemporada] = useState('todos');
  const [jornadas, setJornadas] = useState([]);
  const [selectedJornada, setSelectedJornada] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data (partidos and equipos)
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [partidosData, equiposData] = await Promise.all([
          getPartidos(),
          getEquipos()
        ]);

        setAllPartidos(partidosData);
        setFilteredPartidos(partidosData);

        // Create equipos map
        const map = {};
        equiposData.forEach(equipo => {
          map[equipo.id] = equipo.nombre;
        });
        setEquiposMap(map);

        // Extract unique temporadas (using nombre)
        const uniqueTemporadas = [...new Set(partidosData.map(p => p.nombre).filter(Boolean))];
        uniqueTemporadas.sort((a, b) => b.localeCompare(a));
        setTemporadas(uniqueTemporadas);

        // Extract unique jornadas
        const uniqueJornadas = [...new Set(partidosData.map(p => p.jornada).filter(j => j != null))];
        uniqueJornadas.sort((a, b) => a - b); // Sort numerically
        setJornadas(uniqueJornadas);

      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Apply filters whenever selections change
  useEffect(() => {
    let currentFiltered = allPartidos;

    // Filter by temporada
    if (selectedTemporada !== 'todos') {
      currentFiltered = currentFiltered.filter(p => p.nombre === selectedTemporada);
    }

    // Filter by jornada
    if (selectedJornada !== 'todos') {
      // Convert selectedJornada back to number for comparison
      const jornadaNum = parseInt(selectedJornada, 10);
      currentFiltered = currentFiltered.filter(p => p.jornada === jornadaNum);
    }

    // Filter by status
    if (selectedStatus !== 'todos') {
      currentFiltered = currentFiltered.filter(p => {
        const statusLower = p.estado?.toLowerCase();
        if (selectedStatus === 'finalizados') return statusLower === 'finalizado';
        if (selectedStatus === 'proximos') return statusLower === 'próximo' || statusLower === 'proximo' || statusLower === 'programado';
        return false;
      });
    }

    setFilteredPartidos(currentFiltered);
  }, [selectedTemporada, selectedJornada, selectedStatus, allPartidos]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="pt-8 pb-4 bg-gradient-to-r liga-mx-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Partidos Liga MX</h1>
          <p className="mt-2 text-purple-100">Todos los partidos de la temporada actual con estadísticas detalladas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <CalendarDays className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-2xl font-bold text-foreground">Calendario de partidos</h2>
          </div>
          <TeamFilter />
        </div>

        <FilterCard className="mb-8 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center flex-wrap">
            <div className="flex-grow md:flex-grow-0">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Temporada</label>
              <Select value={selectedTemporada} onValueChange={setSelectedTemporada}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Temporada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  {temporadas.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-grow md:flex-grow-0">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Jornada</label>
              <Select value={selectedJornada} onValueChange={setSelectedJornada}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Jornada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  {jornadas.map(j => <SelectItem key={j} value={String(j)}>{`Jornada ${j}`}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-grow md:flex-grow-0 md:ml-auto">
              <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
                  <TabsTrigger value="proximos">Próximos</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </FilterCard>

        <div className="mt-8">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-10">Cargando partidos...</p>
          ) : filteredPartidos.length === 0 ? (
            <div className="text-center py-10 bg-card rounded-lg border"><p className="text-muted-foreground">No se encontraron partidos con los filtros seleccionados.</p></div>
          ) : (
            <MatchList partidos={filteredPartidos} equiposMap={equiposMap} />
          )}
        </div>
      </div>
    </div>
  )
}

