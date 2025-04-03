import { Header } from "@/components/layout/header"
import Link from "next/link"
import Image from "next/image"
import { getTalks } from "@/lib/api"

export default async function VideoPage() {
  // Fetch talks from the API with fallback data
  const allTalks = await getTalks() || []

  // Filter talks that have video links
  const talksWithVideos = allTalks.filter((talk) => talk.videoLink)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white text-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <h2 className="text-4xl font-bold text-pink-600 mb-8">Видео</h2>

          {talksWithVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talksWithVideos.map((talk) => (
                <div key={talk.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <div className="relative aspect-video">
                    {/* Video thumbnail - would be better with actual thumbnails */}
                    {talk.preview ? (
                      <Image
                        src={talk.preview}
                        alt={talk.title}
                        className="object-cover"
                        fill
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl text-pink-600">▶️</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{talk.title}</h3>

                    {talk.speakers && talk.speakers.length > 0 && (
                      <div className="flex items-center mb-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src={talk.speakers[0].photo || "/placeholder.svg?height=50&width=50"}
                            alt={`${talk.speakers[0].firstName} ${talk.speakers[0].lastName}`}
                            className="object-cover rounded-full"
                            fill
                          />
                        </div>
                        <Link href={`/speaker/${talk.speakers[0].id}`} className="text-pink-600 hover:underline">
                          {talk.speakers[0].firstName} {talk.speakers[0].lastName}
                        </Link>
                      </div>
                    )}

                    <Link
                      href={talk.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-pink-600 text-white px-4 py-2 rounded-md font-medium hover:bg-pink-700"
                    >
                      Смотреть видео
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-700">Видеозаписи докладов MoscowQA скоро появятся. Следите за обновлениями!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

