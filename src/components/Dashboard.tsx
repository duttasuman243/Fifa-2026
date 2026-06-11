import React, { useState, useEffect } from 'react';
import { Match, GroupConfig } from '../types';
import { Zap, Clock, Sparkles } from 'lucide-react';
import { getFlag } from '../utils/flags';

interface DashboardProps {
  matches: Match[];
  groups: GroupConfig[];
}

export default function Dashboard({
  matches,
  groups,
}: DashboardProps) {
  const allTeams = Array.from(
    new Set(
      matches
          .flatMap(m => [m.teamA, m.teamB])
          .filter(t => !t.includes('Winner') && !t.includes('Runner-up') && !t.includes('TBD') && !t.includes('Finalist'))
    )
  ).sort();

  // Instant Group & Team Selection Match Finder
  const [selectedGroup, setSelectedGroup] = useState('Group A');
  
  // Find current group configuration
  const currentGroupObj = groups.find(g => g.name === selectedGroup) || groups[0];
  const groupTeams = currentGroupObj ? currentGroupObj.teams : [];
  
  // Track selected team inside the chosen group
  const [selectedTeam, setSelectedTeam] = useState('USA');

  // Automatically update team to first team in group on selection change
  useEffect(() => {
    if (groupTeams && groupTeams.length > 0) {
      setSelectedTeam(groupTeams[0]);
    }
  }, [selectedGroup]);

  // Find direct fixtures for this team
  const teamMatches = matches.filter(
    m => m.teamA === selectedTeam || m.teamB === selectedTeam
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden h-[440px] flex items-center justify-center border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
          <img
            className="w-full h-full object-cover opacity-50 select-none scale-105 transition-transform duration-1000"
            alt="Football stadium at night under bright golden lights"
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-3xl">
          <p className="font-mono text-amber-300 text-xs tracking-widest font-black uppercase mb-3 text-shadow">
            THE WORLD'S STAGE IS SET
          </p>
          <h1 className="font-anybody text-3xl md:text-5xl font-extrabold text-slate-100 uppercase tracking-tighter mb-4 leading-none text-shadow-lg">
            FIFA WORLD CUP <span className="text-amber-300">2026</span>
          </h1>
          <p className="text-slate-300/90 text-sm md:text-base font-sans max-w-2xl mx-auto mb-8 font-medium">
            Experience the most expansive FIFA World Cup in history across United States, Canada, and Mexico.
            Track every single match with Indian Standard Time (IST) precision.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('quick-match-finder');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-300 text-slate-900 font-bold shadow-xl overflow-hidden cursor-pointer hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Zap className="w-4 h-4 fill-slate-900" />
            <span className="text-xs tracking-wider uppercase">Find Tonight's Match timings (IST)</span>
          </button>
        </div>
      </section>

      {/* Quick Search & Filter Cluster */}
      <section className="relative z-30 -mt-24 px-4 max-w-5xl mx-auto" id="quick-match-finder">
        <div className="bg-gradient-to-b from-[#181d36]/90 to-[#0e1122]/95 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-2xl">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <h2 className="font-mono text-xs font-black text-amber-300 tracking-widest uppercase">
              IST TONIGHT'S MATCH FINDER & TRACKER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Step 1: Group Selection */}
            <div className="space-y-1.5 text-left">
              <label className="block font-mono text-[10px] font-bold tracking-wider text-white/55 uppercase ml-1">
                STEP 1: SELECT GROUP
              </label>
              <select
                value={selectedGroup}
                onChange={e => setSelectedGroup(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-slate-100 focus:border-amber-400 focus:ring-1 focus:ring-amber-500/20 outline-none transition-all cursor-pointer"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.name} className="bg-slate-900 text-slate-100">
                    {g.name} ({g.teams.join(', ')})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Choose Team from Group */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <label className="block font-mono text-[10px] font-bold tracking-wider text-white/55 uppercase ml-1">
                STEP 2: CHOOSE TEAM
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {groupTeams.map(teamName => {
                  const isActive = selectedTeam === teamName;
                  return (
                    <button
                      key={teamName}
                      onClick={() => setSelectedTeam(teamName)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-bold uppercase transition-all duration-300 shadow-md ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-extrabold ring-4 ring-amber-400/20 scale-[1.03]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-slate-400/40'
                      }`}
                    >
                      <img
                        src={getFlag(teamName)}
                        alt={teamName}
                        className="w-5 h-5 rounded-full object-cover shrink-0 border border-slate-950/20"
                        referrerPolicy="no-referrer"
                      />
                      <span className="truncate">{teamName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Match Tracker Results Output */}
          <div className="mt-8 border-t border-white/10 pt-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <span className="font-mono text-[9px] font-black text-amber-300/80 tracking-widest uppercase block">
                  SHOWING MATCH TIMINGS & DATES FOR
                </span>
                <h3 className="font-anybody text-xl font-extrabold text-slate-100 flex items-center gap-2 mt-1">
                  <img
                    src={getFlag(selectedTeam)}
                    alt={selectedTeam}
                    className="w-6 h-6 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <span>{selectedTeam}</span>
                  <span className="text-sm font-sans font-medium text-white/50">({selectedGroup})</span>
                </h3>
              </div>
              
              <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 p-2 px-3.5 rounded-xl text-xs font-mono font-bold text-amber-300">
                <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>ALL MATCH KICKOFF TIMES ARE IN INDIAN TIME (IST)</span>
              </div>
            </div>

            {/* List matches of the selected team */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMatches.length > 0 ? (
                teamMatches.map(match => {
                  const opponent = match.teamA === selectedTeam ? match.teamB : match.teamA;
                  const opponentFlag = match.teamA === selectedTeam ? match.teamBFlag : match.teamAFlag;
                  const isLive = match.status === 'Live';
                  const isFinished = match.status === 'Finished';
                  const isTonight = match.date.includes('11 Jun 2026');

                  return (
                    <div
                      key={match.matchNumber}
                      className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 backdrop-blur-md ${
                        isTonight
                          ? 'border-amber-400 bg-amber-400/5 shadow-md shadow-amber-500/10'
                          : isLive
                          ? 'border-red-500/50 bg-red-950/20'
                          : 'border-white/10 bg-white/5 hover:bg-white/[0.08]'
                      }`}
                    >
                      {/* Tonight Highlight Header Banner */}
                      {isTonight && (
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-yellow-500 text-slate-950 font-mono text-[9px] font-black px-3 py-1 rounded-bl-lg tracking-widest uppercase animate-pulse flex items-center gap-1.5 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                          <span>STARTS TONIGHT!</span>
                        </div>
                      )}

                      {/* Header row */}
                      <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-white/40">
                        <span>MATCH #{match.matchNumber} • {match.stage}</span>
                        {isLive ? (
                          <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.2 rounded font-black animate-pulse text-[8px] tracking-wider uppercase">
                            LIVE • {match.minute}'
                          </span>
                        ) : isFinished ? (
                          <span className="bg-white/10 text-slate-400 px-1.5 py-0.2 rounded font-semibold text-[8px] tracking-wider uppercase">
                            FINISHED
                          </span>
                        ) : (
                          <span className="bg-amber-400/10 text-amber-300 border border-amber-400/20 px-1.5 py-0.2 rounded font-bold text-[8px] tracking-wider uppercase">
                            UPCOMING
                          </span>
                        )}
                      </div>

                      {/* Opponent Showcase */}
                      <div className="flex items-center justify-between my-3 pb-3 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden ring-2 ring-white/5">
                            <img
                              src={opponentFlag}
                              alt={opponent}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-white/40 font-mono uppercase block">OPPONENT</span>
                            <span className="font-anybody text-sm font-bold text-slate-100 uppercase tracking-tight block">
                              {opponent}
                            </span>
                          </div>
                        </div>

                        {/* Interactive score or VS state */}
                        <div className="text-right">
                          {isLive || isFinished ? (
                            <div className="font-anybody text-xl font-black text-amber-300 bg-slate-950/55 px-3 py-1 rounded-lg border border-white/5">
                              {match.teamA === selectedTeam ? match.scoreA : match.scoreB} - {match.teamA === selectedTeam ? match.scoreB : match.scoreA}
                            </div>
                          ) : (
                            <div className="font-mono text-amber-300 font-bold bg-white/5 px-2.5 py-1 rounded text-xs select-none border border-white/5">
                              VS
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Date & Time Row */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className="font-mono text-[9px] text-white/30 block uppercase">MATCH DATE</span>
                          <span className="font-bold text-slate-200">{match.date}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-white/30 block uppercase">KICKOFF TIME (IST)</span>
                          <span className="font-bold text-amber-300 font-mono tracking-wide">{match.timeIST}</span>
                        </div>
                      </div>

                      {/* Stadium Venue */}
                      <div className="mt-2 text-[10px] text-white/50 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="truncate">{match.venue}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-8 text-white/40 text-xs font-medium">
                  No matches found for <span className="text-amber-300 font-bold">{selectedTeam}</span>.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
