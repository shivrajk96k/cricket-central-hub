import { motion } from "framer-motion";
import { Trophy, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchPlayers } from "@/hooks/useCricketData";
import { hasApiKey } from "@/lib/cricketApi";
import { topPlayers } from "@/data/mockData";
import { useState } from "react";

export function StatsSection() {
  const [query, setQuery] = useState("");
  const { data: searchResults, isLoading } = useSearchPlayers(query);
  const apiReady = hasApiKey();

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              PLAYER <span className="text-primary">STATS</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Search players & view rankings</p>
          </div>
        </div>

        {/* Player Search */}
        {apiReady && (
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
            {isLoading && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                Searching...
              </span>
            )}
          </div>
        )}

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">Search Results</h3>
            <div className="grid gap-3">
              {searchResults.slice(0, 8).map((player, i) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 gradient-card rounded-xl border border-border p-4 hover:border-primary/20 transition-all cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-primary">
                    {player.name?.slice(0, 2)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground font-sans">{player.name}</h4>
                    <p className="text-xs text-muted-foreground">{player.country}</p>
                  </div>
                  {player.role && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {player.role}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Top Players (fallback) */}
        <div>
          <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">Top Ranked</h3>
          <div className="grid gap-3">
            {topPlayers.map((player, i) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 gradient-card rounded-xl border border-border p-4 hover:border-primary/20 transition-all"
              >
                <span className="font-display text-2xl text-muted-foreground w-8 text-center">
                  {i + 1}
                </span>
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                  🏏
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground font-sans">{player.name}</h4>
                  <p className="text-xs text-muted-foreground">{player.team} • {player.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-sm font-bold">{player.rating}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{player.format}</span>
                </div>
                {i === 0 && <Trophy className="h-5 w-5 text-score" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
