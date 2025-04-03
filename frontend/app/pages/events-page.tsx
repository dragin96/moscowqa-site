import Link from "next/link"
import { Star } from "lucide-react"
import { EventCard } from "@/components/features/EventCard";
import { Header } from "@/components/layout/header";
import { Event } from "@/types/event";

const events: Event[] = [
  {
    id: 63,
    date: "27 марта 2025",
    time: "18:00",
    location: "МТС Финтех",
    title: "MoscowQA 63",
    description: "Пришла весна, расцвели подснежники и первый MoscowQA в 2025! ⭐ Будем рады видеть вас 27 марта на площадке МТС Финтех. Но это не все! Рады сообщить, что теперь мы официально дружим с Докой 🤝 Там всегда можно почитать понятные статьи от разработчиков для разработчиков. Также ребята рады помочь вам и пообщаться в чате. Следите за анонсами, чтобы оставаться в курсе событий. 🍕"
  },
  {
    id: 62,
    date: "21 ноября 2024",
    time: "18:00",
    location: "МТС, МТС Финтех",
    title: "MoscowQA 62"
  },
  {
    id: 61,
    date: "15 августа 2024",
    time: "18:30",
    location: "Росбанк",
    title: "MoscowQA 61"
  },
  {
    id: 60,
    date: "11 июля 2024",
    time: "18:00",
    location: "X5 Tech",
    title: "MoscowQA 60"
  }
];

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-black text-white">
        <div className="container mx-auto px-8 py-12">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </div>
  )
}

