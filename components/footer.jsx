import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Liga MX Stats</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Estadísticas deportivas en tiempo real de la Liga MX. Todos los datos, resultados y análisis que
              necesitas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Navegación</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partidos"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Partidos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/equipos"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Equipos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/estadisticas"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Estadísticas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/privacidad"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terminos"
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Síguenos</h3>
            <div className="mt-2 flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Liga MX Stats. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
            Liga MX Stats no está afiliado oficialmente con la Liga MX.
          </p>
        </div>
      </div>
    </footer>
  )
}

