import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useSeriesList } from "@/hooks/useCricketData";
import { hasApiKey } from "@/lib/cricketApi";

export function SeriesSection() {
  const apiReady = hasApiKey();
  const { data: series, isLoading } = useSeriesList();

  if (!apiReady) return null;

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
          TOURNAMENTS & <span className="text-primary">SERIES</span>
        </h2>

        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[280px] h-32 rounded-xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {series?.slice(0, 8).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="gradient-card border border-border rounded-xl p-5 hover:border-primary/20 transition-all cursor-pointer"
              >
                <h3 className="text-sm font-bold text-foreground font-sans mb-2 line-clamp-2">{s.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  {s.startDate} — {s.endDate}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {s.odi > 0 && <Badge label={`${s.odi} ODI`} />}
                  {s.t20 > 0 && <Badge label={`${s.t20} T20`} />}
                  {s.test > 0 && <Badge label={`${s.test} Test`} />}
                  <Badge label={`${s.matches} Matches`} accent />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Badge({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
      accent ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
    }`}>
      {label}
    </span>
  );
}
