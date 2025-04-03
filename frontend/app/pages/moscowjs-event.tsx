import Link from "next/link"
import { Calendar, MapPin, Video, Ticket, Star } from "lucide-react"

export default function MoscowQAEvent() {
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
              <Link href="#" className="hover:text-yellow-400">
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
      <main className="flex-1 bg-black bg-opacity-80 relative">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-8 py-12 text-white">
          <h2 className="text-5xl font-bold text-yellow-400 mb-6">
            <Link href="#">MoscowQA 63</Link>
          </h2>

          <div className="max-w-3xl mb-12">
            <p className="text-xl leading-relaxed mb-6">
              Пришла весна, расцвели подснежники и первый MoscowQA в 2025! ⭐ Будем рады видеть вас 27 марта на площадке
              МТС Финтех. Но это не все! Рады сообщить, что теперь мы официально дружим с Докой 🤝 Там всегда можно
              почитать понятны е статьи от разработчиков для разработчиков. Также ребята рады помочь вам и пообщаться в
              чате. Следите за анонсами, чтобы оставаться в курсе событий. 🍕
            </p>
          </div>

          <div className="space-y-8">
            {/* When */}
            <div className="flex items-start">
              <div className="mr-4">
                <Calendar className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Когда</h3>
                <p className="text-xl">27 марта 2025, 18:00</p>
              </div>
            </div>

            {/* Where */}
            <div className="flex items-start">
              <div className="mr-4">
                <MapPin className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Где</h3>
                <p className="text-xl">Москва, проспект Андропова д. 18 к. 1</p>
                <p className="text-xl italic">МТС Финтех</p>
              </div>
            </div>

            {/* Stream */}
            <div className="flex items-start">
              <div className="mr-4">
                <Video className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Трансляция</h3>
                <p className="text-xl">Скоро будет</p>
              </div>
            </div>

            {/* Registration */}
            <div className="flex items-start">
              <div className="mr-4">
                <Ticket className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Регистрация</h3>
                <Link
                  href="https://MoscowQA.timepad.ru/event/3259626/"
                  className="text-xl text-yellow-400 hover:underline"
                >
                  https://MoscowQA.timepad.ru/event/3259626/
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

