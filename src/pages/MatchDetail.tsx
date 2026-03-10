import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useMatchInfo, useMatchScorecard, useMatchBallByBall, getMatchTypeLabel } from "@/hooks/useCricketData";
import { hasApiKey } from "@/lib/cricketApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: match, isLoading } = useMatchInfo(id || "");
  const { data: scorecard } = useMatchScorecard(id || "");
  const { data: bbb } = useMatchBallByBall(id || "");

  const isLive = match?.matchStarted && !match?.matchEnded;

  if (!hasApiKey()) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container text-center">
          <p className="text-muted-foreground">Please set up your API key on the home page first.</p>
          <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block">← Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Matches
          </Link>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : match ? (
            <>
              {/* Match Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-6 md:p-8 mb-6 ${
                  isLive ? "gradient-live border-live/20" : "gradient-card border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {getMatchTypeLabel(match.matchType)}
                  </span>
                  {isLive && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-live">
                      <span className="h-2 w-2 rounded-full bg-live animate-pulse-live" />
                      LIVE
                    </span>
                  )}
                </div>

                <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">{match.name}</h1>
                <p className="text-sm text-muted-foreground">{match.venue}</p>

                {/* Scores */}
                {match.score && match.score.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {match.score.map((s, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-medium">{s.inning}</span>
                        <span className={`font-display text-2xl ${isLive && i === match.score!.length - 1 ? "text-score" : "text-foreground"}`}>
                          {s.r}/{s.w} <span className="text-sm text-muted-foreground">({s.o} ov)</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {match.status && (
                  <p className={`mt-4 text-sm font-semibold ${isLive ? "text-score" : "text-primary"}`}>
                    {match.status}
                  </p>
                )}
              </motion.div>

              {/* Tabs */}
              <Tabs defaultValue="scorecard" className="w-full">
                <TabsList className="bg-secondary border border-border w-full justify-start">
                  <TabsTrigger value="scorecard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Scorecard
                  </TabsTrigger>
                  <TabsTrigger value="commentary" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Ball by Ball
                  </TabsTrigger>
                  <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Info
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="scorecard" className="mt-4">
                  {scorecard ? (
                    <div className="gradient-card border border-border rounded-xl p-4 md:p-6">
                      <pre className="text-xs text-foreground whitespace-pre-wrap font-sans">
                        {JSON.stringify(scorecard, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm py-8 text-center">Scorecard not available yet</p>
                  )}
                </TabsContent>

                <TabsContent value="commentary" className="mt-4">
                  {bbb && (bbb as any)?.data ? (
                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                      {((bbb as any).data as any[]).slice(0, 50).map((ball: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.02 }}
                          className="gradient-card border border-border rounded-lg p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full min-w-[40px] text-center">
                              {ball.oversActual || ball.overs}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-foreground">{ball.comment}</p>
                              <p className="text-[10px] text-muted-foreground mt-1">
                                {ball.batsman} • {ball.bowler} • {ball.runs} run{ball.runs !== 1 ? "s" : ""}
                              </p>
                            </div>
                            <span className={`text-sm font-bold ${ball.wickets > 0 ? "text-live" : ball.runs >= 4 ? "text-score" : "text-foreground"}`}>
                              {ball.runs === 0 ? "•" : ball.runs}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm py-8 text-center">Ball-by-ball data not available</p>
                  )}
                </TabsContent>

                <TabsContent value="info" className="mt-4">
                  <div className="gradient-card border border-border rounded-xl p-4 md:p-6 space-y-3">
                    {[
                      { label: "Match", value: match.name },
                      { label: "Type", value: getMatchTypeLabel(match.matchType) },
                      { label: "Venue", value: match.venue },
                      { label: "Date", value: match.date },
                      { label: "Teams", value: match.teams?.join(" vs ") },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-start">
                        <span className="text-xs text-muted-foreground">{row.label}</span>
                        <span className="text-xs text-foreground font-medium text-right max-w-[60%]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <p className="text-center text-muted-foreground py-12">Match not found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
