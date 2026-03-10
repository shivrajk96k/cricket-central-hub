export type Tournament = "IPL" | "ODI" | "T20 World Cup" | "Test" | "The Ashes" | "Asia Cup";

export interface Match {
  id: string;
  tournament: Tournament;
  team1: { name: string; shortName: string; score?: string; overs?: string; flag: string };
  team2: { name: string; shortName: string; score?: string; overs?: string; flag: string };
  status: "live" | "upcoming" | "completed";
  venue: string;
  date: string;
  result?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
}

export const tournaments: Tournament[] = ["IPL", "ODI", "T20 World Cup", "Test", "The Ashes", "Asia Cup"];

export const matches: Match[] = [
  {
    id: "1",
    tournament: "IPL",
    team1: { name: "Mumbai Indians", shortName: "MI", score: "186/4", overs: "18.2", flag: "🔵" },
    team2: { name: "Chennai Super Kings", shortName: "CSK", score: "172/6", overs: "20.0", flag: "🟡" },
    status: "live",
    venue: "Wankhede Stadium, Mumbai",
    date: "Today",
  },
  {
    id: "2",
    tournament: "IPL",
    team1: { name: "Royal Challengers", shortName: "RCB", score: "205/3", overs: "20.0", flag: "🔴" },
    team2: { name: "Kolkata Knight Riders", shortName: "KKR", score: "142/5", overs: "15.3", flag: "🟣" },
    status: "live",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    date: "Today",
  },
  {
    id: "3",
    tournament: "ODI",
    team1: { name: "India", shortName: "IND", flag: "🇮🇳" },
    team2: { name: "Australia", shortName: "AUS", flag: "🇦🇺" },
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
    date: "Mar 15, 2026",
  },
  {
    id: "4",
    tournament: "T20 World Cup",
    team1: { name: "England", shortName: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    team2: { name: "South Africa", shortName: "SA", flag: "🇿🇦" },
    status: "upcoming",
    venue: "Lord's, London",
    date: "Mar 18, 2026",
  },
  {
    id: "5",
    tournament: "Test",
    team1: { name: "India", shortName: "IND", score: "456/7d", flag: "🇮🇳" },
    team2: { name: "England", shortName: "ENG", score: "312/10", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    status: "completed",
    venue: "Narendra Modi Stadium, Ahmedabad",
    date: "Mar 5, 2026",
    result: "India won by 144 runs",
  },
  {
    id: "6",
    tournament: "The Ashes",
    team1: { name: "Australia", shortName: "AUS", flag: "🇦🇺" },
    team2: { name: "England", shortName: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    status: "upcoming",
    venue: "The Gabba, Brisbane",
    date: "Apr 2, 2026",
  },
  {
    id: "7",
    tournament: "Asia Cup",
    team1: { name: "India", shortName: "IND", flag: "🇮🇳" },
    team2: { name: "Pakistan", shortName: "PAK", flag: "🇵🇰" },
    status: "upcoming",
    venue: "Dubai International Stadium",
    date: "Apr 10, 2026",
  },
  {
    id: "8",
    tournament: "IPL",
    team1: { name: "Delhi Capitals", shortName: "DC", score: "178/8", overs: "20.0", flag: "🔷" },
    team2: { name: "Rajasthan Royals", shortName: "RR", score: "180/4", overs: "19.1", flag: "💗" },
    status: "completed",
    venue: "Arun Jaitley Stadium, Delhi",
    date: "Yesterday",
    result: "Rajasthan Royals won by 6 wickets",
  },
];

export const news: NewsItem[] = [
  {
    id: "1",
    title: "Virat Kohli Smashes Century in Record Chase",
    excerpt: "Kohli's magnificent 112 off 98 balls guides India to a stunning victory against Australia in the 3rd ODI.",
    category: "ODI",
    date: "Mar 9, 2026",
    imageUrl: "",
  },
  {
    id: "2",
    title: "IPL 2026 Auction: Biggest Buys and Surprises",
    excerpt: "A complete breakdown of the most expensive players and surprise picks from the mega auction.",
    category: "IPL",
    date: "Mar 8, 2026",
    imageUrl: "",
  },
  {
    id: "3",
    title: "T20 World Cup Squad Announced",
    excerpt: "BCCI announces 15-member squad for the upcoming T20 World Cup with some surprising inclusions.",
    category: "T20 World Cup",
    date: "Mar 7, 2026",
    imageUrl: "",
  },
  {
    id: "4",
    title: "Jasprit Bumrah Returns to Training",
    excerpt: "India's pace spearhead spotted bowling at full tilt in the nets ahead of the England Test series.",
    category: "Test",
    date: "Mar 6, 2026",
    imageUrl: "",
  },
];

export const topPlayers = [
  { name: "Virat Kohli", team: "India", role: "Batsman", rating: 891, format: "ODI" },
  { name: "Jasprit Bumrah", team: "India", role: "Bowler", rating: 883, format: "Test" },
  { name: "Joe Root", team: "England", role: "Batsman", rating: 878, format: "Test" },
  { name: "Rashid Khan", team: "Afghanistan", role: "Bowler", rating: 750, format: "T20I" },
  { name: "Babar Azam", team: "Pakistan", role: "Batsman", rating: 856, format: "ODI" },
];
