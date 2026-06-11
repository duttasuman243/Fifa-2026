import React, { useState, useMemo } from 'react';
import { Match } from '../types';
import { Swords, RotateCcw, Calendar, MapPin, Search } from 'lucide-react';
import { getFlag } from '../utils/flags';
import MatchCard from './MatchCard';

interface TeamVsTeamProps {
  matches: Match[];
  onNavigateToTeam?: (team: string) => void;
}

export default function TeamVsTeam({ matches, onNavigateToTeam }: TeamVsTeamProps) {
  const [teamA, setTeamA] = useState<string>('USA');
  const [teamB, setTeamB] = useState<string>('Mexico');

  // Extract all unique countries from match list
  const allTeams = useMemo(() => {
    const set = new Set<string>();
    matches.forEach(m => {
      if (m.teamA && !m.teamA.includes('Winner') && !m.teamA.includes('Runner-up') && !m.teamA.includes('TBD') && !m.teamA.includes('Finalist')) {
        set.add(m.teamA);
      }
      if (m.teamB && !m.teamB.includes('Winner') && !m.teamB.includes('Runner-up') && !m.teamB.includes('TBD') && !m.teamB.includes('Finalist')) {
        set.add(m.teamB);
      }
    });
    return Array.from(set).sort();
  }, [matches]);

  // Find if they have a direct matchup in the static list
  const directMatchup = useMemo(() => {
    if (!teamA || !teamB) return null;
    return matches.find(
      m =>
        (m.teamA.toLowerCase() === teamA.toLowerCase() && m.teamB.toLowerCase() === teamB.toLowerCase()) ||
        (m.teamA.toLowerCase() === teamB.toLowerCase() && m.teamB.toLowerCase() === teamA.toLowerCase())
    );
  }, [matches, teamA, teamB]);

  // Find matches for Team A
  const matchesA = useMemo(() => {
    return matches.filter(
      m => m.teamA.toLowerCase() === teamA.toLowerCase() || m.teamB.toLowerCase() === teamA.toLowerCase()
    );
  }, [matches, teamA]);

  // Find matches for Team B
  const matchesB = useMemo(() => {
    return matches.filter(
      m => m.teamA.toLowerCase() === teamB.toLowerCase() || m.teamB.toLowerCase() === teamB.toLowerCase()
    );
  }, [matches, teamB]);

  const handleSwap = () => {
    const temp = teamA;
    setTeamA(teamB);
    setTeamB(temp);
  };

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Title */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm shadow-xl">
        <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
          H2H SCHEDULE COMPARE
        </p>
        <h1 className="font-anybody text-2xl md:text-3xl font-extrabold text-slate-100 uppercase tracking-tighter mb-2">
          Country VS Country Finder
        </h1>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          Select any two nations competing in the 2026 World Cup. Instantly lookup any head-to-head match scheduling in the Group stages, or compare their timelines and venues side by side.
        </p>
      </div>

      {/* Selectors Hub */}
      <div className="bg-black/30 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Team A Selection */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={getFlag(teamA)}
              alt={teamA}
              className="w-6 h-6 rounded-full object-cover border border-white/10"
              referrerPolicy="no-referrer"
            />
            <label className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              NATION A
            </label>
          </div>
          <select
            value={teamA}
            onChange={e => setTeamA(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold text-amber-300 focus:outline-none focus:border-amber-400"
          >
            {allTeams.map(t => (
              <option key={t} value={t} disabled={t === teamB} className="bg-slate-950 text-slate-200">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-350 hover:bg-white/10 hover:text-amber-300 transition-all cursor-pointer shadow-lg mt-4 md:mt-6"
          title="Swap Teams"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Team B Selection */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={getFlag(teamB)}
              alt={teamB}
              className="w-6 h-6 rounded-full object-cover border border-white/10"
              referrerPolicy="no-referrer"
            />
            <label className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              NATION B
            </label>
          </div>
          <select
            value={teamB}
            onChange={e => setTeamB(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold text-amber-300 focus:outline-none focus:border-amber-400"
          >
            {allTeams.map(t => (
              <option key={t} value={t} disabled={t === teamA} className="bg-slate-950 text-slate-200">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison results */}
      <div className="space-y-6">
        {directMatchup ? (
          <div className="p-6 md:p-8 bg-amber-400/5 rounded-2xl border border-amber-400/20 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full">
              <Swords className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="font-mono text-[9px] font-bold text-amber-300 uppercase tracking-widest">
                Direct group stage match scheduled!
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              {teamA} and {teamB} are scheduled to face off in the Group Stage. Here is the official fixture information:
            </p>
            <div className="max-w-md mx-auto">
              <MatchCard match={directMatchup} onSelectTeam={onNavigateToTeam} />
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 bg-slate-950/40 rounded-2xl border border-white/5 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                No direct group stage match
              </span>
            </div>
            <h3 className="font-anybody text-lg font-bold text-slate-250 uppercase">
              No Group Battle Scheduled
            </h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {teamA} and {teamB} are in different groups and do not clash in the initial Group rounds. However, they could clash dynamically in the <strong className="text-amber-300">Knockout Stage (Round of 32 onwards)</strong> based on final standings!
            </p>
          </div>
        )}

        {/* Side-by-Side Timeline Comparor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nation A Schedule */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 tracking-wider">
              <img
                src={getFlag(teamA)}
                alt={teamA}
                className="w-5 h-5 rounded-full object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />
              <span>{teamA.toUpperCase()} GROUP FIXTURES</span>
            </div>
            <div className="space-y-4">
              {matchesA.map(m => (
                <div key={m.matchNumber} className="relative">
                  <div className="bg-black/35 p-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest text-left rounded-t-xl border-t border-x border-white/10">
                    Match #{m.matchNumber} &bull; Stage: {m.stage}
                  </div>
                  <MatchCard match={m} onSelectTeam={onNavigateToTeam} />
                </div>
              ))}
            </div>
          </div>

          {/* Nation B Schedule */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 tracking-wider">
              <img
                src={getFlag(teamB)}
                alt={teamB}
                className="w-5 h-5 rounded-full object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />
              <span>{teamB.toUpperCase()} GROUP FIXTURES</span>
            </div>
            <div className="space-y-4">
              {matchesB.map(m => (
                <div key={m.matchNumber} className="relative">
                  <div className="bg-black/35 p-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest text-left rounded-t-xl border-t border-x border-white/10">
                    Match #{m.matchNumber} &bull; Stage: {m.stage}
                  </div>
                  <MatchCard match={m} onSelectTeam={onNavigateToTeam} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
