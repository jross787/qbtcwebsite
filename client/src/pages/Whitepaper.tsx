import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  { title: "Abstract", anchor: "#abstract" },
  { title: "Introduction", anchor: "#introduction" },
  { title: "Quantum Threat Analysis", anchor: "#threat-analysis" },
  { title: "Post-Quantum Cryptography", anchor: "#pq-crypto" },
  { title: "Consensus Mechanism", anchor: "#consensus" },
  { title: "Bridge Architecture", anchor: "#bridge" },
  { title: "Economic Model", anchor: "#economics" },
  { title: "Security Analysis", anchor: "#security" },
  { title: "Implementation", anchor: "#implementation" },
  { title: "Conclusion", anchor: "#conclusion" },
];

export default function Whitepaper() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 orange-gradient rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              qBTC <span className="text-primary">Whitepaper</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive technical specification for quantum-safe Bitcoin side-chain with post-quantum cryptography and trust-minimized bridging.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="orange-gradient text-white">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
              <Button size="lg" variant="outline">
                <ExternalLink className="w-5 h-5 mr-2" />
                View on ArXiv
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-card sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <a
                        key={section.title}
                        href={section.anchor}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        {index + 1}. {section.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardContent className="p-8 prose prose-invert max-w-none">
                  <div id="abstract">
                    <h2 className="text-3xl font-bold text-primary mb-4">Abstract</h2>
                    <p className="text-muted-foreground mb-6">
                      Bitcoin's security relies on the computational intractability of the discrete logarithm problem 
                      and the SHA-256 hash function. While SHA-256 remains quantum-resistant, Bitcoin's elliptic curve 
                      digital signature algorithm (ECDSA) is vulnerable to Shor's algorithm, which could be efficiently 
                      executed on a sufficiently large quantum computer.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      We present qBTC, a quantum-safe Bitcoin side-chain that implements post-quantum cryptographic 
                      signatures while maintaining full economic compatibility with Bitcoin. Our approach uses Dilithium 5, 
                      a NIST-standardized lattice-based signature scheme, integrated with a modified Taproot protocol 
                      for quantum-resistant script execution.
                    </p>
                    <p className="text-muted-foreground mb-8">
                      The side-chain features a trust-minimized bridge using zero-knowledge proofs and multi-signature 
                      contracts, enabling seamless migration of Bitcoin holdings to quantum-safe storage with 1:1 
                      redeemability. Mining incentives remain aligned with Bitcoin through BTC-denominated rewards, 
                      ensuring hash power loyalty during the transition period.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="introduction">
                    <h2 className="text-3xl font-bold text-primary mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground mb-6">
                      The advent of quantum computing poses a significant threat to current cryptographic systems. 
                      While the timeline for cryptographically relevant quantum computers remains uncertain, 
                      conservative estimates suggest that such systems could emerge within the next 10-15 years.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Bitcoin's current signature scheme, based on secp256k1 elliptic curve cryptography, would be 
                      vulnerable to quantum attacks using Shor's algorithm. A quantum computer capable of breaking 
                      these signatures could potentially steal funds from any Bitcoin address with a revealed public key.
                    </p>
                    <p className="text-muted-foreground mb-8">
                      qBTC addresses this vulnerability by implementing post-quantum cryptographic signatures while 
                      maintaining full compatibility with Bitcoin's economic model and consensus mechanism. This allows 
                      Bitcoin holders to secure their funds against quantum attacks without waiting for a potentially 
                      contentious upgrade to Bitcoin's base layer.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="threat-analysis">
                    <h2 className="text-3xl font-bold text-primary mb-4">2. Quantum Threat Analysis</h2>
                    <h3 className="text-2xl font-semibold mb-3">2.1 Current Quantum Computing Progress</h3>
                    <p className="text-muted-foreground mb-4">
                      Current quantum computers are limited by noise, decoherence, and a small number of qubits. 
                      However, significant progress has been made in quantum error correction and fault-tolerant 
                      quantum computation.
                    </p>
                    
                    <h3 className="text-2xl font-semibold mb-3">2.2 Cryptographically Relevant Quantum Computers</h3>
                    <p className="text-muted-foreground mb-4">
                      To break Bitcoin's secp256k1 signatures, a quantum computer would need approximately 2,330 
                      logical qubits running Shor's algorithm. With current quantum error correction ratios, this 
                      translates to millions of physical qubits.
                    </p>
                    
                    <div className="bg-card border border-primary/30 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-primary mb-2">Conservative Timeline Estimates:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>2030-2035: First cryptographically relevant quantum computers</li>
                        <li>2035-2040: Widespread quantum computing availability</li>
                        <li>2040+: Full quantum supremacy in cryptanalysis</li>
                      </ul>
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">2.3 Impact on Bitcoin</h3>
                    <p className="text-muted-foreground mb-8">
                      The impact of quantum computers on Bitcoin would be catastrophic if no preventive measures 
                      are taken. All funds in addresses with revealed public keys would be at risk, and the 
                      network's security model would fundamentally break down.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="pq-crypto">
                    <h2 className="text-3xl font-bold text-primary mb-4">3. Post-Quantum Cryptography</h2>
                    <h3 className="text-2xl font-semibold mb-3">3.1 Dilithium Signature Scheme</h3>
                    <p className="text-muted-foreground mb-4">
                      Dilithium is a lattice-based signature scheme standardized by NIST in 2022. It provides 
                      strong security guarantees against both classical and quantum attacks, with security levels 
                      equivalent to AES-128, AES-192, and AES-256.
                    </p>
                    
                    <div className="bg-card border border-primary/30 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-primary mb-2">Dilithium 5 Parameters:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-mono text-sm">
                        <li>Security Level: NIST Category 5 (256-bit post-quantum)</li>
                        <li>Public Key Size: 1,952 bytes</li>
                        <li>Private Key Size: 4,016 bytes</li>
                        <li>Signature Size: ~4,595 bytes (average)</li>
                        <li>Signing Time: ~0.7ms</li>
                        <li>Verification Time: ~0.2ms</li>
                      </ul>
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">3.2 Integration with Bitcoin Script</h3>
                    <p className="text-muted-foreground mb-8">
                      Dilithium signatures are integrated into Bitcoin's script system through a modified version 
                      of Taproot, called Taproot v2. This allows for complex smart contracts while maintaining 
                      quantum resistance.
                    </p>
                  </div>

                  <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                      This is a preview of the whitepaper content. The full document contains detailed technical 
                      specifications, security proofs, and implementation details.
                    </p>
                    <Button size="lg" className="orange-gradient text-white">
                      <Download className="w-5 h-5 mr-2" />
                      Download Complete Whitepaper
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
