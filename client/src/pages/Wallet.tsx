import { motion } from "framer-motion";
import { useState } from "react";
import { Wallet as WalletIcon, Send, ArrowDownLeft, Shield, Eye, Copy, ExternalLink, Plus, Link, Download, Upload } from "lucide-react";
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
  const [hasWallet, setHasWallet] = useState(true);
  const [walletName, setWalletName] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [importMethod, setImportMethod] = useState("seed");

  const publicAddress = "qbtc1q4v8n2k3m9x7c2w1e5r6t8y9u0i2o4p6a8s1d3f5g7h9j2k4l6m8n0p2q4r6t8";
  const privateKey = "L5oLkf4jnhHg3fDsR8yE...mK9nQ2pX4vC6bN1mJ8kL7iO5pU3rY6sA";

  const generateNewWallet = () => {
    // Simulate wallet generation
    setHasWallet(true);
    setSeedPhrase("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
  };

  const connectWallet = () => {
    // Simulate wallet connection
    setHasWallet(true);
  };

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
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="send">Send</TabsTrigger>
                <TabsTrigger value="receive">Receive</TabsTrigger>
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="connect">Connect</TabsTrigger>
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

              <TabsContent value="generate" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="w-5 h-5 mr-2 text-primary" />
                      Generate New Wallet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="wallet-name">Wallet Name</Label>
                      <Input 
                        id="wallet-name"
                        placeholder="My qBTC Wallet"
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Quantum-Safe Generation</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Your wallet will be generated using post-quantum cryptography (ML-DSA-87) to ensure security against quantum computer attacks.
                      </p>
                    </div>

                    {seedPhrase && (
                      <div className="space-y-4">
                        <div>
                          <Label>Recovery Seed Phrase</Label>
                          <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                            <div className="grid grid-cols-3 gap-2 font-mono text-sm">
                              {seedPhrase.split(' ').map((word, index) => (
                                <div key={index} className="p-2 bg-background rounded border">
                                  {index + 1}. {word}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Seed
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                          <p className="text-sm text-red-600 dark:text-red-400">
                            ⚠️ Store this seed phrase securely. It's the only way to recover your wallet if you lose access.
                          </p>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white"
                      onClick={generateNewWallet}
                      disabled={!walletName.trim()}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Generate Quantum-Safe Wallet
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connect" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Upload className="w-5 h-5 mr-2 text-primary" />
                        Import Existing Wallet
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label>Import Method</Label>
                        <div className="flex gap-2">
                          <Button 
                            variant={importMethod === "seed" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setImportMethod("seed")}
                          >
                            Seed Phrase
                          </Button>
                          <Button 
                            variant={importMethod === "private" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setImportMethod("private")}
                          >
                            Private Key
                          </Button>
                          <Button 
                            variant={importMethod === "file" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setImportMethod("file")}
                          >
                            Wallet File
                          </Button>
                        </div>
                      </div>

                      {importMethod === "seed" && (
                        <div>
                          <Label htmlFor="seed-import">12-word Recovery Phrase</Label>
                          <textarea 
                            id="seed-import"
                            className="w-full mt-2 p-3 border border-border rounded-md bg-background"
                            rows={3}
                            placeholder="Enter your 12-word seed phrase separated by spaces"
                            value={seedPhrase}
                            onChange={(e) => setSeedPhrase(e.target.value)}
                          />
                        </div>
                      )}

                      {importMethod === "private" && (
                        <div>
                          <Label htmlFor="private-import">Private Key</Label>
                          <Input 
                            id="private-import"
                            type="password"
                            placeholder="Enter your private key"
                            className="mt-2"
                          />
                        </div>
                      )}

                      {importMethod === "file" && (
                        <div>
                          <Label>Wallet File</Label>
                          <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Drag and drop your wallet file here, or click to browse
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Choose File
                            </Button>
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white"
                        onClick={connectWallet}
                      >
                        Import Wallet
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Link className="w-5 h-5 mr-2 text-primary" />
                        Connect External Wallet
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Connect your existing quantum-safe wallet or hardware device.
                      </p>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                          qBTC Desktop Wallet
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
                          Ledger Hardware Wallet
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
                          Trezor Hardware Wallet
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
                          MetaMask (qBTC Plugin)
                        </Button>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                          Ensure your external wallet supports post-quantum cryptography for full security.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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