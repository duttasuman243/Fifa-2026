import React, { useState } from 'react';
import { MATCHES_DATA } from './data/matches';
import { Match } from './types';
import Teams from './components/Teams';
import Groups from './components/Groups';
import Timeline from './components/Timeline';
import TeamVsTeam from './components/TeamVsTeam';
import Fixtures from './components/Fixtures';
import KnockoutStage from './components/KnockoutStage';
// @ts-ignore
import sidebarStadium from './assets/images/fifa_sidebar_stadium_1781172699202.png';
import {
  Calendar,
  Layers,
  Compass,
  Trophy,
  Swords,
  Award,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'team-search' | 'group-explorer' | 'timeline' | 'tvt-compare' | 'fixtures' | 'knockout'>('team-search');

  // Shares filter state between views
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('USA');
  const [teamSearch, setTeamSearch] = useState('');

  // Mobile navigation drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigateToTeam = (team: string) => {
    setSelectedTeamFilter(team);
    setActiveTab('team-search');
    setTeamSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav Links setup matching 1:1 user priorities
  const navItems = [
    { id: 'team-search', label: '1. Team Search', icon: Compass },
    { id: 'group-explorer', label: '2. Group Explorer', icon: Trophy },
    { id: 'timeline', label: '3. Timeline View', icon: Calendar },
    { id: 'tvt-compare', label: '4. Team vs Team', icon: Swords },
    { id: 'fixtures', label: '5. Fixtures Table', icon: Layers },
    { id: 'knockout', label: '6. Knockout Path', icon: Award },
  ] as const;

  return (
    <div className="min-h-screen text-slate-100 flex flex-col md:flex-row font-sans relative antialiased selection:bg-amber-400 selection:text-slate-950" style={{ backgroundColor: '#030612', backgroundImage: 'radial-gradient(circle at 0% 0%, #1a1f3c 0%, transparent 40%), radial-gradient(circle at 100% 100%, #1c102b 0%, transparent 40%)' }}>
      
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-50 bg-black/45 border-b border-white/10 backdrop-blur-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-slate-900 font-anybody">
            FW
          </div>
          <span className="font-anybody font-extrabold tracking-tighter uppercase text-sm">
            FIFA WORLD CUP <span className="text-amber-300">2026</span>
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop Persistent / Mobile Slide-out Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-72 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-transform duration-300 transform md:transform-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isSidebarOpen ? 'h-full pt-16' : ''}`}
      >
        <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Logo area */}
            <div className="hidden md:flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center font-black text-slate-950 font-anybody text-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] select-none">
                FW
              </div>
              <div>
                <h2 className="font-anybody font-extrabold text-sm uppercase tracking-wider text-slate-50">
                  FIFA SCHEDULE
                </h2>
                <p className="font-mono text-[9px] font-black text-amber-300 tracking-widest uppercase">
                  IST PORTAL 2026
                </p>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {navItems.map(item => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/10 shadow-inner shadow-white/5'
                        : 'text-white/60 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-white/60'}`} />
                    <span className={isActive ? 'text-amber-400' : ''}>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Timezone Status & Sidebar Footer */}
          <div className="pt-6 border-t border-white/10 mt-6 hidden md:block space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10">
              <p className="text-[10px] font-semibold text-white/50 mb-1 uppercase tracking-wider">Timezone</p>
              <p className="text-xs font-bold text-white">IST (UTC+5:30) Explorer</p>
            </div>

            {/* Premium decorative side panel matching mock */}
            <div className="relative overflow-hidden rounded-2xl border border-white/15 h-28 flex flex-col justify-end p-3.5 bg-cover bg-center group transition-all hover:border-amber-400/30 shadow-lg" style={{ backgroundImage: `url(${sidebarStadium})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-[#030612]/30 to-transparent animate-fade-in" />
              <div className="relative z-10 space-y-0.5">
                <span className="inline-block bg-amber-400 text-slate-950 font-mono text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest leading-none mb-1">
                  OFFICIAL
                </span>
                <h3 className="font-anybody font-extrabold text-[10px] tracking-tight text-white uppercase group-hover:text-amber-300 transition-all">
                  The World is Watching
                </h3>
                <p className="font-mono text-[8px] text-slate-350 font-semibold tracking-wider uppercase">
                  48 Nations &bull; 104 Matches
                </p>
              </div>
            </div>
            
            <div className="text-[10px] text-slate-500 font-mono">
              <p>ALL SCHEDULE DATA &copy; 2026 FIFA</p>
              <p className="text-amber-300/40 text-[9px] mt-1 uppercase">SERVED ONLY IN INDIAN TIME</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay backdrop for mobile slide-out menu */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-x-hidden min-h-[calc(100vh-64px)] md:min-h-screen flex flex-col justify-between">
        
        {/* Render Switcher depending on current Tab state */}
        <div className="flex-1 pb-16">
          {activeTab === 'team-search' && (
            <Teams
              matches={MATCHES_DATA}
              selectedTeam={selectedTeamFilter}
              setSelectedTeam={setSelectedTeamFilter}
              teamSearch={teamSearch}
              setTeamSearch={setTeamSearch}
            />
          )}

          {activeTab === 'group-explorer' && (
            <Groups
              matches={MATCHES_DATA}
              onNavigateToTeam={handleNavigateToTeam}
            />
          )}

          {activeTab === 'timeline' && (
            <Timeline
              matches={MATCHES_DATA}
              onNavigateToTeam={handleNavigateToTeam}
            />
          )}

          {activeTab === 'tvt-compare' && (
            <TeamVsTeam
              matches={MATCHES_DATA}
              onNavigateToTeam={handleNavigateToTeam}
            />
          )}

          {activeTab === 'fixtures' && (
            <Fixtures
              matches={MATCHES_DATA}
              onNavigateToTeam={handleNavigateToTeam}
            />
          )}

          {activeTab === 'knockout' && (
            <KnockoutStage
              matches={MATCHES_DATA}
              onNavigateToTeam={handleNavigateToTeam}
            />
          )}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-white/5 pt-6 pb-2 text-center text-xs text-slate-500 font-mono flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            This website is a static tournament schedule search engine. All match schedules are populated from extracted PDF tournament logs.
          </p>
          <p className="text-amber-200/50">
            Precision IST Scheduler Engine Running Successfully
          </p>
        </footer>
      </main>

    </div>
  );
}
