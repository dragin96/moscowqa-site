import { Header } from "@/components/layout/header"
import { Calendar, MapPin, Video, Ticket, Clock } from "lucide-react"
import Link from "next/link"
import { getEventById, formatDate } from "@/lib/api"
import { notFound } from "next/navigation"
import { Metadata } from 'next'
import Image from "next/image"
import SafeHtml from "@/components/shared/safe-html"
import { SpeakerCard } from "@/components/speakers/speaker-card"
import { SpeakerCompact } from "@/components/speakers/speaker-compact"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const eventData = await getEventById(Number.parseInt(params.id))
  
  if (!eventData) {
    return {
      title: "Событие не найдено",
      description: "Запрошенное событие не найдено"
    }
  }

  return {
    title: `${eventData.title} #${eventData.number}`,
    description: `MoscowQA митап #${eventData.number}. ${eventData.talks?.map(t => t.title).join(". ")}`,
    openGraph: {
      title: `${eventData.title} #${eventData.number} - MoscowQA`,
      description: `Присоединяйтесь к митапу MoscowQA #${eventData.number}! ${eventData.talks?.length} докладов от экспертов в тестировании.`
    }
  }
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const eventData = await getEventById(Number.parseInt(params.id))

  if (!eventData) {
    notFound()
  }

  const isUpcoming = new Date(eventData.date) > new Date()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-600 via-pink-500 to-purple-600 text-white py-20">
          <div className="container mx-auto px-8">
            <div className="flex items-center gap-8 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
                <span className="text-6xl font-bold">#{eventData.number}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{eventData.title}</h1>
            </div>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(eventData.date)}
              </div>
              {eventData.time && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                  <Clock className="w-5 h-5 mr-2" />
                  {eventData.time}
                </div>
              )}
              {eventData.location && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  {eventData.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-8 py-12">
          {/* Talks Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Доклады</h2>
            {eventData.talks && eventData.talks.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {eventData.talks.map((talk) => (
                  <Link href={`/talk/${talk.id}`} key={talk.id} className="block">
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800">{talk.title}</h3>
                      <SafeHtml 
                        html={talk.abstract || "Описание доклада появится позже"}
                        className="text-lg leading-relaxed mb-6 text-gray-700"
                      />
                      {talk.speakers && talk.speakers.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {talk.speakers.map((speaker) => (
                            <SpeakerCompact key={speaker.id} speaker={speaker} />
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xl text-gray-700 bg-gray-50 rounded-lg p-8 text-center">
                Информация о докладах появится позже
              </p>
            )}
          </section>

          {/* Speakers Section */}
          {eventData.talks && eventData.talks.some(talk => talk.speakers && talk.speakers.length > 0) && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Спикеры</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {eventData.talks && Array.from(new Set(eventData.talks.flatMap(talk => talk.speakers || []).map(speaker => speaker.id)))
                  .map(speakerId => {
                    const speaker = eventData.talks?.flatMap(talk => talk.speakers || []).find(s => s && s.id === speakerId);
                    if (!speaker) return null;
                    
                    return <SpeakerCard key={speaker.id} speaker={speaker} showBio />;
                  })}
              </div>
            </section>
          )}

          {/* Event Details */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* Location & Time */}
            <div className="space-y-8">
              <Link href={`https://maps.google.com/?q=${encodeURIComponent(eventData.location)}`} className="block">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-start">
                    <div className="mr-4 bg-pink-600 p-3 rounded-full text-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">Место проведения</h3>
                      <p className="text-xl text-gray-700">{eventData.location || "Место уточняется"}</p>
                      {eventData.venue && (
                        <p className="text-lg italic text-gray-600 mt-1">{eventData.venue}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start">
                  <div className="mr-4 bg-pink-600 p-3 rounded-full text-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Место проведения</h3>
                    <p className="text-xl text-gray-700">{eventData.location || "Место уточняется"}</p>
                    {eventData.venue && (
                      <p className="text-lg italic text-gray-600 mt-1">{eventData.venue}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                <div className="flex items-start">
                  <div className="mr-4 bg-pink-600 p-3 rounded-full text-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">Дата и время</h3>
                    <p className="text-xl text-gray-700">{formatDate(eventData.date)}</p>
                    {eventData.time && (
                      <p className="text-lg text-gray-600 mt-1">Начало в {eventData.time}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stream & Registration */}
            <div className="space-y-8">
              {isUpcoming && eventData.registrationLink && (
                <Link href={eventData.registrationLink} className="block">
                  <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <h3 className="text-2xl font-bold mb-4 flex items-center">
                      <Ticket className="w-6 h-6 mr-2" />
                      Регистрация
                    </h3>
                    <div className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                      Зарегистрироваться
                    </div>
                  </div>
                </Link>
              )}

              {eventData.streamLink && (
                <Link href={eventData.streamLink} className="block">
                  <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                      <Video className="w-6 h-6 mr-2 text-pink-600" />
                      Трансляция
                    </h3>
                    <div className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors">
                      Смотреть трансляцию
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

