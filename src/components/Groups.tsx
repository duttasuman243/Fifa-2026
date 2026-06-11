import React, { useState } from 'react';
import { GroupConfig, Match } from '../types';
import { GROUPS_DATA } from '../data/matches';
import { Trophy, ChevronRight, X, UserCheck, Calendar, Swords } from 'lucide-react';
import MatchCard from './MatchCard';
import { getFlag } from '../utils/flags';

interface GroupsProps {
  matches: Match[];
  selectedGroupFilter?: string;
  onNavigateToTeam?: (team: string) => void;
}

export default function Groups({ matches, selectedGroupFilter, onNavigateToTeam }: GroupsProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(selectedGroupFilter || 'Group A');

  // Find selected group configuration
  const currentGroup = GROUPS_DATA.find(g => g.name === activeGroup) || GROUPS_DATA[0];

  const currentGroupMatches = matches.filter(
    m => m.group.toLowerCase() === (activeGroup || 'Group A').toLowerCase()
  );

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Page Title */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm shadow-xl">
        <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
          GROUPS MATRIX
        </p>
        <h1 className="font-anybody text-2xl md:text-3xl font-extrabold text-slate-100 uppercase tracking-tighter mb-2">
          Group Stage Explorer
        </h1>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          Forty-eight participating nations divided into twelve groups of four (Group A to L). The top two from each group plus the eight best third-placed teams secure entry to the Round of 32. Select a group below to inspect the participating teams and their scheduled matchups.
        </p>
      </div>

      {/* Grid of Groups cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {GROUPS_DATA.map(group => {
          const isActive = group.name === activeGroup;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.name)}
              className={`group-card text-left relative overflow-hidden bg-white/5 p-4 rounded-2xl border transition-all cursor-pointer backdrop-blur-sm ${
                isActive
                  ? 'border-amber-400 bg-white/15 shadow-[0_0_15px_rgba(255,224,131,0.1)]'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${group.color} blur-xl opacity-30 -mr-6 -mt-6 pointer-events-none`} />
              <div className="flex justify-between items-center mb-2">
                <span className="font-anybody font-extrabold text-base text-slate-100 group-hover:text-amber-200 uppercase">
                  {group.name}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                {group.teams.join(' · ')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Group Details */}
      {activeGroup && currentGroup && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 backdrop-blur-sm shadow-2xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-amber-300" />
              <h2 className="font-anybody text-lg md:text-xl font-extrabold text-slate-50 uppercase tracking-tight">
                {activeGroup} Details
              </h2>
            </div>
            <button
              onClick={() => setActiveGroup(null)}
              className="p-1.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Group Members List - Left */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300/90 tracking-wider">
                <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>GROUP MEMBERS</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {currentGroup.teams.map((team, idx) => (
                  <div
                    key={team}
                    onClick={() => onNavigateToTeam?.(team)}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-900/60 hover:border-amber-400/40 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getFlag(team)}
                        alt={team}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-amber-300 transition-colors">{team}</div>
                        <div className="text-[10px] text-white/40 font-mono uppercase">Pot Slot A{idx + 1}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider group-hover:text-amber-300 pr-1">
                      View Profile &rarr;
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group matches schedule - Right */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300/90 tracking-wider">
                <Swords className="w-3.5 h-3.5 text-amber-300" />
                <span>OFFICIAL SCHEDULE ({currentGroupMatches.length} MATCHES)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                {currentGroupMatches.map(match => (
                  <MatchCard
                    key={match.matchNumber}
                    match={match}
                    onSelectTeam={onNavigateToTeam}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
