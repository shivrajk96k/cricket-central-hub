import { motion } from "framer-motion";
import { Trophy, Users, Zap, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fantasyContests = [
  { id: "1", name: "Mega Contest", prize: "₹10 Lakhs", entry: "₹49", spots: 50000, filled: 38420, match: "MI vs CSK" },
  { id: "2", name: "Head to Head", prize: "₹90", entry: "₹49", spots: 2, filled: 1, match: "RCB vs KKR" },
  { id: "3", name: "Small League", prize: "₹5,000", entry: "₹19", spots: 500, filled: 312, match: "IND vs AUS" },
  { id: "4", name: "Grand League", prize: "₹25 Lakhs", entry: "₹99", spots: 100000, filled: 67890, match: "T20 WC Final" },
];

export function FantasySection() {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-score" />
              <span className="text-xs font-bold uppercase text-score">Fantasy Cricket</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              CREATE YOUR <span className="text-primary">DREAM TEAM</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Pick your best XI and win big!</p>
          </div>
          <Link to="/fantasy">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-1">
              All Contests <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fantasyContests.map((contest, i) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{contest.match}</span>
                <Trophy className="h-4 w-4 text-score" />
              </div>

              <h3 className="text-sm font-bold text-foreground font-sans mb-1">{contest.name}</h3>
              <p className="font-display text-2xl text-primary mb-3">{contest.prize}</p>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-accent transition-all"
                    style={{ width: `${(contest.filled / contest.spots) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">
                    {contest.spots - contest.filled} spots left
                  </span>
                  <span className="text-[10px] text-muted-foreground">{contest.spots} spots</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{contest.filled.toLocaleString()}</span>
                </div>
                <Button size="sm" className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90 group-hover:glow-primary">
                  {contest.entry}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { icon: Trophy, label: "Contests Won", value: "2.5M+" },
            { icon: Users, label: "Active Players", value: "15M+" },
            { icon: Star, label: "Matches Covered", value: "500+" },
            { icon: Zap, label: "Prize Pool Daily", value: "₹50Cr+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center p-4 rounded-xl bg-secondary/50 border border-border"
            >
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="font-display text-xl text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
