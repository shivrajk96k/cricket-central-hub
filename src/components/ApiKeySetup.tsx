import { useState } from "react";
import { motion } from "framer-motion";
import { Key, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setApiKey, hasApiKey } from "@/lib/cricketApi";

interface ApiKeySetupProps {
  onKeySet: () => void;
}

export function ApiKeySetup({ onKeySet }: ApiKeySetupProps) {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(hasApiKey());

  const handleSave = () => {
    if (key.trim()) {
      setApiKey(key.trim());
      setSaved(true);
      onKeySet();
    }
  };

  if (saved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-card border border-primary/20 rounded-xl p-6 text-center"
      >
        <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
        <p className="text-sm font-medium text-foreground">API Key Connected</p>
        <p className="text-xs text-muted-foreground mt-1">Live cricket data is now active</p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 text-xs text-muted-foreground"
          onClick={() => { setSaved(false); setKey(""); }}
        >
          Change Key
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="gradient-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Key className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground font-sans">Connect Live Data</h3>
          <p className="text-xs text-muted-foreground">Free API key from CricketData.org</p>
        </div>
      </div>

      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Paste your API key here..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={!key.trim()} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Connect
          </Button>
          <Button variant="outline" className="border-border text-foreground" asChild>
            <a href="https://cricketdata.org" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" /> Get Key
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground">How to get your free key:</strong><br />
          1. Visit <a href="https://cricketdata.org" target="_blank" className="text-primary hover:underline">cricketdata.org</a><br />
          2. Sign up for a free account<br />
          3. Copy your API key from the dashboard<br />
          4. Paste it above — 100 free requests/day!
        </p>
      </div>
    </motion.div>
  );
}
