// Types for our API responses
export interface Speaker {
  id: number
  firstName: string
  lastName: string
  photo: string
  company: string
  bio: string
  email: string
  telegram: string
  github: string
  talks?: Talk[]
}

export interface Event {
  id: number
  title: string
  isPublish: boolean
  date: string
  company: string
  address: string
  description: string
  registrationLink: string
  streamLink: string
  videosLink: string
  talks?: Talk[]
}

export interface Talk {
  id: number
  title: string
  abstract: string
  preview?: string
  videoLink?: string
  slidesLink?: string
  materialsLink?: string
  event_id: number
  speakers?: Speaker[]
}

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"


// Generic fetch function with error handling and fallback data
async function fetchAPI<T>(endpoint: string): Promise<T | undefined> {
  try {
    console.log(`Fetching from: ${API_URL}${endpoint}`)
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        accept: "*/*",
      },
      next: { revalidate: 60 }, // Revalidate data every 60 seconds
    })

    if (!response.ok) {
      console.warn(`API returned status: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error)
  }
}

// API functions with fallback data
export async function getSpeakers(): Promise<Speaker[] | undefined> {
  return fetchAPI<Speaker[]>("/speakers")
}

export async function getSpeakerById(id: number): Promise<Speaker | undefined> {
  try {
    return await fetchAPI<Speaker>(`/speakers/${id}`)
  } catch (error) {
    console.error(`Error fetching speaker ${id}:`, error)
  }
}

export async function getEvents(): Promise<Event[] | undefined> {
  return fetchAPI<Event[]>("/events")
}

export async function getEventById(id: number): Promise<Event | undefined> {
  try {
    return await fetchAPI<Event>(`/events/${id}`)
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error)
  }
}

export async function getTalks(): Promise<Talk[] | undefined> {
  return fetchAPI<Talk[]>("/talks")
}

export async function getTalkById(id: number): Promise<Talk | undefined> {
  try {
    return await fetchAPI<Talk>(`/talks/${id}`)
  } catch (error) {
    console.error(`Error fetching talk ${id}:`, error)
  }
}

// Helper functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Format: "27 марта 2025, 18:00"
  const day = date.getDate()
  const month = getMonthName(date.getMonth())
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${day} ${month} ${year}, ${hours}:${minutes}`
}

function getMonthName(monthIndex: number): string {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ]
  return months[monthIndex]
}

// Convert event to display format for the events list
export function eventToDisplayFormat(event: Event) {
  return {
    id: event.id,
    number: event.id, // Using ID as the event number for now
    title: event.title,
    date: formatDate(event.date),
    venue: event.company,
    description:
      event.talks && event.talks.length > 0 ? event.talks[0].abstract : "Информация о мероприятии появится позже.",
    registrationLink: event.registrationLink,
    streamLink: event.streamLink,
    address: event.address,
  }
}

