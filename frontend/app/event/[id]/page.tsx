import { Header } from "@/components/layout/header"
import { Calendar, MapPin, Video, Ticket } from "lucide-react"
import Link from "next/link"
import { getEventById, formatDate } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function EventPage({ params }: { params: { id: string } }) {
  // Fetch event data from the API with fallback data
  const eventData = await getEventById(Number.parseInt(params.id))

  if (!eventData) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-white text-gray-800">
        <div className="container mx-auto px-8 py-12">
          <h2 className="text-4xl font-bold text-pink-600 mb-6">{eventData.title}</h2>

          <div className="max-w-3xl mb-12">
            {eventData.talks && eventData.talks.length > 0 ? (
              <div className="space-y-6">
                {eventData.talks.map((talk) => (
                  <div key={talk.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{talk.title}</h3>
                    <p className="text-xl leading-relaxed mb-4 text-gray-700">{talk.abstract}</p>
                    {talk.speakers && talk.speakers.length > 0 && (
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Спикер:</span>
                        <Link href={`/speaker/${talk.speakers[0].id}`} className="text-pink-600 hover:underline">
                          {talk.speakers[0].firstName} {talk.speakers[0].lastName}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xl leading-relaxed mb-6 text-gray-700">Информация о докладах появится позже.</p>
            )}
          </div>

          <div className="space-y-8">
            {/* When */}
            <div className="flex items-start">
              <div className="mr-4 bg-pink-600 p-3 rounded-full text-white">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1 text-gray-800">Когда</h3>
                <p className="text-xl text-gray-700">{formatDate(eventData.date)}</p>
              </div>
            </div>

            {/* Where */}
            <div className="flex items-start">
              <div className="mr-4 bg-pink-600 p-3 rounded-full text-white">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1 text-gray-800">Где</h3>
                <p className="text-xl text-gray-700">{eventData.address}</p>
                {eventData.company && <p className="text-xl italic text-gray-600">{eventData.company}</p>}
              </div>
            </div>

            {/* Stream */}
            <div className="flex items-start">
              <div className="mr-4 bg-pink-600 p-3 rounded-full text-white">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1 text-gray-800">Трансляция</h3>
                {eventData.streamLink ? (
                  <Link href={eventData.streamLink} className="text-xl text-pink-600 hover:underline">
                    Смотреть трансляцию
                  </Link>
                ) : (
                  <p className="text-xl text-gray-700">Скоро будет</p>
                )}
              </div>
            </div>

            {/* Registration */}
            <div className="flex items-start">
              <div className="mr-4 bg-pink-600 p-3 rounded-full text-white">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1 text-gray-800">Регистрация</h3>
                {eventData.registrationLink ? (
                  <Link href={eventData.registrationLink} className="text-xl text-pink-600 hover:underline">
                    {eventData.registrationLink}
                  </Link>
                ) : (
                  <p className="text-xl text-gray-700">Регистрация скоро откроется</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

