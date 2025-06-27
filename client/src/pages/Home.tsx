import { motion } from "framer-motion";
import { Shield, Zap, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { QuantumCountdown } from "@/components/QuantumCountdown";
import { MigrationPath } from "@/components/MigrationPath";
import { CodeBlock } from "@/components/CodeBlock";


const benefits = [
  {
    icon: Shield,
    title: "Post-Quantum Signatures",
    description: "Each UTXO is protected by Dilithium 5, immune to Shor's algorithm and quantum attacks.",
    code: `<span class="text-primary">dilithium_p2wsh</span><br><span class="text-muted-foreground">// Quantum-resistant signatures</span>`,
  },
  {
    icon: Zap,
    title: "Aligned Mining Incentives",
    description: "Mining rewards are BTC-denominated, keeping hash power loyal to Bitcoin's ecosystem.",
    code: `<span class="text-primary">reward_btc</span><br><span class="text-muted-foreground">// Same economic model</span>`,
  },
  {
    icon: ArrowLeftRight,
    title: "Seamless Migration",
    description: "A trust-minimized bridge lets holders peg-in BTC now and redeem 1:1 later.",
    code: `<span class="text-primary">bridge_peg_in</span><br><span class="text-muted-foreground">// 1:1 BTC ratio</span>`,
  },
];

const advisors = [
  "Paradigm", "a16z crypto", "Polychain", "Jump Crypto", "Coinbase", "Binance Labs"
];

const mlDsaSignatureCode = `<span class="text-muted-foreground">// Post-quantum signature scheme</span>
<span class="text-primary">const</span> <span class="text-slate-300">signature</span> = <span class="text-foreground">dilithium.sign(</span>
  <span class="text-foreground">privateKey,</span>
  <span class="text-foreground">messageHash</span>
<span class="text-foreground">);</span>

<span class="text-muted-foreground">// Quantum-resistant verification</span>
<span class="text-primary">const</span> <span class="text-slate-300">isValid</span> = <span class="text-foreground">dilithium.verify(</span>
  <span class="text-foreground">publicKey,</span>
  <span class="text-foreground">signature,</span>
  <span class="text-foreground">messageHash</span>
<span class="text-foreground">);</span>`;

const bridgeSecurityCode = `<span class="text-muted-foreground">// 2-of-2 multisig with zk-attestation</span>
<span class="text-primary">struct</span> <span class="text-slate-300">BridgeProof</span> <span class="text-foreground">{</span>
  <span class="text-foreground">btc_txid: Hash256,</span>
  <span class="text-foreground">amount: Satoshis,</span>
  <span class="text-foreground">zk_proof: ZKProof,</span>
  <span class="text-foreground">multisig_sigs: [Signature; 2]</span>
<span class="text-foreground">}</span>

<span class="text-muted-foreground">// Trust-minimized peg-in</span>
<span class="text-primary">fn</span> <span class="text-slate-300">peg_in</span><span class="text-foreground">(proof: BridgeProof) {</span>
  <span class="text-foreground">verify_zk_proof(proof.zk_proof);</span>
  <span class="text-foreground">mint_qbtc(proof.amount);</span>
<span class="text-foreground">}</span>`;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 quantum-grid opacity-30"></div>
        <div className="absolute inset-0 quantum-mesh"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-10 px-4">
              <span className="text-gradient">Quantum-Safe Bitcoin,</span>
              <br />
              <span className="text-foreground">Ready Today.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              qBTC is a proof-of-work side-chain that inherits Bitcoin's economics while upgrading its cryptography to survive the first large-scale quantum computer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-14 md:mb-16 px-4">
              <Button asChild size="lg" className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg">
                <Link href="/whitepaper">Read the Whitepaper</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-muted-foreground text-muted-foreground hover:bg-muted-foreground hover:text-background px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg">
                <Link href="/docs">Join the Testnet</Link>
              </Button>
            </div>
            
            <QuantumCountdown />
          </motion.div>
        </div>
      </section>
      {/* Key Benefits Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">
              Built for the <span className="text-[#f79619]">Quantum Era</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Three core innovations that make qBTC the most secure Bitcoin side-chain for the post-quantum world.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card p-4 sm:p-6 md:p-8 rounded-2xl hover:shadow-lg hover:shadow-muted/10 transition-all duration-300 group h-full">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 orange-gradient rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:animate-glow">
                      <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 md:mb-4">{benefit.description}</p>
                    <div className="bg-card border border-muted/30 p-3 md:p-4 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: benefit.code }} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Migration Path */}
      <MigrationPath />
      {/* Technology Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4">
              Advanced <span className="text-primary">Cryptography</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">Built with NIST approved post-quantum algorithms and battle-tested consensus mechanisms.</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CodeBlock
                title="ML-DSA-87 Signatures"
                code={mlDsaSignatureCode}
              />
            </motion.div>
            
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CodeBlock
                title="Institutional Grade Security"
                code={bridgeSecurityCode}
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Advisors/VCs Section */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Backed by <span className="text-primary">Industry Leaders</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted advisors and investors in the quantum-safe future.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor}
                className="glass-card p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary font-bold text-lg">{advisor}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-accent/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join the Quantum-Safe Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Don't wait for Q-Day. Secure your Bitcoin with quantum-resistant technology today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white px-8 py-4 text-lg">
                <Link href="/docs">Start Building on qBTC</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-muted-foreground text-muted-foreground hover:bg-muted-foreground hover:text-background px-8 py-4 text-lg">
                <Link href="/contact">Get Developer Access</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
