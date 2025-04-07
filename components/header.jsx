"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Partidos", href: "/partidos" },
  { name: "Equipos", href: "/equipos" },
  { name: "Estadísticas", href: "/estadisticas" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      {/* Top bar with logo and navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <Image
                src="/img/logo.png"
                alt="Liga MX Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Liga<span className="bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">MX</span>Stats
            </h1>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Abrir menú</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-all duration-300 hover:text-primary relative py-1",
                pathname === item.href
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <ModeToggle />
          <Button asChild size="sm" variant="default" className="font-semibold">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background/95 backdrop-blur-md px-6 py-6 sm:max-w-sm border-l">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src="/img/logo.png"
                    alt="Liga MX Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="font-bold text-xl">
                  Liga<span className="bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-transparent">MX</span>Stats
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Cerrar menú</span>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-1.5 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-4 py-2.5 text-base font-semibold transition-all duration-300",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium text-muted-foreground">Cambiar tema</span>
                    <ModeToggle />
                  </div>
                  <div className="px-4">
                    <Button asChild className="w-full font-semibold">
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


