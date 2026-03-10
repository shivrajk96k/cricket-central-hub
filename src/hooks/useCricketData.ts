import { useQuery } from "@tanstack/react-query";
import {
  getCurrentMatches,
  getCricScore,
  getMatchInfo,
  getMatchScorecard,
  getMatchBallByBall,
  getSeriesList,
  searchPlayers,
  getPlayerInfo,
  hasApiKey,
  type CricMatch,
} from "@/lib/cricketApi";

export function useCurrentMatches() {
  return useQuery({
    queryKey: ["currentMatches"],
    queryFn: () => getCurrentMatches(),
    enabled: hasApiKey(),
    refetchInterval: 30000, // refresh every 30s for live scores
    select: (data) => data.data,
  });
}

export function useCricScore() {
  return useQuery({
    queryKey: ["cricScore"],
    queryFn: () => getCricScore(),
    enabled: hasApiKey(),
    refetchInterval: 30000,
    select: (data) => data.data,
  });
}

export function useMatchInfo(matchId: string) {
  return useQuery({
    queryKey: ["matchInfo", matchId],
    queryFn: () => getMatchInfo(matchId),
    enabled: hasApiKey() && !!matchId,
    select: (data) => data.data,
  });
}

export function useMatchScorecard(matchId: string) {
  return useQuery({
    queryKey: ["scorecard", matchId],
    queryFn: () => getMatchScorecard(matchId),
    enabled: hasApiKey() && !!matchId,
    select: (data) => data.data,
  });
}

export function useMatchBallByBall(matchId: string) {
  return useQuery({
    queryKey: ["ballByBall", matchId],
    queryFn: () => getMatchBallByBall(matchId),
    enabled: hasApiKey() && !!matchId,
    refetchInterval: 15000,
    select: (data) => data.data,
  });
}

export function useSeriesList() {
  return useQuery({
    queryKey: ["series"],
    queryFn: () => getSeriesList(),
    enabled: hasApiKey(),
    select: (data) => data.data,
  });
}

export function useSearchPlayers(query: string) {
  return useQuery({
    queryKey: ["searchPlayers", query],
    queryFn: () => searchPlayers(query),
    enabled: hasApiKey() && query.length > 2,
    select: (data) => data.data,
  });
}

export function usePlayerInfo(playerId: string) {
  return useQuery({
    queryKey: ["playerInfo", playerId],
    queryFn: () => getPlayerInfo(playerId),
    enabled: hasApiKey() && !!playerId,
    select: (data) => data.data,
  });
}

// Helpers
export function categorizeMatches(matches: CricMatch[] | undefined) {
  if (!matches) return { live: [], upcoming: [], completed: [] };

  const live = matches.filter((m) => m.matchStarted && !m.matchEnded);
  const upcoming = matches.filter((m) => !m.matchStarted && !m.matchEnded);
  const completed = matches.filter((m) => m.matchEnded);

  return { live, upcoming, completed };
}

export function getMatchTypeLabel(type: string) {
  switch (type?.toLowerCase()) {
    case "t20": return "T20";
    case "odi": return "ODI";
    case "test": return "Test";
    case "t20i": return "T20I";
    default: return type?.toUpperCase() || "Cricket";
  }
}
