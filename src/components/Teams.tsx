import React, { useMemo } from 'react';
import { Match } from '../types';
import { Search, Trophy, Calendar, MapPin, Swords, Globe, Layers } from 'lucide-react';
import MatchCard from './MatchCard';
import { getFlag } from '../utils/flags';
// @ts-ignore
import heroBanner from '../assets/images/fifa_hero_banner_1781172678313.png';

interface TeamsProps {
  matches: Match[];
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  teamSearch: string;
  setTeamSearch: (search: string) => void;
}

export default function Teams({
  matches,
  selectedTeam,
  setSelectedTeam,
  teamSearch,
  setTeamSearch,
}: TeamsProps) {
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

  // Filters dropdown suggestions based on search query
  const filteredSuggestions = useMemo(() => {
    if (teamSearch.trim() === '') return allTeams;
    const q = teamSearch.toLowerCase();
    return allTeams.filter(t => t.toLowerCase().includes(q));
  }, [allTeams, teamSearch]);

  // Find all matches for selected team
  const teamMatches = useMemo(() => {
    if (!selectedTeam) return [];
    return matches.filter(
      m => m.teamA.toLowerCase() === selectedTeam.toLowerCase() || m.teamB.toLowerCase() === selectedTeam.toLowerCase()
    );
  }, [matches, selectedTeam]);

  // Group of the selected team based on Group Stage matches
  const teamGroup = useMemo(() => {
    const matchWithGroup = teamMatches.find(m => m.group !== 'None');
    return matchWithGroup ? matchWithGroup.group : 'Knockout Seed';
  }, [teamMatches]);

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Epic FIFA Hero Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group min-h-[280px] sm:min-h-[320px] md:min-h-[360px] flex flex-col justify-end p-6 md:p-8" style={{ backgroundColor: '#02050f' }}>
        {/* Banner background */}
        <img 
          src={heroBanner} 
          alt="FIFA World Cup 2026" 
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-[#030612]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030612]/80 via-transparent to-transparent hidden md:block" />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full text-left">
          <div className="space-y-2 md:space-y-3">
            <span className="inline-block bg-amber-400 font-extrabold text-[#030612] font-mono text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">
              OFFICIAL 2026 IST SCHEDULER
            </span>
            <div className="space-y-0">
              <p className="font-anybody font-black text-slate-300 text-xs md:text-sm tracking-widest uppercase">
                IT'S TIME TO
              </p>
              <h1 className="font-anybody font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 uppercase tracking-tighter leading-none filter drop-shadow-[0_2px_10px_rgba(3,6,18,0.7)]">
                FIFA!
              </h1>
            </div>
            
            <p className="font-anybody font-extrabold text-white text-base md:text-lg uppercase tracking-tight">
              FIFA World Cup 2026™
            </p>
            <p className="font-mono text-[9px] text-white/60 uppercase tracking-wider font-semibold">
              11 June &ndash; 19 July 2026 &bull; USA, Canada, Mexico Host Nations
            </p>
          </div>

          {/* Host Nations Banner Flags */}
          <div className="backdrop-blur-md bg-black/45 border border-white/10 p-3 px-4 rounded-xl flex items-center gap-4 shadow-xl shrink-0">
            <div className="flex items-center gap-2">
              <img src={getFlag('USA')} alt="USA" className="w-5 h-5 rounded-full object-cover border border-white/25 shadow-sm" referrerPolicy="no-referrer" />
              <span className="font-mono text-[9px] font-black text-slate-100">USA</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <img src={getFlag('Canada')} alt="Canada" className="w-5 h-5 rounded-full object-cover border border-white/25 shadow-sm" referrerPolicy="no-referrer" />
              <span className="font-mono text-[9px] font-black text-slate-100">CAN</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <img src={getFlag('Mexico')} alt="Mexico" className="w-5 h-5 rounded-full object-cover border border-white/25 shadow-sm" referrerPolicy="no-referrer" />
              <span className="font-mono text-[9px] font-black text-slate-100">MEX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title block */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm shadow-xl">
        <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
          NATION SEARCH ENGINE
        </p>
        <h1 className="font-anybody text-2xl md:text-3xl font-extrabold text-slate-100 uppercase tracking-tighter mb-2">
          Country Schedule Finder
        </h1>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          Instantly lookup any of the 48 participating tournament nations. Search by team name or use the dropdown to access their specific three Group Stage match dates, kickoff times in IST, and stadium locations.
        </p>
      </div>

      {/* Select & Search Hub */}
      <div className="bg-black/30 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row gap-4 items-center">
        {/* Search Suggest Input */}
        <div className="relative flex-1 w-full text-left">
          <label className="block font-mono text-[9px] font-black text-white/40 mb-1.5 uppercase tracking-wide">
            Filter suggestion list
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search team name..."
              value={teamSearch}
              onChange={e => setTeamSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 pl-9 text-sm text-slate-200 placeholder-white/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-500/20"
            />
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
          </div>
        </div>

        {/* Dropdown Select */}
        <div className="w-full md:w-[240px] text-left">
          <label className="block font-mono text-[9px] font-black text-white/40 mb-1.5 uppercase tracking-wide">
            Selected Nation
          </label>
          <select
            value={selectedTeam}
            onChange={e => {
              setSelectedTeam(e.target.value);
              setTeamSearch('');
            }}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-sm font-bold text-amber-300 focus:outline-none focus:border-amber-400"
          >
            {filteredSuggestions.map(t => (
              <option key={t} value={t} className="bg-slate-950 text-slate-200">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Row Block */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-sm hover:border-amber-400/20 transition-all">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="font-anybody font-black text-xl text-slate-100 block leading-none mb-1">48</span>
            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Nations</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-sm hover:border-amber-400/20 transition-all">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <span className="font-anybody font-black text-xl text-slate-100 block leading-none mb-1">104</span>
            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Total Matches</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-sm hover:border-amber-400/20 transition-all">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="font-anybody font-black text-xl text-slate-100 block leading-none mb-1">72</span>
            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Group Matches</span>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-sm hover:border-amber-400/20 transition-all">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="font-anybody font-black text-xl text-slate-100 block leading-none mb-1">32</span>
            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Knockouts</span>
          </div>
        </div>

        {/* Stat Card 5 - with live pulse spot */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xl backdrop-blur-sm hover:border-amber-400/20 transition-all col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-anybody font-black text-xl text-slate-100 block leading-none mb-1">39</span>
              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Days Track</span>
            </div>
          </div>
          {/* Flashing green online beacon */}
          <div className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
        </div>
      </div>

      {/* Active Team Profile Dashboard */}
      {selectedTeam && (
        <div className="space-y-6">
          {/* Dashboard Summary Card */}
          <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                <img
                  src={getFlag(selectedTeam)}
                  alt={selectedTeam}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <span className="inline-block bg-amber-400/10 text-amber-300 font-mono text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-400/20 uppercase tracking-widest">
                  TEAM DOSSIER
                </span>
                <h2 className="font-anybody text-xl md:text-2xl font-black text-slate-50 uppercase tracking-tight">
                  {selectedTeam} Matches
                </h2>
                <p className="text-xs text-white/40 font-medium">
                  Allocated to <span className="text-amber-300 font-bold">{teamGroup}</span>
                </p>
              </div>
            </div>

            {/* Micro Quick info */}
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 p-3 px-5 rounded-xl text-center min-w-[100px]">
                <span className="text-[9px] font-mono text-white/50 block uppercase">Fixtures</span>
                <span className="text-base font-anybody font-black text-amber-300">{teamMatches.length}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 px-5 rounded-xl text-center min-w-[100px]">
                <span className="text-[9px] font-mono text-white/50 block uppercase">Timezone</span>
                <span className="text-xs font-bold text-slate-200">IST (UTC+5.5)</span>
              </div>
            </div>
          </div>

          {/* List of matches for this team */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-350 tracking-wider text-left pl-1">
              <Swords className="w-4 h-4 text-amber-300" />
              <span>ROUNDS SCHEDULE & TIMINGS</span>
            </div>

            {teamMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMatches.map(match => (
                  <MatchCard
                    key={match.matchNumber}
                    match={match}
                    onSelectTeam={t => {
                      setSelectedTeam(t);
                      setTeamSearch('');
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center text-slate-400 text-sm">
                No matches found matching suggestions list.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
