import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cricket.jpg";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <img
        src={heroImage}
        alt="Cricket Stadium"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative container h-full flex flex-col justify-end pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-live/20 border border-live/30 px-3 py-1 text-xs font-semibold text-live">
              <span className="h-2 w-2 rounded-full bg-live animate-pulse-live" />
              LIVE NOW
            </span>
            <span className="text-xs text-muted-foreground">IPL 2026 • Match 42</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-4 text-foreground">
            EVERY BALL.<br />
            <span className="text-primary">EVERY MATCH.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg">
            Live scores, ball-by-ball commentary, player stats & more across IPL, ODI, T20 World Cup and all international cricket.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 h-12 text-base font-semibold glow-primary">
              <Play className="h-4 w-4" /> Watch Live
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2 px-6 h-12 text-base">
              View Schedule <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
