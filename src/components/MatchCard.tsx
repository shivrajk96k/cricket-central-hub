import { motion } from "framer-motion";
import type { Match } from "@/data/mockData";

interface MatchCardProps {
  match: Match;
  index: number;
}

export function MatchCard({ match, index }: MatchCardProps) {
  const isLive = match.status === "live";
  const isCompleted = match.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`rounded-xl border p-4 md:p-5 transition-all hover:border-primary/30 ${
        isLive
          ? "gradient-live border-live/20 glow-live"
          : "gradient-card border-border hover:shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">{match.tournament}</span>
        {isLive && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-live">
            <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-live" />
            LIVE
          </span>
        )}
        {isCompleted && (
          <span className="text-xs font-medium text-primary">Completed</span>
        )}
        {match.status === "upcoming" && (
          <span className="text-xs text-muted-foreground">{match.date}</span>
        )}
      </div>

      <div className="space-y-3">
        <TeamRow
          flag={match.team1.flag}
          name={match.team1.shortName}
          score={match.team1.score}
          overs={match.team1.overs}
          isLive={isLive}
        />
        <TeamRow
          flag={match.team2.flag}
          name={match.team2.shortName}
          score={match.team2.score}
          overs={match.team2.overs}
          isLive={isLive}
        />
      </div>

      {match.result && (
        <p className="mt-3 text-xs font-medium text-primary">{match.result}</p>
      )}

      <p className="mt-3 text-[11px] text-muted-foreground truncate">{match.venue}</p>
    </motion.div>
  );
}

function TeamRow({
  flag,
  name,
  score,
  overs,
  isLive,
}: {
  flag: string;
  name: string;
  score?: string;
  overs?: string;
  isLive: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg">{flag}</span>
        <span className="text-sm font-semibold text-foreground">{name}</span>
      </div>
      {score && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${isLive ? "text-score" : "text-foreground"}`}>
            {score}
          </span>
          {overs && <span className="text-[11px] text-muted-foreground">({overs})</span>}
        </div>
      )}
    </div>
  );
}
