import { Header } from "@/components/layout/header"
import Image from "next/image"
import Link from "next/link"
import { getSpeakerById } from "@/lib/api"
import { notFound } from "next/navigation"
import SafeHtml from "@/components/shared/safe-html"

export default async function SpeakerPage({ params }: { params: { id: string } }) {
  // Fetch speaker data from the API with fallback data
  const speaker = await getSpeakerById(Number.parseInt(params.id))

  if (!speaker) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-white text-gray-800">
        <div className="container mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Speaker Image */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                <Image
                  src={speaker.photo || "/placeholder.svg?height=400&width=400"}
                  alt={`${speaker.firstName} ${speaker.lastName}`}
                  className="object-cover rounded-full"
                  fill
                />
              </div>
            </div>

            {/* Speaker Info */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-4xl font-bold text-pink-600 mb-4">
                {speaker.firstName} {speaker.lastName}
              </h1>

              <div className="mb-6">
                {speaker.company && (
                  <div className="text-xl text-gray-600">
                    <SafeHtml html={speaker.company} />
                  </div>
                )}
                {speaker.position && (
                  <div className="text-xl text-gray-600 mt-2">
                    <SafeHtml html={speaker.position} />
                  </div>
                )}
              </div>

              {speaker.bio && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">О спикере</h2>
                  <div className="text-lg text-gray-700">
                    <SafeHtml html={speaker.bio} />
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-4 mb-8">
                {speaker.telegram && (
                  <Link
                    href={`https://t.me/${speaker.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:underline"
                  >
                    Telegram
                  </Link>
                )}
                {speaker.github && (
                  <Link
                    href={`https://github.com/${speaker.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:underline"
                  >
                    GitHub
                  </Link>
                )}
              </div>

              {/* Talks */}
              {speaker.talks && speaker.talks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Доклады</h2>
                  <div className="space-y-6">
                    {speaker.talks.map((talk) => (
                      <Link href={`/talk/${talk.id}`} key={talk.id} className="block">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                          <h3 className="text-xl font-bold mb-2 text-gray-800">{talk.title}</h3>
                          <div className="mb-4 text-gray-700">
                            <SafeHtml html={talk.abstract || "Описание доклада появится позже"} />
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {talk.videoLink && (
                              <Link
                                href={talk.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:underline"
                              >
                                Видео
                              </Link>
                            )}
                            {talk.slidesLink && (
                              <Link
                                href={talk.slidesLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:underline"
                              >
                                Слайды
                              </Link>
                            )}
                            {talk.materialsLink && (
                              <Link
                                href={talk.materialsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:underline"
                              >
                                Материалы
                              </Link>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

