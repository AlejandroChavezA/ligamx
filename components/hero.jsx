import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronRight, TrendingUp } from "lucide-react"

// Helper function to get team icon SVG
const getTeamIcon = (teamName) => {
  const icons = {
    "América": `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="60" fill="#6D28D9" fill-opacity="0.1"/>
      <path d="M64 32C48 32 35 45 35 61C35 77 48 90 64 90C80 90 93 77 93 61C93 45 80 32 64 32ZM64 40C75 40 84 49 84 61C84 73 75 82 64 82C53 82 44 73 44 61C44 49 53 40 64 40Z" fill="#6D28D9" fill-opacity="0.3"/>
      <path d="M76 50L64 70L52 50L64 44L76 50Z" fill="#6D28D9"/>
      <path d="M64 75L52 55L76 55L64 75Z" fill="#6D28D9"/>
    </svg>`,
    "Cruz Azul": `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="60" fill="#6D28D9" fill-opacity="0.1"/>
      <path d="M35 35H93V93H35V35Z" fill="#6D28D9" fill-opacity="0.3"/>
      <path d="M45 45H83V83H45V45Z" fill="#6D28D9" fill-opacity="0.2"/>
      <path d="M58 38H70V90H58V38Z" fill="#6D28D9"/>
      <path d="M38 58H90V70H38V58Z" fill="#6D28D9"/>
    </svg>`,
    "Guadalajara": `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="60" fill="#6D28D9" fill-opacity="0.1"/>
      <path d="M64 34L80 50L64 66L48 50L64 34Z" fill="#6D28D9"/>
      <path d="M64 62L80 78L64 94L48 78L64 62Z" fill="#6D28D9"/>
      <path d="M45 48L61 64L45 80L29 64L45 48Z" fill="#6D28D9" fill-opacity="0.3"/>
      <path d="M83 48L99 64L83 80L67 64L83 48Z" fill="#6D28D9" fill-opacity="0.3"/>
    </svg>`,
  };

  // Convert SVG to data URL
  const svgToDataUrl = (svg) => {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // Return the corresponding icon or a default shield
  const defaultIcon = `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="60" fill="#6D28D9" fill-opacity="0.1"/>
    <path d="M64 32L88 44V68C88 80 77 90 64 94C51 90 40 80 40 68V44L64 32Z" fill="#6D28D9" fill-opacity="0.3"/>
    <path d="M64 38L82 47V68C82 77 73 85 64 88C55 85 46 77 46 68V47L64 38Z" fill="#6D28D9"/>
  </svg>`;

  return svgToDataUrl(icons[teamName] || defaultIcon);
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-primary/70 to-purple-700/80">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMTBoMnYyMHptLTIgMGgtMlYxMGgydjIwek0zMCAzMGgtMlYxMGgydjIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-5" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
              <span className="block">Liga MX</span>
              <span className="block bg-gradient-to-r from-purple-200/90 to-purple-100/90 bg-clip-text text-transparent">
                Estadísticas en vivo
              </span>
            </h1>
            <p className="mt-6 text-xl text-purple-100/80 max-w-xl">
              Descubre todos los datos y estadísticas de la Liga MX en tiempo real. 
              Resultados, posiciones, y análisis detallado de cada partido.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <CalendarDays className="h-6 w-6 text-purple-200/80" />
                  <span className="ml-2 text-sm font-medium text-purple-200/80">Jornada</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white/90">15</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-purple-200/80" />
                  <span className="ml-2 text-sm font-medium text-purple-200/80">Partidos</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white/90">9</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white/80 text-primary hover:bg-white/90 transition-colors"
              >
                <Link href="/partidos">
                  Ver partidos
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 text-white/90 border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <Link href="/estadisticas">
                  Explorar estadísticas
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Featured Match */}
          <div className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-lg font-semibold text-white/90 mb-4">Próximo partido destacado</h3>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 bg-white/5">
                    <Image
                      src={getTeamIcon("América")}
                      alt="América"
                      width={64}
                      height={64}
                      className="object-contain p-2"
                    />
                  </div>
                  <span className="text-lg font-bold text-white/90">América</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-purple-200/80">VS</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-white/90">Cruz Azul</span>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 bg-white/5">
                    <Image
                      src={getTeamIcon("Cruz Azul")}
                      alt="Cruz Azul"
                      width={64}
                      height={64}
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center text-purple-200/80">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span className="text-sm">Sábado, 20:00 hrs</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-white/90 bg-white-200 border-white/10 hover:bg-gray-900/10"
                >
                  <Link href="/partidos/1">
                    Ver detalles
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



