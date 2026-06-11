export type MatchStatus = 'Upcoming' | 'Live' | 'Finished';

export type MatchStage =
  | 'Group Stage'
  | 'Round of 32'
  | 'Round of 16'
  | 'Quarter Finals'
  | 'Semi Finals'
  | 'Bronze Match'
  | 'Final';

export interface Match {
  matchNumber: number;
  teamA: string;
  teamB: string;
  group: string; // e.g. "Group A" or "None" for knockouts
  date: string; // e.g. "11 Jun 2026"
  timeIST: string; // e.g. "22:30 IST"
  rawDate: string; // YYYY-MM-DD for sorting/filtering
  venue: string;
  stage: MatchStage;
  status: MatchStatus;
  teamAFlag: string;
  teamBFlag: string;
  scoreA?: number;
  scoreB?: number;
  minute?: number; // e.g. 72 (for Live)
}

export interface GroupConfig {
  id: string; // A - L
  name: string; // "Group A"
  color: string; // tailwind gradient color
  teams: string[];
}

export interface QuickStats {
  totalTeams: number;
  totalMatches: number;
  groupStageMatches: number;
  knockoutStageMatches: number;
  upcomingMatches: number;
}
