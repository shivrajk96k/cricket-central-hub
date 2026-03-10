import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LiveScoresSection } from "@/components/LiveScoresSection";
import { FantasySection } from "@/components/FantasySection";
import { SeriesSection } from "@/components/SeriesSection";
import { NewsSection } from "@/components/NewsSection";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LiveScoresSection />
      <FantasySection />
      <SeriesSection />
      <StatsSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
