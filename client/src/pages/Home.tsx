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
    description: "Each UTXO is protected by ML-DSA-87, resistant to Shor's algorithm and quantum attacks.",
    code: `<span class="text-primary">ML-DSA_P2QRH</span><br><span class="text-muted-foreground">// Quantum-resistant signatures</span>`,
  },
  {
    icon: Zap,
    title: "Aligned Mining Incentives",
    description: "Mining rewards are qBTC-denominated, keeping hash power loyal to Bitcoin's ecosystem.",
    code: `<span class="text-primary">Reward_qBTC</span><br><span class="text-muted-foreground">// Same Economic Model</span>`,
  },
  {
    icon: ArrowLeftRight,
    title: "Seamless Migration",
    description: "A trust-minimized bridge lets holders peg-in BTC now and redeem 1:1 later.",
    code: `<span class="text-primary">Bridge_Peg_In</span><br><span class="text-muted-foreground">// 1:1 BTC Ratio</span>`,
  },
];

const advisors = [
  "Fund 1", "Fund 2", "Fund 3", "Fund 4", "Fund 5", "Fund 6"
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
    <div className="min-h-screen overflow-x-hidden">
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
            
            
            <h1 className="text-5xl md:text-7xl font-bold mb-10">
              <span className="text-gradient">Quantum-Safe Bitcoin,</span>
              <br />
              <span className="text-foreground">Ready Today.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 md:mb-20 max-w-4xl mx-auto leading-relaxed">
              qBTC is a proof-of-work side-chain that inherits Bitcoin's economics while upgrading its cryptography to survive the first large-scale quantum computer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 md:mb-24">
              <Button asChild size="lg" className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white px-10 py-5 text-lg">
                <Link href="/whitepaper">Read the Whitepaper</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-muted-foreground text-muted-foreground hover:bg-muted-foreground hover:text-background px-10 py-5 text-lg">
                <Link href="/docs">Join the Testnet</Link>
              </Button>
            </div>
            
            <div className="flex justify-center w-full mb-16 md:mb-24">
              <QuantumCountdown />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Key Benefits Section */}
      <section className="py-32 md:py-40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for the <span className="text-[#f79619]">Quantum Era</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three core innovations that make qBTC the most secure Bitcoin side-chain for the post-quantum world.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card p-8 rounded-2xl hover:shadow-lg hover:shadow-muted/10 transition-all duration-300 group h-full">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 orange-gradient rounded-xl flex items-center justify-center mb-6 group-hover:animate-glow">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{benefit.title}</h3>
                    <div className="h-16 mb-4">
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                    <div className="bg-card border border-muted/30 p-4 rounded-lg font-mono text-sm">
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
            <h2 className="text-4xl font-bold mb-6">
              Advanced <span className="text-primary">Cryptography</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Built with NIST approved post-quantum algorithms and battle-tested consensus mechanisms.</p>
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
