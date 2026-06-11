import React, { useMemo } from 'react';
import { Match } from '../types';
import { Calendar } from 'lucide-react';
import MatchCard from './MatchCard';

interface TimelineProps {
  matches: Match[];
  onNavigateToTeam?: (team: string) => void;
}

export default function Timeline({ matches, onNavigateToTeam }: TimelineProps) {
  // Sort and group matches by date
  const groupedMatches = useMemo(() => {
    // Collect matches sorted by rawDate
    const sorted = [...matches].sort((a, b) => a.rawDate.localeCompare(b.rawDate));

    const groups: { [dateStr: string]: Match[] } = {};

    sorted.forEach(m => {
      const d = m.date;
      if (!groups[d]) {
        groups[d] = [];
      }
      groups[d].push(m);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date,
      rawDate: items[0].rawDate,
      items,
    }));
  }, [matches]);

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm shadow-xl">
        <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
          CHRONOLOGICAL GRID
        </p>
        <h1 className="font-anybody text-2xl md:text-3xl font-extrabold text-slate-100 uppercase tracking-tighter mb-2">
          Matchday Timeline
        </h1>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
          The sequential chronological roadmap of the tournament from June 11 to July 19, 2026. Select a game to inspect detail venues, times, and and follow individual teams.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative border-l-2 border-white/10 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">
        {groupedMatches.map((group) => {
          // Format date for display beautifully
          const dateObj = new Date(group.rawDate);
          const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
          const beautifulDate = dateObj.toLocaleDateString('en-US', options);

          return (
            <div key={group.date} className="relative group">
              
              {/* Timeline dot icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 focus:outline-none select-none">
                <span className="flex h-6 sm:h-8 w-6 sm:w-8 items-center justify-center rounded-full border border-white/10 bg-[#030612] ring-4 ring-[#030612] transition-transform group-hover:scale-110">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
                </span>
              </div>

              {/* Day Header Block */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <h3 className="font-anybody text-sm sm:text-base font-extrabold text-slate-100 uppercase tracking-tight">
                  {beautifulDate}
                </h3>
              </div>

              {/* Day's Matches List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map(match => (
                  <div key={match.matchNumber} className="transition-transform duration-300 hover:-translate-y-1">
                    <MatchCard match={match} onSelectTeam={onNavigateToTeam} />
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
