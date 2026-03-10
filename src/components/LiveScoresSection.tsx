import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2, Wifi, WifiOff, Clock } from "lucide-react";
import { useCurrentMatches, categorizeMatches, getMatchTypeLabel } from "@/hooks/useCricketData";
import { hasApiKey, type CricMatch } from "@/lib/cricketApi";
import { ApiKeySetup } from "@/components/ApiKeySetup";
import { useState } from "react";

const MATCH_TYPE_FILTERS = ["All", "T20", "ODI", "Test", "T20I"];

export function LiveScoresSection() {
  const [filter, setFilter] = useState("All");
  const [keyReady, setKeyReady] = useState(hasApiKey());
  const { data: matches, isLoading, error } = useCurrentMatches();
  const { live, upcoming, completed } = categorizeMatches(matches);

  const filterMatches = (list: CricMatch[]) =>
    filter === "All" ? list : list.filter((m) => m.matchType?.toLowerCase() === filter.toLowerCase());

  if (!keyReady) {
    return (
      <section className="py-12 md:py-16">
        <div className="container max-w-md">
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-8">
            LIVE <span className="text-primary">SCORES</span>
          </h2>
          <ApiKeySetup onKeySet={() => setKeyReady(true)} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              MATCHES & <span className="text-primary">SCORES</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Real-time scores across all tournaments</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {MATCH_TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                filter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading live data...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <WifiOff className="h-10 w-10 text-destructive mx-auto mb-3" />
            <p className="text-sm text-destructive font-medium">Failed to load matches</p>
            <p className="text-xs text-muted-foreground mt-1">{(error as Error).message}</p>
          </div>
        )}

        {!isLoading && !error && matches && (
          <>
            {/* Live Matches */}
            {filterMatches(live).length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Wifi className="h-4 w-4 text-live" />
                  <h3 className="text-sm font-bold text-live uppercase">Live Now</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filterMatches(live).map((match, i) => (
                    <RealMatchCard key={match.id} match={match} index={i} isLive />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming */}
            {filterMatches(upcoming).length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-bold text-muted-foreground uppercase">Upcoming</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filterMatches(upcoming).map((match, i) => (
                    <RealMatchCard key={match.id} match={match} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {filterMatches(completed).length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase">Recent Results</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filterMatches(completed).slice(0, 6).map((match, i) => (
                    <RealMatchCard key={match.id} match={match} index={i} />
                  ))}
                </div>
              </div>
            )}

            {matches.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No matches found</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function RealMatchCard({ match, index, isLive }: { match: CricMatch; index: number; isLive?: boolean }) {
  const team1 = match.teamInfo?.[0];
  const team2 = match.teamInfo?.[1];
  const score1 = match.score?.find((s) => s.inning?.includes(match.teams?.[0] || ""));
  const score2 = match.score?.find((s) => s.inning?.includes(match.teams?.[1] || ""));

  return (
    <Link to={`/match/${match.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className={`rounded-xl border p-4 md:p-5 transition-all cursor-pointer hover:border-primary/30 ${
          isLive ? "gradient-live border-live/20 glow-live" : "gradient-card border-border hover:shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {getMatchTypeLabel(match.matchType)}
          </span>
          {isLive && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-live">
              <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-live" />
              LIVE
            </span>
          )}
          {match.matchEnded && <span className="text-xs text-primary">Completed</span>}
        </div>

        <div className="space-y-3">
          <TeamRow
            img={team1?.img}
            name={team1?.shortname || match.teams?.[0] || "TBA"}
            score={score1 ? `${score1.r}/${score1.w}` : undefined}
            overs={score1 ? `${score1.o}` : undefined}
            isLive={!!isLive}
          />
          <TeamRow
            img={team2?.img}
            name={team2?.shortname || match.teams?.[1] || "TBA"}
            score={score2 ? `${score2.r}/${score2.w}` : undefined}
            overs={score2 ? `${score2.o}` : undefined}
            isLive={!!isLive}
          />
        </div>

        {match.status && (
          <p className={`mt-3 text-xs font-medium ${isLive ? "text-score" : "text-primary"} line-clamp-1`}>
            {match.status}
          </p>
        )}

        <p className="mt-2 text-[11px] text-muted-foreground truncate">{match.venue}</p>
      </motion.div>
    </Link>
  );
}

function TeamRow({ img, name, score, overs, isLive }: {
  img?: string; name: string; score?: string; overs?: string; isLive: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {img ? (
          <img src={img} alt={name} className="h-6 w-6 rounded-full object-cover bg-secondary" />
        ) : (
          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
            {name.slice(0, 2)}
          </div>
        )}
        <span className="text-sm font-semibold text-foreground">{name}</span>
      </div>
      {score && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${isLive ? "text-score" : "text-foreground"}`}>{score}</span>
          {overs && <span className="text-[11px] text-muted-foreground">({overs} ov)</span>}
        </div>
      )}
    </div>
  );
}
