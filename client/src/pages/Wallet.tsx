import { motion } from "framer-motion";
import { useState } from "react";
import { Wallet as WalletIcon, Send, ArrowDownLeft, Shield, Eye, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const mockTransactions = [
  {
    id: "1",
    type: "receive",
    amount: "0.5",
    hash: "abc123...def456",
    timestamp: "2024-06-20 14:30",
    status: "confirmed"
  },
  {
    id: "2", 
    type: "send",
    amount: "0.25",
    hash: "xyz789...uvw012",
    timestamp: "2024-06-20 10:15",
    status: "confirmed"
  },
  {
    id: "3",
    type: "receive",
    amount: "1.0",
    hash: "def456...ghi789",
    timestamp: "2024-06-19 16:45",
    status: "confirmed"
  }
];

export default function Wallet() {
  const [balance] = useState("2.47");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");

  const publicAddress = "qbtc1q4v8n2k3m9x7c2w1e5r6t8y9u0i2o4p6a8s1d3f5g7h9j2k4l6m8n0p2q4r6t8";
  const privateKey = "L5oLkf4jnhHg3fDsR8yE...mK9nQ2pX4vC6bN1mJ8kL7iO5pU3rY6sA";

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              qBTC <span className="text-primary">Wallet</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Secure quantum-resistant wallet for managing your qBTC with post-quantum cryptography protection.
            </p>
          </motion.div>

          {/* Balance Card */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card text-center p-8">
              <div className="flex items-center justify-center mb-4">
                <WalletIcon className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Total Balance</h2>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">{balance} qBTC</div>
              <div className="text-muted-foreground">≈ $127,350 USD</div>
              <div className="flex gap-4 justify-center mt-6">
                <Button className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button variant="outline">
                  <ArrowDownLeft className="w-4 h-4 mr-2" />
                  Receive
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Wallet Interface */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="send">Send</TabsTrigger>
                <TabsTrigger value="receive">Receive</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'receive' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}>
                              {tx.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="font-semibold">
                                {tx.type === 'receive' ? '+' : '-'}{tx.amount} qBTC
                              </div>
                              <div className="text-sm text-muted-foreground">{tx.timestamp}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">
                              {tx.status}
                            </Badge>
                            <div className="text-sm text-muted-foreground flex items-center">
                              {tx.hash}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="send" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Send qBTC</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <Input 
                        id="recipient"
                        placeholder="qbtc1q..."
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount (qBTC)</Label>
                      <Input 
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Network Fee</span>
                        <span>0.0001 qBTC</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{sendAmount ? (parseFloat(sendAmount) + 0.0001).toFixed(4) : '0.0000'} qBTC</span>
                      </div>
                    </div>
                    <Button className="w-full orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white">
                      Send Transaction
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="receive" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Receive qBTC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6">
                      <div>
                        <Label>Your qBTC Address</Label>
                        <div className="mt-2 p-4 bg-muted/50 rounded-lg font-mono text-sm break-all">
                          {publicAddress}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Address
                        </Button>
                      </div>
                      <div className="w-48 h-48 bg-muted/50 rounded-lg mx-auto flex items-center justify-center">
                        <div className="text-muted-foreground">QR Code</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Share this address to receive qBTC payments. Each transaction generates a new address for privacy.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-primary" />
                        Quantum Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>ML-DSA-87 Signatures</span>
                          <Badge variant="outline" className="text-green-500 border-green-500">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Post-Quantum Encryption</span>
                          <Badge variant="outline" className="text-green-500 border-green-500">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Hardware Security</span>
                          <Badge variant="outline" className="text-orange-500 border-orange-500">Optional</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Private Key</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Private Key (Keep Secret)</Label>
                          <div className="mt-2 p-4 bg-muted/50 rounded-lg font-mono text-sm">
                            {showPrivateKey ? privateKey : "•".repeat(50)}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => setShowPrivateKey(!showPrivateKey)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {showPrivateKey ? 'Hide' : 'Show'}
                          </Button>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                          <p className="text-sm text-yellow-600 dark:text-yellow-400">
                            ⚠️ Never share your private key. Anyone with access can control your funds.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}