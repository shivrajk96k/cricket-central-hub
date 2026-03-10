import cricketBall from "@/assets/cricket-ball.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={cricketBall} alt="" className="h-6 w-6" />
              <span className="font-display text-xl text-foreground">
                CRICKET<span className="text-primary">HUB</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your ultimate destination for live cricket scores, stats, and updates across all tournaments worldwide.
            </p>
          </div>
          {[
            { title: "Tournaments", links: ["IPL", "ODI Series", "T20 World Cup", "Test Matches", "The Ashes", "Asia Cup"] },
            { title: "Quick Links", links: ["Live Scores", "Schedule", "Rankings", "News", "Highlights"] },
            { title: "Support", links: ["About Us", "Contact", "Privacy Policy", "Terms of Service"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm text-foreground mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 CricketHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
