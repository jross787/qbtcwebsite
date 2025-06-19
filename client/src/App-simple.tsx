import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ThemeProvider";

function SimpleHome() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            qBTC
          </span>
        </h1>
        <h2 className="text-4xl font-bold mb-8 text-white">
          Quantum-Safe Bitcoin, Ready Today.
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          qBTC is a proof-of-work side-chain that inherits Bitcoin's economics while upgrading its cryptography to survive the first large-scale quantum computer.
        </p>
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all">
            Read the Whitepaper
          </button>
          <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all">
            Join the Testnet
          </button>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={SimpleHome} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen">
          <Router />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;