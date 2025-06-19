import { motion } from "framer-motion";
import { Shield, Cpu, Link2, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/CodeBlock";

const technologies = [
  {
    icon: Shield,
    title: "Consensus Mechanism",
    subtitle: "Modified Nakamoto PoW",
    description: "Enhanced proof-of-work consensus with quantum-resistant mining algorithms and improved difficulty adjustment.",
  },
  {
    icon: Cpu,
    title: "Signature Scheme",
    subtitle: "Dilithium Post-Quantum",
    description: "NIST-standardized Dilithium 5 signatures providing 256-bit security against quantum attacks.",
  },
  {
    icon: Link2,
    title: "Bridge Security",
    subtitle: "2-of-2 MSC + zk-attest",
    description: "Trust-minimized bridge using multi-signature contracts with zero-knowledge attestations.",
  },
  {
    icon: Coins,
    title: "Economic Incentives",
    subtitle: "BTC-Denominated Rewards",
    description: "Mining rewards paid in BTC equivalents to maintain economic alignment with Bitcoin mainnet.",
  },
];

const taprootCode = `<span class="text-muted-foreground">// Enhanced Taproot with quantum resistance</span>
<span class="text-primary">script</span> <span class="text-orange-400">taproot_v2</span> {
  <span class="text-foreground">version: 2,</span>
  <span class="text-foreground">merkle_root: Hash256,</span>
  <span class="text-foreground">dilithium_pubkey: DilithiumPubKey,</span>
  <span class="text-foreground">fallback_script: Script</span>
}

<span class="text-muted-foreground">// Quantum-safe spending conditions</span>
<span class="text-primary">fn</span> <span class="text-orange-400">verify_spend</span><span class="text-foreground">(</span>
  <span class="text-foreground">sig: DilithiumSignature,</span>
  <span class="text-foreground">msg: Hash256</span>
<span class="text-foreground">) -> bool {</span>
  <span class="text-foreground">dilithium_verify(sig, msg, self.dilithium_pubkey)</span>
<span class="text-foreground">}</span>`;

const dilithiumCode = `<span class="text-muted-foreground">// Dilithium P2WSH implementation</span>
<span class="text-primary">struct</span> <span class="text-orange-400">DilithiumP2WSH</span> <span class="text-foreground">{</span>
  <span class="text-foreground">witness_version: u8,</span>  <span class="text-muted-foreground">// Version 1</span>
  <span class="text-foreground">witness_program: [u8; 32],</span> <span class="text-muted-foreground">// Script hash</span>
  <span class="text-foreground">pubkey: DilithiumPubKey,</span>   <span class="text-muted-foreground">// 1952 bytes</span>
  <span class="text-foreground">signature: DilithiumSig</span>      <span class="text-muted-foreground">// 4595 bytes</span>
<span class="text-foreground">}</span>

<span class="text-muted-foreground">// Witness stack structure</span>
<span class="text-primary">witness_stack</span> = [
  <span class="text-foreground">signature.to_bytes(),</span>
  <span class="text-foreground">pubkey.to_bytes(),</span>
  <span class="text-foreground">witness_script.to_bytes()</span>
]`;

export default function Technology() {
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
              Quantum-Safe <span className="text-primary">Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced cryptographic protocols and consensus mechanisms designed to withstand quantum attacks while maintaining Bitcoin's security model.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="glass-card h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 orange-gradient rounded-lg flex items-center justify-center mb-4">
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{tech.title}</CardTitle>
                    <div className="text-primary font-semibold">{tech.subtitle}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Technical <span className="text-primary">Implementation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep dive into the cryptographic primitives and protocol design that powers qBTC's quantum resistance.
            </p>
          </motion.div>

          <Tabs defaultValue="consensus" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="consensus">Consensus</TabsTrigger>
              <TabsTrigger value="signatures">Signatures</TabsTrigger>
              <TabsTrigger value="bridge">Bridge</TabsTrigger>
              <TabsTrigger value="economics">Economics</TabsTrigger>
            </TabsList>

            <TabsContent value="consensus" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-4">Modified Nakamoto Consensus</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      qBTC inherits Bitcoin's proven proof-of-work consensus mechanism with quantum-safe enhancements:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>SHA-256 mining remains unchanged for hash power compatibility</li>
                      <li>Enhanced difficulty adjustment for side-chain stability</li>
                      <li>Quantum-resistant block validation</li>
                      <li>Cross-chain merge mining support</li>
                    </ul>
                  </div>
                </Card>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Block Structure</h4>
                  <div className="bg-card border border-primary/30 p-6 rounded-lg font-mono text-sm">
                    <pre className="text-foreground">
{`Block Header:
- version: 0x20000000
- prev_block_hash: Hash256
- merkle_root: Hash256
- timestamp: u32
- bits: u32
- nonce: u32
- dilithium_sig: [u8; 4595]`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="signatures" className="mt-8">
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <CodeBlock
                      title="Taproot v2 Enhancement"
                      code={taprootCode}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <CodeBlock
                      title="Dilithium P2WSH"
                      code={dilithiumCode}
                    />
                  </motion.div>
                </div>

                <Card className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-4">Dilithium 5 Specifications</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Security Level</h4>
                      <p className="text-muted-foreground">256-bit post-quantum security</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Key Sizes</h4>
                      <p className="text-muted-foreground">Public: 1952 bytes<br />Private: 4016 bytes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Signature Size</h4>
                      <p className="text-muted-foreground">4595 bytes average</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="bridge" className="mt-8">
              <div className="space-y-8">
                <Card className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-4">Trust-Minimized Bridge Architecture</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      The qBTC bridge uses a hybrid approach combining multi-signature security with zero-knowledge proofs:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-primary">Peg-In Process</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>User locks BTC in 2-of-2 multisig</li>
                          <li>Generate ZK proof of lock transaction</li>
                          <li>Submit proof to qBTC validators</li>
                          <li>Mint equivalent qBTC tokens</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Peg-Out Process</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>Burn qBTC tokens on side-chain</li>
                          <li>Generate burn proof</li>
                          <li>Submit unlock request with proof</li>
                          <li>Release BTC from multisig</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="bg-card border border-primary/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-primary">Bridge Security Model</h4>
                  <div className="font-mono text-sm text-foreground">
                    <pre>
{`// Federation consensus with slashing
struct Federation {
    validators: Vec<ValidatorInfo>,
    threshold: u32,           // 2/3 + 1
    slashing_pool: Amount,    // Economic security
    challenge_period: u32     // 7 days
}

// Zero-knowledge proof verification
fn verify_bridge_proof(
    proof: BridgeProof,
    public_inputs: PublicInputs
) -> Result<(), BridgeError> {
    // Verify ZK-SNARK proof
    zk_verify(proof.snark, public_inputs)?;
    
    // Verify Bitcoin transaction inclusion
    verify_tx_inclusion(proof.btc_proof)?;
    
    Ok(())
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="economics" className="mt-8">
              <div className="space-y-8">
                <Card className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-4">Economic Alignment with Bitcoin</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-primary mb-3">Mining Incentives</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Block rewards denominated in BTC</li>
                        <li>• Transaction fees paid in qBTC</li>
                        <li>• Merge mining compatibility</li>
                        <li>• Difficulty adjustment every 2016 blocks</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-3">Fee Structure</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Base fee: 1 sat/vbyte</li>
                        <li>• Bridge fee: 0.1% of amount</li>
                        <li>• Priority fee market</li>
                        <li>• MEV protection mechanisms</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="glass-card p-6">
                    <h4 className="text-xl font-semibold mb-4 text-primary">Token Economics</h4>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Total Supply:</span>
                        <span className="text-foreground">21M qBTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Initial Supply:</span>
                        <span className="text-foreground">0 qBTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Issuance:</span>
                        <span className="text-foreground">Bridge Mint Only</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reserve Ratio:</span>
                        <span className="text-foreground">1:1 BTC</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-card p-6">
                    <h4 className="text-xl font-semibold mb-4 text-primary">Security Budget</h4>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Block Reward:</span>
                        <span className="text-foreground">6.25 BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Halving Schedule:</span>
                        <span className="text-foreground">Every 210k blocks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee Revenue:</span>
                        <span className="text-foreground">Variable</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hash Rate Target:</span>
                        <span className="text-foreground">1% of Bitcoin</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
