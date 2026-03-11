// CricketData.org API Client
// Free tier: 100 requests/day, all tournaments
// Sign up at https://cricketdata.org to get your free API key

const API_BASE = "https://api.cricapi.com/v1";

// Store API key - users should set this
let API_KEY = localStorage.getItem("cricket_api_key") || "020c034d-dc1f-42a4-8225-b9c20ef0fd4e";

export function setApiKey(key: string) {
  API_KEY = key;
  localStorage.setItem("cricket_api_key", key);
}

export function getApiKey(): string {
  return API_KEY;
}

export function hasApiKey(): boolean {
  return API_KEY.length > 0;
}

async function fetchApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error("API key not set. Please enter your CricketData.org API key.");
  }

  const url = new URL(`${API_BASE}/${endpoint}`);
  url.searchParams.set("apikey", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API Error: ${res.status}`);

  const data = await res.json();
  if (data.status !== "success") {
    throw new Error(data.reason || "API request failed");
  }
  return data;
}

// Types
export interface CricMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: ScoreInfo[];
  series_id?: string;
  fantasyEnabled?: boolean;
  bpiEnabled?: boolean;
  hasSquad?: boolean;
  matchStarted?: boolean;
  matchEnded?: boolean;
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface ScoreInfo {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface PlayerInfo {
  id: string;
  name: string;
  country: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  role?: string;
  stats?: PlayerStats[];
}

export interface PlayerStats {
  fn: string; // format name
  matchtype: string;
  stat: Record<string, string>;
}

export interface SeriesInfo {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
}

export interface BallByBall {
  id: string;
  bpiEnabled: boolean;
  data: BallData[];
}

export interface BallData {
  overs: number;
  oversActual: string;
  score: number;
  wickets: number;
  runs: number;
  comment: string;
  batsman: string;
  bowler: string;
}

// API Functions

/** Get current live & recent matches */
export async function getCurrentMatches(offset = 0) {
  return fetchApi<{ data: CricMatch[] }>("currentMatches", { offset: String(offset) });
}

/** Get match info by ID */
export async function getMatchInfo(matchId: string) {
  return fetchApi<{ data: CricMatch }>("match_info", { id: matchId });
}

/** Get match scorecard */
export async function getMatchScorecard(matchId: string) {
  return fetchApi<{ data: any }>("match_scoreCard", { id: matchId });
}

/** Get ball-by-ball commentary */
export async function getMatchBallByBall(matchId: string) {
  return fetchApi<{ data: BallByBall }>("match_bbb", { id: matchId });
}

/** Get player info */
export async function getPlayerInfo(playerId: string) {
  return fetchApi<{ data: PlayerInfo }>("players_info", { id: playerId });
}

/** Search players */
export async function searchPlayers(query: string, offset = 0) {
  return fetchApi<{ data: PlayerInfo[] }>("players", { search: query, offset: String(offset) });
}

/** Get series list */
export async function getSeriesList(offset = 0) {
  return fetchApi<{ data: SeriesInfo[] }>("series", { offset: String(offset) });
}

/** Get series info */
export async function getSeriesInfo(seriesId: string) {
  return fetchApi<{ data: SeriesInfo }>("series_info", { id: seriesId });
}

/** Get match squad */
export async function getMatchSquad(matchId: string) {
  return fetchApi<{ data: any }>("match_squad", { id: matchId });
}

/** Get cricket score (simple format - fixtures/live/results) */
export async function getCricScore(offset = 0) {
  return fetchApi<{ data: CricMatch[] }>("cricScore", { offset: String(offset) });
}
