import React, { useState, useMemo } from 'react';
import { Match, MatchStage } from '../types';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Globe } from 'lucide-react';
import { getFlag } from '../utils/flags';

interface FixturesProps {
  matches: Match[];
  onNavigateToTeam?: (team: string) => void;
}

type SortField = 'matchNumber' | 'date' | 'group' | 'stage';
type SortDirection = 'asc' | 'desc';

export default function Fixtures({ matches, onNavigateToTeam }: FixturesProps) {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [timezone, setTimezone] = useState<'IST' | 'Local'>('IST');

  // Sort State
  const [sortField, setSortField] = useState<SortField>('matchNumber');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Options for dropdowns
  const groupOptions = useMemo(() => {
    const groups = matches.map(m => m.group).filter(g => g !== 'None' && g !== '');
    return ['All', ...Array.from(new Set(groups))].sort();
  }, [matches]);

  const stageOptions = useMemo(() => {
    const stages = matches.map(m => m.stage);
    return ['All', ...Array.from(new Set(stages))];
  }, [matches]);

  // Handle Header Sorting Click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Convert Time helper
  const formatTime = (timeIST: string, dateStr: string) => {
    if (timezone === 'Local') {
      // EDT calculation: Eastern Time is roughly 9h 30m behind IST.
      if (timeIST.includes('00:30')) return '15:00 EDT (Prev Day Acc)';
      if (timeIST.includes('01:30')) return '16:00 EDT';
      if (timeIST.includes('02:30')) return '17:00 EDT';
      if (timeIST.includes('03:30')) return '18:00 EDT';
      if (timeIST.includes('04:30')) return '19:00 EDT';
      if (timeIST.includes('06:30')) return '21:00 EDT';
      if (timeIST.includes('07:30')) return '22:00 EDT';
      if (timeIST.includes('08:30')) return '23:00 EDT';
      if (timeIST.includes('18:30')) return '09:00 EDT';
      if (timeIST.includes('20:30')) return '11:00 EDT';
      if (timeIST.includes('21:30')) return '12:00 EDT';
      if (timeIST.includes('22:30')) return '13:00 EDT';
      if (timeIST.includes('22:35')) return '13:05 EDT';
      if (timeIST.includes('23:30')) return '14:00 EDT';
      return 'Arena EDT';
    }
    return timeIST;
  };

  // Filter & Sorted Matches
  const filteredMatches = useMemo(() => {
    let result = [...matches];

    // Search query: teamA, teamB, venue
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        m =>
          m.teamA.toLowerCase().includes(q) ||
          m.teamB.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q) ||
          m.group.toLowerCase().includes(q) ||
          m.stage.toLowerCase().includes(q)
      );
    }

    // Group Filter
    if (selectedGroup !== 'All') {
      result = result.filter(m => m.group === selectedGroup);
    }

    // Stage Filter
    if (selectedStage !== 'All') {
      result = result.filter(m => m.stage === selectedStage);
    }

    // Sorting
    result.sort((a, b) => {
      let multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (sortField === 'matchNumber') {
        return (a.matchNumber - b.matchNumber) * multiplier;
      }
      if (sortField === 'date') {
        return (a.rawDate.localeCompare(b.rawDate)) * multiplier;
      }
      if (sortField === 'group') {
        return (a.group.localeCompare(b.group)) * multiplier;
      }
      if (sortField === 'stage') {
        const stageOrder: MatchStage[] = [
          'Group Stage',
          'Round of 32',
          'Round of 16',
          'Quarter Finals',
          'Semi Finals',
          'Bronze Match',
          'Final',
        ];
        return (stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage)) * multiplier;
      }
      return 0;
    });

    return result;
  }, [matches, searchTerm, selectedGroup, selectedStage, sortField, sortDirection]);

  // Paginated Matches
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage) || 1;
  const paginatedMatches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMatches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMatches, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Title Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm shadow-xl">
        <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
          OFFICIAL SCHEDULER
        </p>
        <h1 className="font-anybody text-2xl md:text-3xl font-extrabold text-slate-100 uppercase tracking-tighter mb-2">
          Master Fixtures Schedule
        </h1>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          The ultimate master database of the entire 104-match program. Filter by Group or Tournament stage, type a team name to search, and toggle between Indian Standard Time (IST) or stadium Arena local Eastern Daylight Time of North America.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-black/30 rounded-2xl p-5 border border-white/10 shadow-xl space-y-4 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          
          {/* Text Search */}
          <div className="flex-1">
            <label className="block font-mono text-[9px] font-black text-white/40 mb-1.5 uppercase tracking-wide">
              Search Matches
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search team, group, stage or stadium..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-white/30 focus:border-amber-400 outline-none transition-all focus:ring-1 focus:ring-amber-500/10"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-w-[340px] lg:min-w-[480px]">
            {/* Filter by Group */}
            <div>
              <label className="block font-mono text-[9px] font-black text-white/40 mb-1.5 uppercase tracking-wide">
                Group Partition
              </label>
              <select
                value={selectedGroup}
                onChange={e => {
                  setSelectedGroup(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-sm text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="All" className="bg-slate-950">All Groups</option>
                {groupOptions.filter(g => g !== 'All').map(g => (
                  <option key={g} value={g} className="bg-slate-950">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Stage */}
            <div>
              <label className="block font-mono text-[9px] font-black text-white/40 mb-1.5 uppercase tracking-wide">
                Stage
              </label>
              <select
                value={selectedStage}
                onChange={e => {
                  setSelectedStage(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-sm text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="All" className="bg-slate-950">All Stages</option>
                {stageOptions.filter(s => s !== 'All').map(s => (
                  <option key={s} value={s} className="bg-slate-950">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Timezone Converter */}
            <div>
              <label className="block font-mono text-[9px] font-black text-white/40 mb-1.5 uppercase tracking-wide">
                Timezone Mode
              </label>
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value as 'IST' | 'Local')}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-sm text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="IST" className="bg-slate-950">IST (UTC+5:30)</option>
                <option value="Local" className="bg-slate-950">Local Venue Time (EDT)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Fixtures Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead className="bg-black/30 border-b border-white/10">
              <tr>
                <th
                  onClick={() => handleSort('matchNumber')}
                  className="py-4 px-6 font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest cursor-pointer hover:text-amber-200 select-none w-[110px]"
                >
                  <div className="flex items-center gap-1">
                    Match # <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('date')}
                  className="py-4 px-6 font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest cursor-pointer hover:text-amber-200 select-none w-[180px]"
                >
                  <div className="flex items-center gap-1">
                    Kickoff Time <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-4 px-6 font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  Matchup (Static Schedule)
                </th>
                <th className="py-4 px-6 font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest w-[160px]">
                  Group / Stage
                </th>
                <th className="py-4 px-6 font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  Stadium Venue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedMatches.length > 0 ? (
                paginatedMatches.map(match => (
                  <tr key={match.matchNumber} className="hover:bg-white/[0.03] transition-all duration-150">
                    {/* Match Number */}
                    <td className="py-4 px-6 font-mono text-xs text-amber-300 font-bold">
                      #{String(match.matchNumber).padStart(2, '0')}
                    </td>

                    {/* Kickoff Date & Time */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-100 font-mono">
                          {match.date}
                        </span>
                        <span className="text-[10px] text-amber-200 font-bold font-mono uppercase bg-amber-400/5 border border-amber-400/10 px-1 py-0.5 rounded w-max mt-1">
                          {formatTime(match.timeIST, match.rawDate)}
                        </span>
                      </div>
                    </td>

                    {/* Matchup side-by-side with country flags */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {/* Team A */}
                        <button
                          onClick={() => onNavigateToTeam?.(match.teamA)}
                          className="flex items-center gap-2 group/btn focus:outline-none cursor-pointer"
                        >
                          <img
                            src={match.teamAFlag}
                            alt={match.teamA}
                            className="w-5 h-5 rounded-full object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-xs font-bold text-slate-100 group-hover/btn:text-amber-300 transition-colors">
                            {match.teamA}
                          </span>
                        </button>

                        <span className="text-[10px] font-black text-white/20 font-mono tracking-widest">
                          VS
                        </span>

                        {/* Team B */}
                        <button
                          onClick={() => onNavigateToTeam?.(match.teamB)}
                          className="flex items-center gap-2 group/btn focus:outline-none cursor-pointer"
                        >
                          <img
                            src={match.teamBFlag}
                            alt={match.teamB}
                            className="w-5 h-5 rounded-full object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-xs font-bold text-slate-100 group-hover/btn:text-amber-300 transition-colors">
                            {match.teamB}
                          </span>
                        </button>
                      </div>
                    </td>

                    {/* Group / Stage */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-200">
                          {match.stage}
                        </span>
                        {match.group !== 'None' && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {match.group}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stadium Venue */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-350">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[240px]" title={match.venue}>
                          {match.venue}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-sm font-mono">
                    No matching fixtures found. Try adjusting filters or typing another query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginated Footer */}
        {totalPages > 1 && (
          <div className="bg-black/20 p-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Showing page {currentPage} of {totalPages} ({filteredMatches.length} matches)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-white/5 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-white/5 cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
