import { Header } from "@/components/layout/header"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { getEvents, eventToDisplayFormat } from "@/lib/api"
import { generateMetadata } from "@/components/layout/metadata"

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-white text-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <h1 className="sr-only">MoscowQA - Сообщество тестировщиков Москвы</h1>
          <section aria-labelledby="upcoming-events">
            <h2 id="upcoming-events" className="text-4xl font-bold text-pink-600 mb-8">Предстоящие события</h2>
            {events.length > 0 ? (
              <div className="space-y-16">
                {events.map((event) => (
                  <article key={event.id} className="flex mb-16 flex-col md:flex-row">
                    <div className="bg-pink-600 w-48 h-48 flex-shrink-0 relative rounded-lg text-white">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-9xl font-bold">{event.number}</span>
                      </div>
                    </div>
                    <div className="ml-0 md:ml-6 mt-4 md:mt-0">
                      <div className="mb-2 flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                        <time dateTime={event.date}>
                          {event.date} (<span className="italic">{event.venue}</span>)
                        </time>
                      </div>
                      <h3 className="text-4xl font-bold text-pink-600 mb-4">
                        <Link href={`/event/${event.id}`}>MoscowQA {event.number}</Link>
                      </h3>
                      <div className="max-w-3xl">
                        <p className="text-xl leading-relaxed text-gray-700">{event.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl">Нет предстоящих событий. Следите за обновлениями!</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

