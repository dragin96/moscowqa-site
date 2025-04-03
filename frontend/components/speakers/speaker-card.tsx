'use client';

import Image from "next/image"
import Link from "next/link"
import { Speaker } from "@/lib/api"
import SafeHtml from "@/components/shared/safe-html"

interface SpeakerCardProps {
  speaker: Speaker;
  showBio?: boolean;
}

export function SpeakerCard({ speaker, showBio = false }: SpeakerCardProps) {
  return (
    <Link href={`/speaker/${speaker.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
            {speaker.photo ? (
              <Image
                src={speaker.photo}
                alt={`${speaker.firstName} ${speaker.lastName}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {speaker.firstName[0]}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
              {speaker.firstName} {speaker.lastName}
            </h3>
            {speaker.company && (
              <div className="text-gray-600">
                <SafeHtml html={speaker.company} />
              </div>
            )}
            {speaker.position && (
              <div className="text-gray-600 mt-1">
                <SafeHtml html={speaker.position} />
              </div>
            )}
          </div>
        </div>
        {showBio && speaker.bio && (
          <div className="mt-4 text-gray-700">
            <SafeHtml html={speaker.bio} className="line-clamp-2" />
          </div>
        )}
      </div>
    </Link>
  );
} 