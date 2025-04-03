import Link from "next/link"
import { Header } from "@/components/layout/header"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-9xl font-bold text-pink-600 mb-4">404</h2>
          <h3 className="text-4xl mb-6 text-gray-800">Страница не найдена</h3>
          <p className="text-xl mb-8 text-gray-700">Запрашиваемая страница не существует или была удалена.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700"
          >
            Вернуться на главную
          </Link>
        </div>
      </main>
    </div>
  )
}

