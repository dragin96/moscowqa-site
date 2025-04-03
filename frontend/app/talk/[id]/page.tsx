import { Header } from "@/components/layout/header"
import { getTalkById, getEventById, formatDate } from "@/lib/api"
import { notFound } from "next/navigation"
import { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Video, FileText, Link as LinkIcon } from "lucide-react"
import SafeHtml from "@/components/shared/safe-html"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const talkData = await getTalkById(Number.parseInt(params.id))
  
  if (!talkData) {
    return {
      title: "Доклад не найден",
      description: "Запрошенный доклад не найден"
    }
  }

  return {
    title: `${talkData.title} - MoscowQA`,
    description: talkData.abstract || "Доклад на митапе MoscowQA",
    openGraph: {
      title: `${talkData.title} - MoscowQA`,
      description: talkData.abstract || "Доклад на митапе MoscowQA"
    }
  }
}

export default async function TalkPage({ params }: { params: { id: string } }) {
  const talkData = await getTalkById(Number.parseInt(params.id))
  const eventData = talkData ? await getEventById(talkData.event_id) : null

  if (!talkData) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-600 via-pink-500 to-purple-600 text-white py-20">
          <div className="container mx-auto px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{talkData.title}</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Description */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Описание</h2>
                <div className="prose prose-lg max-w-none">
                  {talkData.abstract ? (
                    <SafeHtml 
                      html={talkData.abstract}
                      className="text-lg leading-relaxed text-gray-700"
                    />
                  ) : (
                    <p className="text-lg text-gray-700">Описание доклада появится позже</p>
                  )}
                </div>
              </section>

              {/* Preview */}
              {talkData.preview && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Анонс</h2>
                  <div className="prose prose-lg max-w-none">
                    <SafeHtml 
                      html={talkData.preview}
                      className="text-lg leading-relaxed text-gray-700"
                    />
                  </div>
                </section>
              )}

              {/* Materials */}
              {(talkData.videoLink || talkData.slidesLink || talkData.materialsLink) && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Материалы</h2>
                  <div className="space-y-4">
                    {talkData.videoLink && (
                      <Link href={talkData.videoLink} className="block">
                        <div className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                          <div className="flex items-center">
                            <div className="mr-3 bg-pink-600 p-2 rounded-full text-white">
                              <Video className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">Видео доклада</h3>
                              <p className="text-sm text-gray-600">Смотреть запись выступления</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {talkData.slidesLink && (
                      <Link href={talkData.slidesLink} className="block">
                        <div className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                          <div className="flex items-center">
                            <div className="mr-3 bg-pink-600 p-2 rounded-full text-white">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">Презентация</h3>
                              <p className="text-sm text-gray-600">Смотреть слайды</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {talkData.materialsLink && (
                      <Link href={talkData.materialsLink} className="block">
                        <div className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                          <div className="flex items-center">
                            <div className="mr-3 bg-pink-600 p-2 rounded-full text-white">
                              <LinkIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">Дополнительные материалы</h3>
                              <p className="text-sm text-gray-600">Смотреть дополнительные материалы</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Speakers */}
              {talkData.speakers && talkData.speakers.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Спикеры</h2>
                  <div className="space-y-3">
                    {talkData.speakers.map((speaker) => (
                      <Link href={`/speaker/${speaker.id}`} key={speaker.id} className="block">
                        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 hover:shadow transition-shadow duration-200">
                          <div className="flex items-center">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                              {speaker.photo ? (
                                <Image
                                  src={speaker.photo}
                                  alt={`${speaker.firstName} ${speaker.lastName}`}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-xl font-bold text-gray-400">
                                    {speaker.firstName[0]}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-gray-800">
                                {speaker.firstName} {speaker.lastName}
                              </h3>
                              {speaker.company && (
                                <p className="text-xs text-gray-600">{speaker.company}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Event Info */}
              {eventData && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Митап</h2>
                  <Link href={`/event/${talkData.event_id}`} className="block">
                    <div className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center">
                        <div className="mr-3 bg-pink-600 p-2 rounded-full text-white">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            MoscowQA #{eventData.number}
                          </h3>
                          <p className="text-sm text-gray-600">{formatDate(eventData.date)}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 