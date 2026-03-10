import { useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { matches, tournaments, type Tournament } from "@/data/mockData";

export function LiveScoresSection() {
  const [activeTournament, setActiveTournament] = useState<"All" | Tournament>("All");

  const filtered = activeTournament === "All"
    ? matches
    : matches.filter((m) => m.tournament === activeTournament);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">MATCHES & SCORES</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Follow live scores across all tournaments
            </p>
          </div>
        </div>

        {/* Tournament Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {["All", ...tournaments].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTournament(t as "All" | Tournament)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeTournament === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
