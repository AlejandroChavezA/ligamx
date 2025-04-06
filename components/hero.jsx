import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="liga-mx-gradient">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Estadísticas de la Liga MX en tiempo real
            </h1>
            <p className="mt-4 text-lg text-purple-100">
              Toda la información sobre partidos, equipos, tarjetas y tiros de esquina de la Liga MX en un solo lugar.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/partidos">Ver partidos recientes</Link>
              </Button>
              <Button asChild size="lg" variant="outline"  className="bg-white text-primary hover:bg-gray-100">
                <Link href="/estadisticas">Explorar estadísticas</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative h-64 overflow-hidden rounded-lg">
            <Image 
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80"
              alt="Acción de fútbol" 
              fill 
              className="object-cover" 
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}



