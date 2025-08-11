import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QuantumSecurityWidget } from "@/components/QuantumSecurityWidget";
import { MouseTrail } from "@/components/MouseTrail";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Technology from "@/pages/Technology";
import QDay from "@/pages/QDay";
import Whitepaper from "@/pages/Whitepaper";
import Docs from "@/pages/Docs";
import Roadmap from "@/pages/Roadmap";
import Team from "@/pages/Team";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Wallet from "@/pages/Wallet";
import WalletSetup from "@/pages/WalletSetup";
import Explorer from "@/pages/Explorer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/technology" component={Technology} />
      <Route path="/q-day" component={QDay} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/docs" component={Docs} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/explorer" component={Explorer} />
      <Route path="/team" component={Team} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/wallet-setup" component={WalletSetup} />
      <Route path="/wallet" component={Wallet} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full">
            <Navigation />
            <main>
              <Router />
            </main>
            <Footer />
            <QuantumSecurityWidget />
            <MouseTrail />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
