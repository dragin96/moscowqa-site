export interface Event {
  id: number;
  date: string;
  time: string;
  location: string;
  title: string;
  description?: string;
  sponsors?: string[];
}

export interface EventCardProps {
  event: Event;
} 