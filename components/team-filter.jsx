"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Helper function to generate avatar URL
const getAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=40`;

// Liga MX teams - generate logo URLs dynamically
const teams = [
  { value: "all", label: "Todos los equipos" },
  { value: "america", label: "Club América" },
  { value: "chivas", label: "Guadalajara" },
  { value: "cruzazul", label: "Cruz Azul" },
  { value: "pumas", label: "UNAM Pumas" },
  { value: "tigres", label: "Tigres UANL" },
  { value: "monterrey", label: "Monterrey" },
  { value: "santos", label: "Santos Laguna" },
  { value: "toluca", label: "Toluca" },
].map(team => ({ ...team, logo: getAvatarUrl(team.label) }));

export function TeamFilter() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("all")

  const selectedTeam = teams.find((team) => team.value === value) || teams[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 relative overflow-hidden rounded-full bg-muted">
              <Image
                src={selectedTeam.logo}
                alt={selectedTeam.label}
                fill
                className="object-cover team-logo"
              />
            </div>
            <span className="truncate">
              {selectedTeam.label}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar equipo..." />
          <CommandList>
            <CommandEmpty>No se encontraron equipos.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.value}
                  value={team.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "all" : currentValue) // Ensure clicking selected resets to 'all' or deselects
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <Check className={cn("mr-2 h-4 w-4", value === team.value ? "opacity-100" : "opacity-0")} />
                    <div className="w-5 h-5 mr-2 relative overflow-hidden rounded-full bg-muted">
                      <Image
                        src={team.logo}
                        alt={team.label}
                        fill
                        className="object-cover team-logo"
                      />
                    </div>
                    {team.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


