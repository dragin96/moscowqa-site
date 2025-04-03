import { Header } from "@/components/layout/header"
import Link from "next/link"
import { Calendar, Users, Clock } from "lucide-react"
import { getEvents, eventToDisplayFormat, Event } from "@/lib/api"
import { generateMetadata } from "@/components/layout/metadata"
import SafeHtml from "@/components/shared/safe-html"

export const metadata = generateMetadata({
  title: "Главная",
  description: "MoscowQA - крупнейшее сообщество тестировщиков в Москве. Регулярные митапы, конференции и обмен опытом.",
  openGraph: {
    title: "MoscowQA - Сообщество тестировщиков Москвы",
    description: "Присоединяйтесь к крупнейшему сообществу тестировщиков в Москве. Регулярные митапы, конференции и обмен опытом.",
  },
})

export default async function EventsPage() {
  // Fetch events from the API with fallback data
  const eventsData = await getEvents()

  // Sort events by date (newest first)
  const sortedEvents = [...(eventsData || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Convert to display format
  const events = sortedEvents.map(eventToDisplayFormat)

  // Function to check if event is upcoming
  const isUpcoming = (event: Event) => {
    return new Date(event.rawDate) > new Date()
  }

  // Разделяем события на предстоящие и прошедшие
  const upcomingEvents = events.filter(event => isUpcoming(event))
  const pastEvents = events.filter(event => !isUpcoming(event))

  const EventCard = ({ event }: { event: Event }) => (
    <article 
      key={event.id} 
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-96 h-72 lg:h-auto bg-gradient-to-br from-pink-600 via-pink-500 to-purple-600 flex-shrink-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
            <span className="text-8xl font-bold mb-4">{event.number}</span>
            <span className="text-lg uppercase tracking-widest font-medium">
              {event.title.includes('x') ? event.title.split('x')[0].trim() : event.title}
            </span>
          </div>
          {isUpcoming(event) && (
            <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Предстоящее
            </div>
          )}
        </div>
        <div className="p-8 lg:p-12 flex-1">
          <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-pink-500" aria-hidden="true" />
              <time dateTime={event.date} className="font-medium">
                {event.date}
              </time>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-pink-500" aria-hidden="true" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-pink-500" aria-hidden="true" />
              <span className="italic">{event.location || 'Место будет объявлено позже'}</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-200">
            <Link href={`/event/${event.id}`}>
              {event.title} {event.number}
            </Link>
          </h3>
          <div className="prose prose-lg max-w-none mb-8">
            <SafeHtml html={event.description} className="text-gray-700 leading-relaxed" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {event.talks && event.talks.length > 0 && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                {event.talks.length} {event.talks.length === 1 ? 'доклад' : 'докладов'}
              </span>
            )}
            {isUpcoming(event) && event.registrationLink && event.registrationLink !== '#' && (
              <Link
                href={event.registrationLink}
                className="inline-flex items-center px-8 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Зарегистрироваться
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
            <Link
              href={`/event/${event.id}`}
              className="inline-flex items-center px-8 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Подробнее
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white text-gray-800 w-full">
        <div className="container mx-auto px-4 py-12 max-w-[1400px]">
          <h1 className="sr-only">MoscowQA - Сообщество тестировщиков Москвы</h1>
          
          {/* Предстоящие события */}
          {upcomingEvents.length > 0 && (
            <section className="mb-20">
              <h2 className="text-4xl font-bold text-pink-600 mb-12">Предстоящие события</h2>
              <div className="space-y-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Прошедшие события */}
          {pastEvents.length > 0 && (
            <section>
              <h2 className="text-4xl font-bold text-gray-600 mb-12">Прошедшие события</h2>
              <div className="space-y-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Нет событий. Следите за обновлениями!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

