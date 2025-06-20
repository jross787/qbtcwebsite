import { motion } from "framer-motion";
import { useState } from "react";
import { Wallet as WalletIcon, Plus, Link, Download, Upload, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";

export default function WalletSetup() {
  const [, setLocation] = useLocation();
  const [walletName, setWalletName] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [importMethod, setImportMethod] = useState("seed");
  const [generatedSeed, setGeneratedSeed] = useState("");

  const generateNewWallet = () => {
    const mockSeed = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    setGeneratedSeed(mockSeed);
  };

  const connectWallet = () => {
    // Redirect to main wallet page after connection
    setLocation("/wallet");
  };

  const finishGeneration = () => {
    // Redirect to main wallet page after generation
    setLocation("/wallet");
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Setup Your qBTC <span className="text-primary">Wallet</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started with quantum-resistant Bitcoin. Create a new wallet or connect an existing one.
            </p>
          </motion.div>

          {/* Main Options */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Generate New Wallet */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 orange-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Generate New Wallet</CardTitle>
                  <p className="text-muted-foreground">
                    Create a brand new quantum-safe wallet with ML-DSA-87 signatures
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!generatedSeed ? (
                    <>
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
                          Your wallet will use post-quantum cryptography to protect against future quantum computer attacks.
                        </p>
                      </div>

                      <Button 
                        className="w-full orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white text-lg py-6"
                        onClick={generateNewWallet}
                        disabled={!walletName.trim()}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Generate Quantum-Safe Wallet
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label>Recovery Seed Phrase</Label>
                          <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                            <div className="grid grid-cols-3 gap-2 font-mono text-sm">
                              {generatedSeed.split(' ').map((word, index) => (
                                <div key={index} className="p-2 bg-background rounded border text-center">
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
                            Store this seed phrase securely. It's the only way to recover your wallet.
                          </p>
                        </div>
                      </div>

                      <Button 
                        className="w-full orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white text-lg py-6"
                        onClick={finishGeneration}
                      >
                        <WalletIcon className="w-5 h-5 mr-2" />
                        Access My Wallet
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Connect Existing Wallet */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="glass-card h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-slate-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Link className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Connect Existing Wallet</CardTitle>
                  <p className="text-muted-foreground">
                    Import your existing wallet or connect external devices
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Import Method</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={importMethod === "seed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setImportMethod("seed")}
                        className="text-xs"
                      >
                        Seed Phrase
                      </Button>
                      <Button 
                        variant={importMethod === "private" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setImportMethod("private")}
                        className="text-xs"
                      >
                        Private Key
                      </Button>
                      <Button 
                        variant={importMethod === "hardware" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setImportMethod("hardware")}
                        className="text-xs"
                      >
                        Hardware
                      </Button>
                    </div>
                  </div>

                  {importMethod === "seed" && (
                    <div>
                      <Label htmlFor="seed-import">12-word Recovery Phrase</Label>
                      <textarea 
                        id="seed-import"
                        className="w-full mt-2 p-3 border border-border rounded-md bg-background resize-none"
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

                  {importMethod === "hardware" && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Connect your quantum-safe hardware wallet
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                          Ledger Hardware Wallet
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                          Trezor Hardware Wallet
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                          qBTC Desktop Wallet
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white text-lg py-6"
                    onClick={connectWallet}
                    disabled={importMethod === "seed" && !seedPhrase.trim()}
                  >
                    <Link className="w-5 h-5 mr-2" />
                    Connect Wallet
                  </Button>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      Ensure your wallet supports post-quantum cryptography for full security.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Security Features */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="glass-card max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Quantum-Safe Security Features</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <WalletIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">ML-DSA-87 Signatures</h4>
                    <p className="text-sm text-muted-foreground">
                      NIST-approved post-quantum digital signatures
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Future-Proof Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      Resistant to quantum computer attacks
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Link className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Cross-Chain Bridge</h4>
                    <p className="text-sm text-muted-foreground">
                      Secure bridge to Bitcoin mainnet
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}