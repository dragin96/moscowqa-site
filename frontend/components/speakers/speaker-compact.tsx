'use client';

import Image from "next/image"
import Link from "next/link"
import { Speaker } from "@/lib/api"

interface SpeakerCompactProps {
  speaker: Speaker;
}

export function SpeakerCompact({ speaker }: SpeakerCompactProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link 
      href={`/speaker/${speaker.id}`} 
      onClick={handleClick}
      className="flex items-center group"
    >
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
        <div className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
          {speaker.firstName} {speaker.lastName}
        </div>
        {speaker.company && (
          <div className="text-sm text-gray-500">{speaker.company}</div>
        )}
      </div>
    </Link>
  );
} 