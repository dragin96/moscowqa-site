import Link from "next/link";
import { Star } from "lucide-react";
import { EventCardProps } from "@/types/event";

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex mb-16">
      <div className="bg-yellow-400 w-48 h-48 flex-shrink-0 relative">
        <Star className="absolute top-4 left-4 w-8 h-8 text-black" />
        <div className="absolute bottom-0 left-0 right-0 text-black text-center pb-4">
          <span className="text-9xl font-bold">{event.id}</span>
        </div>
      </div>
      <div className="ml-6">
        <div className="mb-2">
          <span className="text-white">{event.date}, {event.time} (</span>
          <span className="text-white italic">{event.location}</span>
          <span className="text-white">)</span>
        </div>
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">
          <Link href="#">{event.title}</Link>
        </h2>
        {event.description && (
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed">{event.description}</p>
          </div>
        )}
      </div>
    </div>
  );
} 