import { motion } from "framer-motion";
import { Book, Code, Terminal, Rocket, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";

const quickStart = [
  {
    title: "Install qBTC Node",
    description: "Download and install the qBTC node software",
    code: "curl -sSL https://get.qbtc.network/install.sh | bash",
  },
  {
    title: "Generate Wallet",
    description: "Create a new quantum-safe wallet",
    code: "qbtc-cli createwallet quantum_wallet",
  },
  {
    title: "Bridge Bitcoin",
    description: "Bridge your BTC to qBTC",
    code: "qbtc-cli bridge_in <btc_address> <amount>",
  },
  {
    title: "Send Transaction",
    description: "Send quantum-safe transactions",
    code: "qbtc-cli sendtoaddress <address> <amount>",
  },
];

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/blocks",
    description: "Get latest blocks",
  },
  {
    method: "GET",
    endpoint: "/api/v1/transactions/{txid}",
    description: "Get transaction details",
  },
  {
    method: "POST",
    endpoint: "/api/v1/bridge/peg-in",
    description: "Initiate BTC peg-in",
  },
  {
    method: "POST",
    endpoint: "/api/v1/bridge/peg-out",
    description: "Initiate BTC peg-out",
  },
];

const nodeSetup = [
  {
    title: "System Requirements",
    items: ["4+ CPU cores", "8GB+ RAM", "100GB+ SSD storage", "Ubuntu 20.04+"],
  },
  {
    title: "Network Configuration",
    items: ["Port 8333 (P2P)", "Port 8332 (RPC)", "Port 80/443 (API)", "IPv4/IPv6 support"],
  },
  {
    title: "Security Setup",
    items: ["SSL certificates", "Firewall rules", "User permissions", "Backup strategy"],
  },
];

export default function Docs() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 orange-gradient rounded-full flex items-center justify-center mx-auto mb-8">
              <Book className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-primary">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Complete guides and API references for building on the qBTC quantum-safe Bitcoin side-chain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search documentation..." 
                  className="pl-10"
                />
              </div>
              <Button className="orange-gradient text-white">
                Search
              </Button>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <Rocket className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Quick Start</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get up and running with qBTC in minutes. Install the node, create a wallet, and bridge your first Bitcoin.
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Building
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <Code className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>API Reference</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Complete REST API documentation with examples for all endpoints, authentication, and error handling.
                  </p>
                  <Button variant="outline" className="w-full">
                    View API Docs
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="glass-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <Terminal className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Node Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Detailed instructions for setting up and configuring qBTC nodes for development and production.
                  </p>
                  <Button variant="outline" className="w-full">
                    Setup Guide
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="quickstart" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="node">Node Setup</TabsTrigger>
            </TabsList>

            <TabsContent value="quickstart" className="mt-8">
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">Getting Started with qBTC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Follow these steps to get started with qBTC development. This guide assumes you have basic 
                      knowledge of Bitcoin and command-line tools.
                    </p>
                    
                    <div className="space-y-6">
                      {quickStart.map((step, index) => (
                        <motion.div
                          key={step.title}
                          className="border border-primary/20 rounded-lg p-6"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 orange-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                              <p className="text-muted-foreground mb-4">{step.description}</p>
                              <div className="bg-card border border-primary/30 p-4 rounded-lg">
                                <code className="text-primary font-mono">{step.code}</code>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Development Resources</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• <Link href="/technology" className="hover:text-primary">Technical Documentation</Link></li>
                          <li>• <Link href="/whitepaper" className="hover:text-primary">Whitepaper</Link></li>
                          <li>• <a href="#" className="hover:text-primary">GitHub Repository</a></li>
                          <li>• <a href="#" className="hover:text-primary">Discord Community</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Example Projects</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Quantum-safe wallet</li>
                          <li>• Bridge monitoring tool</li>
                          <li>• DeFi protocol integration</li>
                          <li>• Block explorer</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-8">
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">REST API Reference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      The qBTC API provides programmatic access to blockchain data, wallet functions, and bridge operations.
                    </p>
                    
                    <div className="bg-card border border-primary/30 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold text-primary mb-2">Base URL</h4>
                      <code className="text-foreground">https://api.qbtc.network/v1</code>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold">Endpoints</h4>
                      {apiEndpoints.map((endpoint, index) => (
                        <div key={endpoint.endpoint} className="border border-primary/20 rounded-lg p-4">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className={`px-3 py-1 rounded text-sm font-semibold ${
                              endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-primary font-mono">{endpoint.endpoint}</code>
                          </div>
                          <p className="text-muted-foreground">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      API requests require authentication using API keys. Include your API key in the request headers:
                    </p>
                    <div className="bg-card border border-primary/30 p-4 rounded-lg">
                      <code className="text-foreground">
                        Authorization: Bearer your_api_key_here
                      </code>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="node" className="mt-8">
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">Node Setup Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Setting up a qBTC node allows you to participate in the network, validate transactions, 
                      and access the full blockchain locally.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {nodeSetup.map((section, index) => (
                        <motion.div
                          key={section.title}
                          className="border border-primary/20 rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="font-semibold text-primary mb-3">{section.title}</h4>
                          <ul className="space-y-2 text-muted-foreground text-sm">
                            {section.items.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Installation Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">1. Download qBTC Node</h4>
                        <div className="bg-card border border-primary/30 p-4 rounded-lg">
                          <code className="text-foreground">
                            wget https://releases.qbtc.network/qbtc-node-latest.tar.gz
                          </code>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary mb-2">2. Extract and Install</h4>
                        <div className="bg-card border border-primary/30 p-4 rounded-lg">
                          <code className="text-foreground">
                            tar -xzf qbtc-node-latest.tar.gz && cd qbtc-node && ./install.sh
                          </code>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary mb-2">3. Configure Node</h4>
                        <div className="bg-card border border-primary/30 p-4 rounded-lg">
                          <code className="text-foreground">
                            qbtc-cli config set network=mainnet && qbtc-cli config set rpc.port=8332
                          </code>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary mb-2">4. Start Node</h4>
                        <div className="bg-card border border-primary/30 p-4 rounded-lg">
                          <code className="text-foreground">
                            systemctl start qbtc-node && systemctl enable qbtc-node
                          </code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
