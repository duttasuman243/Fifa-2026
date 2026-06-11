import React from 'react';
import { Match } from '../types';
import { Calendar, MapPin, Trophy, Shield } from 'lucide-react';

interface MatchCardProps {
  key?: any;
  match: Match;
  onSelectTeam?: (team: string) => void;
}

export default function MatchCard({ match, onSelectTeam }: MatchCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-350 backdrop-blur-sm shadow-xl hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(255,224,131,0.08)] text-left"
    >
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/5 blur-xl pointer-events-none" />

      {/* Header Info: Match Number & Stage/Group */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
        <span className="font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest">
          Match #{String(match.matchNumber).padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] font-medium text-slate-400 uppercase tracking-wider">
          {match.group !== 'None' ? `${match.stage} • ${match.group}` : match.stage}
        </span>
      </div>

      {/* Match Teams: Purely static, no scores, no live badges */}
      <div className="flex justify-between items-center my-4 pr-1">
        {/* Team A */}
        <button
          onClick={() => onSelectTeam?.(match.teamA)}
          className="flex flex-col items-center flex-1 text-center group/btn focus:outline-none cursor-pointer"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 ring-2 ring-white/5 transition-all duration-300 group-hover/btn:ring-amber-300 group-hover/btn:scale-105">
            <img
              src={match.teamAFlag}
              alt={match.teamA}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="mt-2 text-xs font-bold text-slate-200 font-anybody uppercase tracking-tight group-hover/btn:text-amber-300 transition-colors truncate w-full px-1">
            {match.teamA}
          </span>
        </button>

        {/* VS Separator */}
        <div className="px-3 text-center flex flex-col justify-center items-center shrink-0">
          <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] font-black tracking-widest text-amber-300/80 shadow-inner">
            VS
          </span>
        </div>

        {/* Team B */}
        <button
          onClick={() => onSelectTeam?.(match.teamB)}
          className="flex flex-col items-center flex-1 text-center group/btn focus:outline-none cursor-pointer"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 ring-2 ring-white/5 transition-all duration-300 group-hover/btn:ring-amber-300 group-hover/btn:scale-105">
            <img
              src={match.teamBFlag}
              alt={match.teamB}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="mt-2 text-xs font-bold text-slate-200 font-anybody uppercase tracking-tight group-hover/btn:text-amber-300 transition-colors truncate w-full px-1">
            {match.teamB}
          </span>
        </button>
      </div>

      {/* Footer Details: Venue and IST kickoff time only */}
      <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px] text-slate-300">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-amber-300/80 shrink-0" />
          <span className="font-mono">{match.date} • <strong className="text-amber-300 font-bold">{match.timeIST}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate" title={match.venue}>{match.venue}</span>
        </div>
      </div>
    </div>
  );
}
