import { motion } from "framer-motion";
import { ArrowRight, Newspaper, TrendingUp, Video } from "lucide-react";
import { news } from "@/data/mockData";

const categories = [
  { label: "Trending", icon: TrendingUp },
  { label: "Videos", icon: Video },
  { label: "News", icon: Newspaper },
];

export function NewsSection() {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              LATEST <span className="text-primary">NEWS</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Cricket updates from around the world</p>
          </div>
          <button className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
            >
              <cat.icon className="h-3 w-3" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="grid gap-6 lg:grid-cols-5 mb-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 gradient-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="h-56 bg-secondary flex items-center justify-center relative">
              <span className="text-6xl">🏏</span>
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase text-primary-foreground bg-primary px-2 py-1 rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {news[0].category}
                </span>
                <span className="text-[10px] text-muted-foreground">{news[0].date}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors font-sans">
                {news[0].title}
              </h3>
              <p className="text-sm text-muted-foreground">{news[0].excerpt}</p>
            </div>
          </motion.article>

          <div className="lg:col-span-2 grid gap-4">
            {news.slice(1).map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gradient-card rounded-xl border border-border p-4 hover:border-primary/30 transition-all cursor-pointer group flex gap-4"
              >
                <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-2xl">🏏</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold uppercase text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground leading-tight group-hover:text-primary transition-colors font-sans line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
