import { motion } from "framer-motion";
import { Trophy, TrendingUp } from "lucide-react";
import { topPlayers } from "@/data/mockData";

export function StatsSection() {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
          TOP RANKED <span className="text-primary">PLAYERS</span>
        </h2>

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
                <p className="text-xs text-muted-foreground">
                  {player.team} • {player.role}
                </p>
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
    </section>
  );
}
