import Link from "next/link"
import { Star } from "lucide-react"
import Image from "next/image"

export default function SpeakersPage() {
  // Speaker data
  const speakers = [
    {
      name: "Коллаков Александр",
      company: "МТС Финтех",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Ямилов Булат",
      company: "",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Уварова Юлия",
      company: "",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Шандер Кристиан",
      company: "Т-Банк",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Геннадий Вятитов",
      company: "МТС Digital",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Денис Филипкин",
      company: "МТС Диджитал",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Аврора Ренард",
      company: "SberDevices",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Александр Ермолов",
      company: "",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Морозов Владимир",
      company: "Цифромед",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Мацеха Алексей",
      company: "Росбанк",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Карпенко Никита",
      company: "Райффайзенбанк",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Тимур Гафиулин",
      company: "Samokat.Tech",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Владислав Молоцило",
      company: "X5 Tech",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Виктор Щеглов",
      company: "Recraft.ai",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Зар Захаров",
      company: "VK Музыка",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center bg-black text-white">
        <div className="flex items-center">
          <div className="bg-yellow-400 h-16 w-16 flex items-center justify-center relative">
            <Star className="absolute top-1 left-1 w-4 h-4 text-black" />
            <span className="text-black text-4xl font-bold">JS</span>
          </div>
          <h1 className="text-3xl font-bold px-4">MoscowQA</h1>
        </div>
        <nav className="ml-auto mr-4">
          <ul className="flex space-x-6">
            <li className="uppercase font-medium">
              <Link href="#" className="hover:text-yellow-400">
                События
              </Link>
            </li>
            <li className="uppercase font-medium">
              <Link href="#" className="hover:text-yellow-400">
                Видео
              </Link>
            </li>
            <li className="uppercase font-medium">
              <Link href="#" className="hover:text-yellow-400 bg-yellow-400 text-black px-4 py-2">
                Докладчики
              </Link>
            </li>
            <li className="uppercase font-medium">
              <Link href="#" className="hover:text-yellow-400">
                Подать доклад
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {speakers.map((speaker, index) => (
              <div key={index} className="mb-8">
                <div className="relative aspect-square mb-2 overflow-hidden">
                  <Image
                    src={speaker.image || "/placeholder.svg"}
                    alt={speaker.name}
                    className="object-cover grayscale"
                    fill
                  />
                </div>
                <Link href="#" className="block text-yellow-400 font-medium hover:underline">
                  {speaker.name}
                </Link>
                <div className="text-sm italic">{speaker.company}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

