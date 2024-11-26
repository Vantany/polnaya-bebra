import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  league: string;
  probability: number;
  endDate: string;
  yesPool: number;
  noPool: number;
}

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl transition-all ${
        isSelected ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-950 hover:bg-zinc-900'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <span className="text-sm text-white font-semibold">{event.league}</span>
          <h3 className="text-base font-medium mt-1">{event.title}</h3>
          <div className="flex items-center space-x-4 mt-2 text-sm text-zinc-400">
            <span>{event.probability}% Yes</span>
            <span>{event.yesPool + event.noPool} USDT</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-zinc-400 mt-2" />
      </div>
    </div>
  );
};

export default EventCard;