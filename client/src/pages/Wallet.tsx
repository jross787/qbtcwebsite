import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Wallet as WalletIcon, Send, ArrowDownLeft, Shield, Eye, Copy, ExternalLink, Plus, Link, Download, Upload, FileText, Key, AlertCircle, CheckCircle, ArrowLeftRight, Coins, History, Receipt, Power, Globe } from "lucide-react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
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
  const [hasWallet, setHasWallet] = useState(() => {
    try {
      const stored = localStorage.getItem('qbtc_wallet_connected');
      return stored === 'true';
    } catch {
      return false;
    }
  });
  const [walletName, setWalletName] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [connectPassword, setConnectPassword] = useState("");
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendPassword, setSendPassword] = useState("");
  const [sendStep, setSendStep] = useState(1); // 1: details, 2: password, 3: confirmation
  const [bridgeType, setBridgeType] = useState<'btc-to-qbtc' | 'qbtc-to-btc'>('btc-to-qbtc');
  const [bridgeAmount, setBridgeAmount] = useState("");
  const [bridgeAddress, setBridgeAddress] = useState("");
  const [bridgeStatus, setBridgeStatus] = useState<'input' | 'waiting' | 'confirming' | 'exchanging' | 'sent'>('input');
  const [isTestnet, setIsTestnet] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setHasWallet(false);
    // Clear localStorage
    localStorage.removeItem('qbtc_wallet_connected');
    localStorage.removeItem('qbtc_wallet_address');
    localStorage.removeItem('qbtc_wallet_balance');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected.",
    });
  };

  const publicAddress = "qbtc1q4v8n2k3m9x7c2w1e5r6t8y9u0i2o4p6a8s1d3f5g7h9j2k4l6m8n0p2q4r6t8";
  const privateKey = "L5oLkf4jnhHg3fDsR8yE...mK9nQ2pX4vC6bN1mJ8kL7iO5pU3rY6sA";

  // Sample transaction data
  const recentTransactions = [
    {
      id: "tx_1",
      hash: "f4b3c2d1a0e9f8g7h6i5j4k3l2m1n0o9p8q7r6s5t4u3v2w1x0y9z8",
      type: "received",
      amount: 0.5,
      from: "qbtc1q9x8y7z6a5b4c3d2e1f0g9h8i7j6k5l4m3n2o1p0q9r8s7t6u5v4w3x2y1z0",
      to: publicAddress,
      timestamp: "2024-08-11T14:30:00Z",
      status: "confirmed",
      confirmations: 12,
      fee: 0.0001,
      blockHeight: 850123
    },
    {
      id: "tx_2", 
      hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
      type: "sent",
      amount: 0.25,
      from: publicAddress,
      to: "qbtc1q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3",
      timestamp: "2024-08-10T09:15:00Z",
      status: "confirmed",
      confirmations: 45,
      fee: 0.0002,
      blockHeight: 850089
    },
    {
      id: "tx_3",
      hash: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8",
      type: "received",
      amount: 1.0,
      from: "qbtc1q7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7",
      to: publicAddress,
      timestamp: "2024-08-09T16:45:00Z",
      status: "confirmed",
      confirmations: 78,
      fee: 0.0001,
      blockHeight: 850034
    }
  ];

  // Mock faucet requests data - will be replaced with API data later
  const mockFaucetRequests = [
    {
      amount: '0.1',
      timestamp: 'Today, 2:30 PM',
      status: 'completed' as const,
      txHash: 'qbtc_faucet_abc123def456'
    },
    {
      amount: '0.1',
      timestamp: 'Yesterday, 11:45 AM',
      status: 'completed' as const,
      txHash: 'qbtc_faucet_def456ghi789'
    },
    {
      amount: '0.1',
      timestamp: '2 days ago, 3:20 PM',
      status: 'pending' as const,
      txHash: 'qbtc_faucet_ghi789jkl012'
    },
    {
      amount: '0.1',
      timestamp: '3 days ago, 9:15 AM',
      status: 'completed' as const,
      txHash: 'qbtc_faucet_jkl012mno345'
    }
  ];

  const openTransactionModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  // Generate QR code when component mounts or address changes
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrDataUrl = await QRCode.toDataURL(publicAddress, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    if (hasWallet) {
      generateQRCode();
    }
  }, [hasWallet, publicAddress]);

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
    if (file) {
      // Accept any file and try to parse as JSON
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          // Accept any valid JSON file, not just qBTC_Wallet type
          setWalletData(content);
          toast({
            title: "File Loaded",
            description: `Successfully loaded ${file.name}`,
          });
        } catch (error) {
          toast({
            title: "Invalid JSON File",
            description: "Unable to parse the file. Please ensure it's a valid JSON format.",
            variant: "destructive",
          });
          setSelectedFile(null);
          setWalletData(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const decryptWallet = () => {
    if (!walletData) return;
    
    setIsLoading(true);
    
    // Simulate decryption process
    setTimeout(() => {
      // In a real implementation, this would decrypt the private key
      setHasWallet(true);
      // Persist wallet connection in localStorage
      localStorage.setItem('qbtc_wallet_connected', 'true');
      localStorage.setItem('qbtc_wallet_address', publicAddress);
      localStorage.setItem('qbtc_wallet_balance', balance);
      
      setIsConnectDialogOpen(false);
      setSelectedFile(null);
      setWalletData(null);
      setIsLoading(false);
      
      toast({
        title: "Wallet Connected",
        description: "Your quantum-safe wallet has been successfully loaded.",
      });
    }, 1500);
  };

  const handleSendTransaction = () => {
    if (!sendAddress || !sendAmount || !sendPassword) return;
    
    setIsLoading(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setSendStep(3); // Go to confirmation screen
      setIsLoading(false);
      
      toast({
        title: "Transaction Sent",
        description: `Successfully sent ${sendAmount} qBTC to ${sendAddress.slice(0, 8)}...${sendAddress.slice(-8)}`,
      });
    }, 2000);
  };

  const resetSendModal = () => {
    setSendAddress("");
    setSendAmount("");
    setSendPassword("");
    setSendStep(1);
    setIsSendModalOpen(false);
  };

  const handleBridgeTransaction = () => {
    setBridgeStatus('waiting');
    
    // Simulate bridge process
    const statuses = ['waiting', 'confirming', 'exchanging', 'sent'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < statuses.length) {
        setBridgeStatus(statuses[currentIndex] as any);
      } else {
        clearInterval(interval);
        toast({
          title: "Bridge Complete",
          description: bridgeType === 'btc-to-qbtc' 
            ? `Successfully received ${bridgeAmount} qBTC`
            : `Successfully sent ${bridgeAmount} BTC to your address`,
        });
      }
    }, 2000);
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
              <Card className="glass-card flex flex-col">
                <CardHeader className="text-center flex-1">
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
                      <Button className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white w-full h-12">
                        Connect Wallet
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Upload className="h-5 w-5 text-primary" />
                          Connect Wallet
                        </DialogTitle>
                        <DialogDescription>
                          Upload your wallet JSON file and enter your password to access your quantum-safe wallet.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* File Upload Section */}
                        <div className="space-y-3">
                          <Label htmlFor="wallet-file" className="text-sm font-medium">
                            Wallet File
                          </Label>
                          
                          {!selectedFile ? (
                            <div 
                              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Upload className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">Click to upload wallet file</p>
                                  <p className="text-sm text-muted-foreground">
                                    Supports JSON format
                                  </p>
                                </div>
                              </div>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".json,application/json,text/json"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </div>
                          ) : (
                            <div className="border border-border rounded-lg p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{selectedFile.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {(selectedFile.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedFile(null);
                                    setWalletData(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        

                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsConnectDialogOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={decryptWallet}
                            disabled={!walletData || isLoading}
                            className="flex-1 orange-gradient text-white"
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                                Connecting...
                              </div>
                            ) : (
                              "Connect Wallet"
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Create Wallet */}
              <Card className="glass-card flex flex-col">
                <CardHeader className="text-center flex-1">
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
                      <Button className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white w-full h-12">
                        Create Wallet
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Plus className="h-5 w-5 text-primary" />
                          Create New Wallet
                        </DialogTitle>
                        <DialogDescription>
                          Generate a new quantum-safe wallet protected by post-quantum cryptography. The encrypted wallet file will be downloaded to your device.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Wallet Details */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="wallet-name" className="text-sm font-medium">
                              Wallet Name
                            </Label>
                            <div className="relative mt-2">
                              <WalletIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="wallet-name"
                                placeholder="My qBTC Wallet"
                                value={walletName}
                                onChange={(e) => setWalletName(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="wallet-password" className="text-sm font-medium">
                              Encryption Password
                            </Label>
                            <div className="relative mt-2">
                              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="wallet-password"
                                type="password"
                                placeholder="Enter a strong password"
                                value={walletPassword}
                                onChange={(e) => setWalletPassword(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Security Features */}
                        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                          <h4 className="font-medium flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            Quantum-Safe Security
                          </h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              CRYSTALS-Kyber1024 encryption
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              CRYSTALS-Dilithium3 signatures
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              Client-side encryption
                            </div>
                          </div>
                        </div>
                        
                        {/* Warning */}
                        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-800 dark:text-amber-200">
                            <strong>Important:</strong> Store your password safely. It cannot be recovered if lost, and your wallet will be permanently inaccessible.
                          </AlertDescription>
                        </Alert>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsCreateDialogOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={generateWalletFile}
                            disabled={!walletName || !walletPassword || isLoading}
                            className="flex-1 orange-gradient text-white"
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                                Generating...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Create Wallet
                              </div>
                            )}
                          </Button>
                        </div>
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
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  qBTC <span className="text-primary">Wallet</span>
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{isTestnet ? 'Testnet' : 'Mainnet'}</span>
                  <Switch 
                    checked={!isTestnet}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        // Trying to switch to mainnet - show alert and don't change state
                        toast({
                          title: "Mainnet Coming Soon",
                          description: "Mainnet functionality is currently in development and will be available soon.",
                          variant: "destructive"
                        });
                        // Keep it on testnet
                        return;
                      } else {
                        // Allow switching back to testnet
                        setIsTestnet(true);
                      }
                    }}
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={disconnectWallet}
                  className="text-[#FF9500] border-[#FF9500] hover:bg-[#FF9500] hover:text-white p-2"
                  title="Disconnect Wallet"
                >
                  <Power className="w-5 h-5" />
                </Button>
              </div>
            </div>
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
                <TabsTrigger value="bridge">Bridge</TabsTrigger>
                <TabsTrigger value="faucet">Faucet</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentTransactions.length > 0 ? (
                      <div className="space-y-4">
                        {recentTransactions.map((tx) => (
                          <div 
                            key={tx.id} 
                            className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => openTransactionModal(tx)}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                tx.type === 'received' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                              }`}>
                                {tx.type === 'received' ? <ArrowDownLeft className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {tx.type === 'received' ? '+' : '-'}{tx.amount} qBTC
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(tx.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={tx.status === 'confirmed' ? 
                                'bg-green-500/20 text-green-500 border-green-500/30' : 
                                'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                              }>
                                {tx.status}
                              </Badge>
                              <div className="text-sm text-muted-foreground">
                                {formatHash(tx.hash)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                        <History className="w-16 h-16 text-muted-foreground/50" />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
                          <p className="text-muted-foreground max-w-md">
                            Your transaction history will appear here once you start sending or receiving qBTC.
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            onClick={() => setIsSendModalOpen(true)}
                            className="orange-gradient text-white"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send qBTC
                          </Button>
                          <Button variant="outline">
                            <ArrowDownLeft className="w-4 h-4 mr-2" />
                            Receive qBTC
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Transaction Detail Modal */}
                <Dialog open={isTransactionModalOpen} onOpenChange={setIsTransactionModalOpen}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <ExternalLink className="h-5 w-5" />
                        Transaction Details
                      </DialogTitle>
                    </DialogHeader>
                    
                    {selectedTransaction && (
                      <div className="space-y-6">
                        {/* Transaction Hash */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">
                            Transaction Hash
                          </Label>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                              {selectedTransaction.hash}
                            </code>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(selectedTransaction.hash);
                                toast({
                                  title: "Copied",
                                  description: "Transaction hash copied to clipboard.",
                                });
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Status and Confirmations */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Status
                            </Label>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                selectedTransaction.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                              }`} />
                              <span className="capitalize font-medium">{selectedTransaction.status}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Confirmations
                            </Label>
                            <p className="font-medium">{selectedTransaction.confirmations}</p>
                          </div>
                        </div>

                        {/* Amount and Fee */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Amount
                            </Label>
                            <p className={`text-xl font-bold ${
                              selectedTransaction.type === 'received' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {selectedTransaction.type === 'received' ? '+' : '-'}{selectedTransaction.amount} qBTC
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Network Fee
                            </Label>
                            <p className="font-medium">{selectedTransaction.fee} qBTC</p>
                          </div>
                        </div>

                        {/* Addresses */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              From Address
                            </Label>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                                {selectedTransaction.from}
                              </code>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedTransaction.from);
                                  toast({
                                    title: "Copied",
                                    description: "From address copied to clipboard.",
                                  });
                                }}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              To Address
                            </Label>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                                {selectedTransaction.to}
                              </code>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedTransaction.to);
                                  toast({
                                    title: "Copied",
                                    description: "To address copied to clipboard.",
                                  });
                                }}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Block and Timestamp */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Block Height
                            </Label>
                            <p className="font-medium">#{selectedTransaction.blockHeight}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                              Timestamp
                            </Label>
                            <p className="font-medium">
                              {new Date(selectedTransaction.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="send" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send qBTC
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Send qBTC to another quantum-safe wallet
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setIsSendModalOpen(true)}
                      className="w-full orange-gradient text-white h-12"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send qBTC
                    </Button>
                  </CardContent>
                </Card>

                {/* Send Transaction Modal */}
                <Dialog open={isSendModalOpen} onOpenChange={setIsSendModalOpen}>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {sendStep === 1 && "Send qBTC"}
                        {sendStep === 2 && "Confirm Transaction"}
                        {sendStep === 3 && "Transaction Sent"}
                      </DialogTitle>
                    </DialogHeader>
                    
                    {sendStep === 1 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="recipient" className="text-sm font-medium">
                            Recipient Address
                          </Label>
                          <Input
                            id="recipient"
                            placeholder="qbtc1q..."
                            value={sendAddress}
                            onChange={(e) => setSendAddress(e.target.value)}
                            className="font-mono mt-2"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="amount" className="text-sm font-medium">
                            Amount (qBTC)
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00000000"
                            step="0.00000001"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Available: {balance} qBTC
                          </p>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex justify-between text-sm">
                            <span>Network Fee:</span>
                            <span>0.0001 qBTC</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium mt-1">
                            <span>Total:</span>
                            <span>{sendAmount ? (parseFloat(sendAmount) + 0.0001).toFixed(8) : '0.00000000'} qBTC</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsSendModalOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => setSendStep(2)}
                            disabled={!sendAddress || !sendAmount}
                            className="flex-1 orange-gradient text-white"
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {sendStep === 2 && (
                      <div className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">To:</span>
                            <span className="font-mono text-sm">{sendAddress.slice(0, 8)}...{sendAddress.slice(-8)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-semibold">{sendAmount} qBTC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fee:</span>
                            <span>0.0001 qBTC</span>
                          </div>
                          <hr className="border-border" />
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>{(parseFloat(sendAmount) + 0.0001).toFixed(8)} qBTC</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="send-password" className="text-sm font-medium">
                            Wallet Password
                          </Label>
                          <div className="relative mt-2">
                            <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="send-password"
                              type="password"
                              placeholder="Enter your wallet password"
                              value={sendPassword}
                              onChange={(e) => setSendPassword(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <Alert>
                          <Shield className="h-4 w-4" />
                          <AlertDescription>
                            Your password is required to sign this transaction with your private key.
                          </AlertDescription>
                        </Alert>
                        
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setSendStep(1)}
                            className="flex-1"
                          >
                            Back
                          </Button>
                          <Button
                            onClick={handleSendTransaction}
                            disabled={!sendPassword || isLoading}
                            className="flex-1 orange-gradient text-white"
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                                Sending...
                              </div>
                            ) : (
                              "Send Transaction"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {sendStep === 3 && (
                      <div className="space-y-6 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Transaction Sent!</h3>
                          <p className="text-muted-foreground">
                            Your transaction has been broadcast to the qBTC network
                          </p>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-left">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-semibold">{sendAmount} qBTC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">To:</span>
                            <span className="font-mono text-sm">{sendAddress.slice(0, 8)}...{sendAddress.slice(-8)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="text-yellow-500">Pending</span>
                          </div>
                        </div>
                        
                        <Button
                          onClick={resetSendModal}
                          className="w-full orange-gradient text-white"
                        >
                          Close
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="receive" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowDownLeft className="h-5 w-5" />
                      Receive qBTC
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Share your address or QR code to receive qBTC payments
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-lg">
                        {qrCodeDataUrl ? (
                          <img 
                            src={qrCodeDataUrl} 
                            alt="qBTC Address QR Code"
                            className="w-64 h-64"
                          />
                        ) : (
                          <div className="w-64 h-64 bg-muted rounded flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary mx-auto mb-2"></div>
                              <p className="text-sm text-muted-foreground">Generating QR Code...</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* QR Code Instructions */}
                      <div className="text-center max-w-md">
                        <p className="text-sm text-muted-foreground">
                          Scan this QR code with any qBTC wallet to send payments to your address
                        </p>
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Your qBTC Address</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={publicAddress}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            navigator.clipboard.writeText(publicAddress);
                            toast({
                              title: "Address Copied",
                              description: "Your qBTC address has been copied to clipboard.",
                            });
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This is your public address. You can safely share it with others to receive payments.
                      </p>
                    </div>

                    {/* Additional Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          const shareData = {
                            title: 'qBTC Address',
                            text: `Send qBTC to: ${publicAddress}`,
                          };
                          if (navigator.share) {
                            navigator.share(shareData);
                          } else {
                            navigator.clipboard.writeText(publicAddress);
                            toast({
                              title: "Address Copied",
                              description: "Address copied to clipboard for sharing.",
                            });
                          }
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Share Address
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          if (qrCodeDataUrl) {
                            const link = document.createElement('a');
                            link.download = 'qbtc-address-qr.png';
                            link.href = qrCodeDataUrl;
                            link.click();
                          }
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Save QR Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bridge" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowLeftRight className="h-5 w-5" />
                      qBTC Bridge
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Convert between Bitcoin and qBTC using the quantum-safe bridge
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={bridgeType === 'btc-to-qbtc' ? 'default' : 'outline'}
                        onClick={() => setBridgeType('btc-to-qbtc')}
                        className={bridgeType === 'btc-to-qbtc' ? 'orange-gradient text-white' : ''}
                      >
                        BTC → qBTC
                      </Button>
                      <Button
                        variant={bridgeType === 'qbtc-to-btc' ? 'default' : 'outline'}
                        onClick={() => setBridgeType('qbtc-to-btc')}
                        className={bridgeType === 'qbtc-to-btc' ? 'orange-gradient text-white' : ''}
                      >
                        qBTC → BTC
                      </Button>
                    </div>
                    
                    {bridgeStatus === 'input' && (
                      <div className="space-y-4">
                        {bridgeType === 'btc-to-qbtc' ? (
                          <>
                            <div>
                              <Label className="text-sm font-medium">
                                Bitcoin Deposit Address
                              </Label>
                              <div className="mt-2 p-3 bg-muted rounded-lg">
                                <code className="text-sm font-mono">
                                  bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                </code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-2"
                                  onClick={() => {
                                    navigator.clipboard.writeText('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
                                    toast({
                                      title: "Copied",
                                      description: "Bitcoin address copied to clipboard.",
                                    });
                                  }}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Send Bitcoin to this address to receive qBTC
                              </p>
                            </div>
                            
                            <div>
                              <Label htmlFor="bridge-amount">Amount (BTC)</Label>
                              <Input
                                id="bridge-amount"
                                type="number"
                                placeholder="0.00000000"
                                step="0.00000001"
                                value={bridgeAmount}
                                onChange={(e) => setBridgeAmount(e.target.value)}
                              />
                            </div>
                            
                            <Button
                              onClick={handleBridgeTransaction}
                              disabled={!bridgeAmount}
                              className="w-full orange-gradient text-white"
                            >
                              Start Bridge Process
                            </Button>
                          </>
                        ) : (
                          <>
                            <div>
                              <Label htmlFor="btc-address">Bitcoin Receive Address</Label>
                              <Input
                                id="btc-address"
                                placeholder="bc1q..."
                                value={bridgeAddress}
                                onChange={(e) => setBridgeAddress(e.target.value)}
                                className="font-mono"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="bridge-amount">Amount (qBTC)</Label>
                              <Input
                                id="bridge-amount"
                                type="number"
                                placeholder="0.00000000"
                                step="0.00000001"
                                value={bridgeAmount}
                                onChange={(e) => setBridgeAmount(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Available: {balance} qBTC
                              </p>
                            </div>
                            
                            <Button
                              onClick={handleBridgeTransaction}
                              disabled={!bridgeAmount || !bridgeAddress}
                              className="w-full orange-gradient text-white"
                            >
                              Bridge to Bitcoin
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                    
                    {bridgeStatus !== 'input' && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <ArrowLeftRight className="w-8 h-8 text-primary animate-pulse" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Bridge in Progress</h3>
                          <p className="text-muted-foreground capitalize">
                            Status: {bridgeStatus.replace('-', ' ')}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          {['waiting', 'confirming', 'exchanging', 'sent'].map((status, index) => (
                            <div key={status} className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${
                                bridgeStatus === status || 
                                ['waiting', 'confirming', 'exchanging', 'sent'].indexOf(bridgeStatus) > index
                                  ? 'bg-primary' 
                                  : 'bg-muted'
                              }`} />
                              <span className="capitalize">{status.replace('-', ' ')}</span>
                            </div>
                          ))}
                        </div>
                        
                        {bridgeStatus === 'sent' && (
                          <Button
                            onClick={() => setBridgeStatus('input')}
                            className="w-full orange-gradient text-white"
                          >
                            Start New Bridge
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faucet" className="mt-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5" />
                      qBTC Faucet
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Get free test qBTC for development and testing purposes
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-6 border border-dashed border-border rounded-lg">
                      <Coins className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-lg font-semibold mb-2">Test Network Faucet</h3>
                      <p className="text-muted-foreground mb-4">
                        Receive 0.1 qBTC every 24 hours for testing
                      </p>
                      <Button className="orange-gradient text-white">
                        Request Test qBTC
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Recent Faucet Requests</h4>
                      <div className="space-y-2">
                        {/* Mock data - replace with actual faucet requests */}
                        {mockFaucetRequests.length > 0 ? (
                          <div className="space-y-2">
                            {mockFaucetRequests.map((request, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                <div>
                                  <p className="font-medium">{request.amount} qBTC</p>
                                  <p className="text-sm text-muted-foreground">{request.timestamp}</p>
                                </div>
                                <Badge variant="outline" className={
                                  request.status === 'completed' 
                                    ? 'bg-green-500/20 text-green-500 border-green-500/30'
                                    : request.status === 'pending'
                                    ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                                    : 'bg-red-500/20 text-red-500 border-red-500/30'
                                }>
                                  {request.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 space-y-3 text-center">
                            <Receipt className="w-12 h-12 text-muted-foreground/50" />
                            <div>
                              <h4 className="font-medium mb-1">No faucet requests yet</h4>
                              <p className="text-sm text-muted-foreground">
                                Your faucet request history will appear here after you request test qBTC.
                              </p>
                            </div>
                          </div>
                        )}
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