import { Header } from "@/components/layout/header"
import Link from "next/link"
import Image from "next/image"
import { getSpeakers } from "@/lib/api"

export default async function SpeakersPage() {
  // Fetch speakers from the API with fallback data
  const speakers = await getSpeakers()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-white text-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <h2 className="text-4xl font-bold text-pink-600 mb-8">Докладчики</h2>

          {speakers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <div className="relative aspect-square">
                    <Image
                      src={speaker.photo || "/placeholder.svg?height=300&width=300"}
                      alt={`${speaker.firstName} ${speaker.lastName}`}
                      className="object-cover rounded-full"
                      fill
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {speaker.firstName} {speaker.lastName}
                    </h3>
                    {speaker.company && <p className="text-gray-600 mb-4">{speaker.company}</p>}
                    <Link
                      href={`/speaker/${speaker.id}`}
                      className="inline-block bg-pink-600 text-white px-4 py-2 rounded-md font-medium hover:bg-pink-700"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No speakers found.</p>
          )}
        </div>
      </main>
    </div>
  )
}

