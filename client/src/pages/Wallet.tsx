import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Wallet as WalletIcon, Send, ArrowDownLeft, Shield, Eye, Copy, ExternalLink, Plus, Link, Download, Upload, FileText, Key, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

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
  const [hasWallet, setHasWallet] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [connectPassword, setConnectPassword] = useState("");
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const publicAddress = "qbtc1q4v8n2k3m9x7c2w1e5r6t8y9u0i2o4p6a8s1d3f5g7h9j2k4l6m8n0p2q4r6t8";
  const privateKey = "L5oLkf4jnhHg3fDsR8yE...mK9nQ2pX4vC6bN1mJ8kL7iO5pU3rY6sA";

  const generateWalletFile = () => {
    if (!walletName || !walletPassword) return;
    
    setIsLoading(true);
    
    // Simulate wallet generation with quantum-safe cryptography
    setTimeout(() => {
      const walletContent = {
        version: "1.0",
        type: "qBTC_Wallet",
        name: walletName,
        created: new Date().toISOString(),
        encrypted: true,
        address: `bqs1${Math.random().toString(36).substring(2, 38)}`,
        publicKey: `04${Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
        encryptedPrivateKey: `AES256:${Array.from({length: 96}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
        algorithm: "CRYSTALS-Kyber1024", // Post-quantum encryption
        signature: "CRYSTALS-Dilithium3" // Post-quantum signature
      };

      const blob = new Blob([JSON.stringify(walletContent, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qbtc-wallet-${walletName}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsLoading(false);
      setIsCreateDialogOpen(false);
      setWalletName("");
      setWalletPassword("");
      
      toast({
        title: "Wallet Created",
        description: "Your quantum-safe wallet has been generated and downloaded.",
      });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          if (content.type === 'qBTC_Wallet') {
            setWalletData(content);
          } else {
            toast({
              title: "Invalid Wallet File",
              description: "This doesn't appear to be a valid qBTC wallet file.",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "File Error",
            description: "Unable to parse the wallet file. Please check the file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid JSON wallet file.",
        variant: "destructive",
      });
    }
  };

  const decryptWallet = () => {
    if (!walletData || !connectPassword) return;
    
    setIsLoading(true);
    
    // Simulate decryption process
    setTimeout(() => {
      // In a real implementation, this would decrypt the private key using the password
      setHasWallet(true);
      setIsConnectDialogOpen(false);
      setConnectPassword("");
      setSelectedFile(null);
      setWalletData(null);
      setIsLoading(false);
      
      toast({
        title: "Wallet Connected",
        description: "Your quantum-safe wallet has been successfully loaded.",
      });
    }, 1500);
  };

  // If no wallet is connected, show wallet setup options
  if (!hasWallet) {
    return (
      <div className="pt-16">
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

            {/* Wallet Setup Options */}
            <motion.div
              className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Connect Wallet */}
              <Card className="glass-card">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Connect Wallet</CardTitle>
                  <p className="text-muted-foreground">
                    Import an existing qBTC wallet from a JSON file
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white w-full">
                        Upload Wallet File
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Connect Wallet</DialogTitle>
                        <DialogDescription>
                          Select your qBTC wallet file and enter your password to decrypt it.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="wallet-file">Wallet File</Label>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="w-full p-3 border border-border rounded-lg bg-background"
                          />
                          {selectedFile && (
                            <Alert className="mt-2">
                              <FileText className="h-4 w-4" />
                              <AlertDescription>
                                Selected: {selectedFile.name}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                        
                        {walletData && (
                          <div>
                            <Label htmlFor="password">Wallet Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your wallet password"
                              value={connectPassword}
                              onChange={(e) => setConnectPassword(e.target.value)}
                            />
                          </div>
                        )}
                        
                        <Button 
                          onClick={decryptWallet}
                          disabled={!walletData || !connectPassword || isLoading}
                          className="w-full orange-gradient text-white"
                        >
                          {isLoading ? "Decrypting..." : "Connect Wallet"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Create Wallet */}
              <Card className="glass-card">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Create Wallet</CardTitle>
                  <p className="text-muted-foreground">
                    Generate a new quantum-safe wallet with post-quantum cryptography
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Generate New Wallet
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Wallet</DialogTitle>
                        <DialogDescription>
                          Generate a new quantum-safe wallet. The wallet file will be downloaded to your device.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="wallet-name">Wallet Name</Label>
                          <Input
                            id="wallet-name"
                            placeholder="Enter wallet name"
                            value={walletName}
                            onChange={(e) => setWalletName(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="wallet-password">Wallet Password</Label>
                          <Input
                            id="wallet-password"
                            type="password"
                            placeholder="Enter a strong password"
                            value={walletPassword}
                            onChange={(e) => setWalletPassword(e.target.value)}
                          />
                        </div>
                        
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Make sure to remember your password. It cannot be recovered if lost.
                          </AlertDescription>
                        </Alert>
                        
                        <Button 
                          onClick={generateWalletFile}
                          disabled={!walletName || !walletPassword || isLoading}
                          className="w-full orange-gradient text-white"
                        >
                          {isLoading ? "Generating..." : "Create Wallet"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Section */}
            <motion.div
              className="mt-16 grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Quantum-Safe</h3>
                  <p className="text-muted-foreground">
                    Protected by post-quantum cryptography algorithms like CRYSTALS-Kyber and Dilithium
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <Key className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Your Keys, Your Control</h3>
                  <p className="text-muted-foreground">
                    Private keys are encrypted and stored locally on your device
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Portable Wallet</h3>
                  <p className="text-muted-foreground">
                    Your wallet is stored in a JSON file that you can backup and restore
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // If wallet is connected, show the main wallet interface
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
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                              {tx.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
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
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="send-address">Recipient Address</Label>
                      <Input
                        id="send-address"
                        placeholder="qbtc1q..."
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="send-amount">Amount (qBTC)</Label>
                      <Input
                        id="send-amount"
                        placeholder="0.00"
                        type="number"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                      />
                      <div className="text-sm text-muted-foreground mt-1">
                        Available: {balance} qBTC
                      </div>
                    </div>
                    <Button className="w-full orange-gradient text-white">
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
                  <CardContent className="text-center space-y-4">
                    <div className="bg-white p-4 rounded-lg max-w-xs mx-auto">
                      {/* QR Code would go here */}
                      <div className="h-48 bg-muted rounded flex items-center justify-center">
                        QR Code
                      </div>
                    </div>
                    <div>
                      <Label>Your Address</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Input
                          value={publicAddress}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button variant="outline" size="icon">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Private Key</h3>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={showPrivateKey ? privateKey : "●".repeat(50)}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowPrivateKey(!showPrivateKey)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Quantum-Safe Protection</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <span>Post-Quantum Encryption</span>
                          <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <span>CRYSTALS-Kyber1024</span>
                          <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <span>CRYSTALS-Dilithium3</span>
                          <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}