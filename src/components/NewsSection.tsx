import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { news } from "@/data/mockData";

export function NewsSection() {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">LATEST NEWS</h2>
            <p className="text-sm text-muted-foreground mt-1">Cricket updates from around the world</p>
          </div>
          <button className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group gradient-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="h-40 bg-secondary flex items-center justify-center">
                <span className="text-4xl">🏏</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
