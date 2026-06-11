import React from 'react';
import { Match } from '../types';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { getFlag } from '../utils/flags';

interface KnockoutStageProps {
  matches: Match[];
  onNavigateToTeam?: (team: string) => void;
}

export default function KnockoutStage({ matches, onNavigateToTeam }: KnockoutStageProps) {
  // Helper to find knockout matches
  const getKnockoutMatchesByStage = (stageName: string) => {
    return matches.filter(m => m.stage.toLowerCase() === stageName.toLowerCase());
  };

  const r32Matches = getKnockoutMatchesByStage('Round of 32');
  const r16Matches = getKnockoutMatchesByStage('Round of 16');
  const quarterMatches = getKnockoutMatchesByStage('Quarter Finals');
  const semiMatches = getKnockoutMatchesByStage('Semi Finals');
  const bronzeMatch = getKnockoutMatchesByStage('Bronze Match')[0];
  const finalMatch = getKnockoutMatchesByStage('Final')[0];

  const renderMiniNode = (match: Match) => {
    return (
      <div
        key={match.matchNumber}
        className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 hover:border-amber-400/40 transition-all text-left relative"
      >
        <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 border-b border-white/5 pb-1">
          <span>MATCH #{match.matchNumber}</span>
          <span className="text-amber-300 font-bold">{match.timeIST}</span>
        </div>

        <div className="space-y-1.5">
          {/* Team A */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (!match.teamA.includes('Group') && !match.teamA.includes('Winner') && !match.teamA.includes('TBD') && !match.teamA.includes('Match')) {
                  onNavigateToTeam?.(match.teamA);
                }
              }}
              className="flex items-center gap-2 group/btn focus:outline-none focus:text-amber-300 disabled:pointer-events-none text-left truncate"
              disabled={match.teamA.includes('Group') || match.teamA.includes('Winner')}
            >
              <img
                src={getFlag(match.teamA)}
                alt={match.teamA}
                className="w-4.5 h-4.5 rounded-full object-cover border border-white/10 shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-bold text-slate-200 group-hover/btn:text-amber-300 truncate max-w-[130px]">
                {match.teamA}
              </span>
            </button>
          </div>

          {/* Team B */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (!match.teamB.includes('Group') && !match.teamB.includes('Winner') && !match.teamB.includes('TBD') && !match.teamB.includes('Match')) {
                  onNavigateToTeam?.(match.teamB);
                }
              }}
              className="flex items-center gap-2 group/btn focus:outline-none focus:text-amber-300 disabled:pointer-events-none text-left truncate"
              disabled={match.teamB.includes('Group') || match.teamB.includes('Winner')}
            >
              <img
                src={getFlag(match.teamB)}
                alt={match.teamB}
                className="w-4.5 h-4.5 rounded-full object-cover border border-white/10 shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-bold text-slate-200 group-hover/btn:text-amber-300 truncate max-w-[130px]">
                {match.teamB}
              </span>
            </button>
          </div>
        </div>

        {/* Date and Location */}
        <div className="text-[9px] text-slate-450 font-mono flex items-center justify-between pt-1 border-t border-white/5">
          <span>{match.date}</span>
          <span className="truncate max-w-[100px]" title={match.venue}>{match.venue.split(',')[0]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Page Title */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm shadow-xl">
        <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
          TOURNAMENT BRACKETPATH
        </p>
        <h1 className="font-anybody text-2xl md:text-3xl font-extrabold text-slate-100 uppercase tracking-tighter mb-2">
          Knockout Stage Schedule
        </h1>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          The official static template pathway of matches from the round of 32 to the final on Sunday, July 19, 2026. Standings from the 12 round-robin groups determine the actual matchups.
        </p>
      </div>

      {/* Bracket Visual Board */}
      <div className="bg-black/35 rounded-2xl border border-white/10 p-6 overflow-x-auto backdrop-blur-md shadow-2xl">
        <div className="flex gap-6 min-w-[1100px] items-stretch justify-between py-4">
          
          {/* ROUND OF 32 COLUMN */}
          <div className="w-[240px] shrink-0 space-y-4">
            <div className="text-center py-2 bg-white/5 rounded-xl border border-white/10 mb-4">
              <span className="font-mono text-[9px] font-black tracking-widest uppercase text-slate-400">
                Round of 32
              </span>
            </div>
            <div className="space-y-4">
              {r32Matches.map(renderMiniNode)}
            </div>
          </div>

          {/* ROUND OF 16 COLUMN */}
          <div className="w-[240px] shrink-0 space-y-4 flex flex-col justify-center">
            <div className="text-center py-2 bg-white/5 rounded-xl border border-white/10 mb-4 mt-0">
              <span className="font-mono text-[9px] font-black tracking-widest uppercase text-slate-400">
                Round of 16
              </span>
            </div>
            <div className="space-y-8 py-4">
              {r16Matches.map(renderMiniNode)}
            </div>
          </div>

          {/* QUARTER FINALS */}
          <div className="w-[240px] shrink-0 space-y-4 flex flex-col justify-center">
            <div className="text-center py-2 bg-white/5 rounded-xl border border-white/10 mb-4">
              <span className="font-mono text-[9px] font-black tracking-widest uppercase text-slate-400">
                Quarter Finals
              </span>
            </div>
            <div className="space-y-16 py-8">
              {quarterMatches.map(renderMiniNode)}
            </div>
          </div>

          {/* SEMI FINALS & BRONZE */}
          <div className="w-[240px] shrink-0 space-y-4 flex flex-col justify-between py-6">
            <div>
              <div className="text-center py-2 bg-white/5 rounded-xl border border-white/10 mb-4">
                <span className="font-mono text-[9px] font-black tracking-widest uppercase text-slate-400">
                  Semi Finals
                </span>
              </div>
              <div className="space-y-12">
                {semiMatches.map(renderMiniNode)}
              </div>
            </div>

            {/* Bronze Match Option */}
            {bronzeMatch && (
              <div className="mt-8">
                <div className="text-center py-1.5 bg-amber-500/10 rounded-xl border border-amber-500/20 mb-3">
                  <span className="font-mono text-[9px] font-black tracking-widest uppercase text-amber-300">
                    Bronze Match
                  </span>
                </div>
                {renderMiniNode(bronzeMatch)}
              </div>
            )}
          </div>

          {/* THE CHAMPIONSHIP FINAL */}
          <div className="w-[240px] shrink-0 flex flex-col justify-center items-stretch relative">
            <div className="absolute top-[35%] inset-x-0 text-center space-y-4">
              <div className="inline-flex h-12 w-12 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.35)] mx-auto animate-pulse">
                <Trophy className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h3 className="font-anybody font-black text-sm text-amber-300 uppercase shrink-0">
                  World Cup Final
                </h3>
                <span className="font-mono text-[9px] text-slate-400 block mt-1 uppercase tracking-wider">
                  JULY 19 &bull; METLIFE STADIUM
                </span>
              </div>

              {finalMatch && (
                <div className="pt-4 text-left">
                  {renderMiniNode(finalMatch)}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
