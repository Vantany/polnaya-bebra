import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import ProbabilityChart from './ProbabilityChart';

interface Event {
  id: number;
  title: string;
  league: string;
  probability: number;
  endDate: string;
  yesPool: number;
  noPool: number;
}

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="bg-zinc-950 rounded-xl p-4 animate-fadeIn">
      <div className="mb-4">
        <span className="text-sm text-white font-semibold">{event.league}</span>
        <h3 className="text-lg font-semibold mt-1">{event.title}</h3>
        <p className="text-sm text-zinc-400 mt-1">
          Ends {new Date(event.endDate).toLocaleString()}
        </p>
      </div>

      {/* Probability Chart */}
      <div className="h-48 mb-6">
        <ProbabilityChart probability={event.probability} />
      </div>

      {/* Betting Options */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center space-x-2 bg-white text-black py-3 px-4 rounded-lg hover:bg-zinc-100 transition-colors">
          <CheckCircle className="w-5 h-5" />
          <span>YES ({event.probability}%)</span>
        </button>
        <button className="flex items-center justify-center space-x-2 bg-black text-white border border-white py-3 px-4 rounded-lg hover:bg-zinc-900 transition-colors">
          <XCircle className="w-5 h-5" />
          <span>NO ({100 - event.probability}%)</span>
        </button>
      </div>

      {/* Pool Information */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-black rounded-lg p-3 border border-zinc-800">
          <p className="text-sm text-zinc-400">Yes Pool</p>
          <p className="text-lg font-semibold">{event.yesPool} USDT</p>
        </div>
        <div className="bg-black rounded-lg p-3 border border-zinc-800">
          <p className="text-sm text-zinc-400">No Pool</p>
          <p className="text-lg font-semibold">{event.noPool} USDT</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;