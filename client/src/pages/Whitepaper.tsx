import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  { title: "Overview", anchor: "#overview" },
  { title: "Why qBTC?", anchor: "#why-qbtc" },
  { title: "Key Features & Architecture", anchor: "#features" },
  { title: "Peg-in/Peg-out Process", anchor: "#peg-process" },
  { title: "Merged Mining & Security", anchor: "#mining" },
  { title: "Development Roadmap", anchor: "#roadmap" },
  { title: "Open Source & Licensing", anchor: "#open-source" },
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
              A comprehensive technical specification for the quantum-secure Bitcoin sidechain that protects Bitcoin users against quantum attacks while preserving Bitcoin's core principles.
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
                  <div id="overview">
                    <h2 className="text-3xl font-bold text-primary mb-4">Overview</h2>
                    <p className="text-muted-foreground mb-6">
                      qBTC is a Bitcoin sidechain designed to protect Bitcoin users against quantum attacks while preserving Bitcoin's core principles of decentralization and security. It implements post-quantum cryptography for transactions, uses Bitcoin's Proof-of-Work via merged mining, and enables a two-way peg so that BTC can move between Bitcoin and qBTC. The project is open-sourced (MIT licensed) and implemented in Rust for high performance and security. The goal is to offer a quantum-resistant option for Bitcoin users before quantum computers become capable of threatening Bitcoin's current cryptographic scheme.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="why-qbtc">
                    <h2 className="text-3xl font-bold text-primary mb-4">Why qBTC?</h2>
                    <p className="text-muted-foreground mb-6">
                      Quantum computers pose a potential threat to Bitcoin's elliptic-curve signatures; a sufficiently advanced quantum attacker could derive private keys from public keys, breaking Bitcoin's security. qBTC addresses this risk proactively by integrating NIST-approved post-quantum signatures and new address types that hide public keys until they are used (mitigating quantum exposure).
                    </p>
                    <p className="text-muted-foreground mb-6">
                      By acting as an opt-in sidechain, qBTC lets users safeguard their BTC holdings against quantum risks without requiring disruptive changes to Bitcoin mainnet. Unlike speculative altcoins, qBTC maintains a 1:1 peg with Bitcoin, ensuring that quantum-safe storage doesn't require exposure to new tokens or economic models.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="features">
                    <h2 className="text-3xl font-bold text-primary mb-4">Key Features and Architecture</h2>
                    
                    <h3 className="text-2xl font-semibold mb-3">Post-Quantum Signatures (ML-DSA-87)</h3>
                    <p className="text-muted-foreground mb-4">
                      qBTC uses the Module-Lattice Digital Signature Algorithm at NIST Security Level 5 (commonly known as ML-DSA-87, based on CRYSTALS-Dilithium) for all transactions. This provides quantum-resistant authentication, replacing ECDSA/Schnorr. ML-DSA-87 was standardized in NIST FIPS 204 (2024) and offers the highest security level.
                    </p>
                    
                    <div className="bg-card border border-primary/30 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-primary mb-2">ML-DSA-87 Technical Specifications:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-mono text-sm">
                        <li>Signature Size: ~4.6 KB</li>
                        <li>Security Level: NIST Level 5 (highest available)</li>
                        <li>Algorithm: Module-Lattice based on CRYSTALS-Dilithium</li>
                        <li>Standard: NIST FIPS 204 (2024)</li>
                      </ul>
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">BIP-360 Quantum-Resistant Addresses (P2QRH)</h3>
                    <p className="text-muted-foreground mb-4">
                      qBTC adopts the proposed Pay-to-Quantum-Resistant-Hash (P2QRH) address and script format (per BIP-360) to support post-quantum keys. Similar to SegWit's design, funds are sent to a hash of a quantum-safe public key, and the full ML-DSA public key is revealed only at spending time. This ensures quantum-safe addresses: an attacker cannot obtain the public key (to attempt a quantum attack) until the moment of use, greatly reducing exposure time.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Merged Mining with Bitcoin (Auxiliary PoW)</h3>
                    <p className="text-muted-foreground mb-4">
                      qBTC's consensus is secured by Bitcoin's mining power through merged mining. qBTC blocks use the SHA-256 proof-of-work and can be mined alongside Bitcoin blocks without additional hardware or energy cost to miners. In practice, Bitcoin miners can include qBTC's block header hash in their Bitcoin coinbase transaction (auxiliary block commitment) to prove they found a valid qBTC block. This gives qBTC comparable security to Bitcoin itself.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Two-Way Peg (BTC ↔ qBTC)</h3>
                    <p className="text-muted-foreground mb-4">
                      qBTC implements a two-way peg so that Bitcoin can move into the sidechain (peg-in) and back out (peg-out) at a 1:1 ratio. When users peg-in, they send BTC to a special output on the Bitcoin mainnet. That BTC is then locked, and an equivalent amount of qBTC is issued on the sidechain to the user's qBTC address.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      For the initial launch, qBTC will use a federation-based peg: a trusted federation of functionaries (secured by multi-signature) observes BTC peg-ins on mainnet and issues qBTC accordingly. For peg-outs, users burn qBTC on the sidechain, and the federation releases the corresponding BTC back to mainnet.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Roadmap to Trustless Peg (ZKP-SPV)</h3>
                    <p className="text-muted-foreground mb-4">
                      Crucially, the federated peg is an interim solution. The long-term architecture of qBTC is to migrate to a trustless two-way peg using Simple Payment Verification (SPV) proofs verified via zero-knowledge proofs. In other words, the goal is that a smart contract or Bitcoin protocol upgrade will validate a proof that "qBTC coins were burned on the sidechain" to unlock BTC on the mainchain – without relying on any trusted third party.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Scalability and Throughput (20 MB Blocks)</h3>
                    <p className="text-muted-foreground mb-4">
                      qBTC targets a throughput and capacity comparable to Bitcoin's, even with the larger post-quantum signatures. To achieve this, qBTC uses a block size of 20 MB (with a ~10-minute block interval, similar to Bitcoin's timing). A 20 MB block filled with ML-DSA signatures and transactions yields roughly the same number of transactions per second as a 1 MB Bitcoin block filled with ECDSA signatures.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Rust Implementation & Performance</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC is implemented in Rust, chosen for its strong memory safety guarantees and performance. Rust's reliability helps prevent low-level vulnerabilities, which is critical in cryptocurrency software. The codebase is being built from scratch (not a fork of Bitcoin Core) to allow a clean integration of post-quantum cryptography and modern networking.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Pre-Commitment Mechanism (Commit-and-Reveal)</h3>
                    <p className="text-muted-foreground mb-6">
                      Many institutions, custodians, and other bitcoin holders may be unwilling or unable to move their BTC immediately, but may wish to have the option to do so should the Bitcoin network face an attack. With qBTC, a holder can secure their coins ahead of time by posting a PreCommit transaction to the sidechain that binds their current Bitcoin identity to a future quantum-safe key.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="peg-process">
                    <h2 className="text-3xl font-bold text-primary mb-4">Peg-in/Peg-out Process Details</h2>
                    
                    <h3 className="text-2xl font-semibold mb-3">Peg-In Process</h3>
                    <p className="text-muted-foreground mb-4">
                      To move BTC into qBTC, a user sends bitcoin to a designated peg address on the Bitcoin main chain. This address is a multi-signature script controlled by the qBTC federation (e.g., an M-of-N multisig of reputable functionaries). The user then submits the Bitcoin transaction proof (e.g. an SPV proof of the deposit) to the qBTC sidechain or a federation oracle. Once the deposit is confirmed on Bitcoin (with sufficient confirmations), the federation signs a transaction on qBTC that mints the equivalent qBTC amount to the user's quantum-safe address.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Peg-Out Process</h3>
                    <p className="text-muted-foreground mb-4">
                      To redeem BTC back from qBTC, the user initiates a peg-out by sending their qBTC to a special burn address (or using a dedicated "peg-out" transaction format) on the sidechain, specifying a Bitcoin withdrawal address. This triggers the federation – after a safety delay – to send the equivalent BTC from the multisig reserve to the user's Bitcoin address. In the sidechain, the qBTC tokens are burned/cancelled.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Federation Security</h3>
                    <p className="text-muted-foreground mb-6">
                      The federation will consist of a diverse set of functionaries (e.g., 15 out of 20 multisig) spread across different jurisdictions and organizations to minimize collusion risk. They will operate secure signing nodes with hardware isolation (HSMs) to protect keys. All peg transactions will be auditable on-chain and by external auditors.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="mining">
                    <h2 className="text-3xl font-bold text-primary mb-4">Merged Mining and Network Security</h2>
                    <p className="text-muted-foreground mb-4">
                      qBTC's use of merged mining means that Bitcoin miners can secure qBTC simultaneously as they mine Bitcoin. Here's how it works in practice:
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">AuxPoW Integration</h3>
                    <p className="text-muted-foreground mb-4">
                      qBTC uses the Auxiliary Proof-of-Work (AuxPoW) framework similar to Namecoin/RSK. Each qBTC block header includes an extra field for an AuxPoW structure that links it to a specific Bitcoin block's coinbase. To mine qBTC, a miner includes a hash of the qBTC block in their Bitcoin block's coinbase data (typically in an OP_RETURN).
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Incentives for Miners</h3>
                    <p className="text-muted-foreground mb-4">
                      By merge-mining, miners earn qBTC fees on top of their Bitcoin rewards, with virtually no extra work. All the heavy lifting (SHA-256 hashing) they do for Bitcoin counts for qBTC as well. The additional overhead is minimal: constructing a qBTC block template and adding a hash to coinbase.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Chain Difficulty & Independence</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC will dynamically adjust its mining difficulty so that blocks stay on a 10-minute target, despite not all Bitcoin miners participating initially. If only a subset of hashpower merge-mines, qBTC's difficulty will be set proportional to that subset's hashpower. This ensures reliable block times on qBTC.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="roadmap">
                    <h2 className="text-3xl font-bold text-primary mb-4">Development Roadmap and Milestones</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-card border border-primary/30 p-6 rounded-lg">
                        <h4 className="font-semibold text-primary mb-2">Phase 1 – Prototype and Proof-of-Concept (Q2 2025)</h4>
                        <p className="text-muted-foreground text-sm">
                          An early prototype (Devnet) was released in late May of 2025. Written in Python, this early implementation demonstrated the feasibility of a Bitcoin-like blockchain with ML-DSA signatures.
                        </p>
                      </div>

                      <div className="bg-card border border-primary/30 p-6 rounded-lg">
                        <h4 className="font-semibold text-primary mb-2">Phase 2 – MVP and Testnet (Q4 2025)</h4>
                        <p className="text-muted-foreground text-sm">
                          The initial implementation of qBTC will be deployed on a public testnet. This MVP will include the core features: ML-DSA-87 signature support, P2QRH address format, 20 MB blocks, merged mining support, block explorers, and a basic federated peg with a small federation (for testing).
                        </p>
                      </div>

                      <div className="bg-card border border-primary/30 p-6 rounded-lg">
                        <h4 className="font-semibold text-primary mb-2">Phase 3 – Mainnet Launch with Federated Peg (Q2 2026)</h4>
                        <p className="text-muted-foreground text-sm">
                          After thorough testing and audits, qBTC mainnet will launch. The federation for mainnet peg will consist of well-known, reputable institutions operating under a federation charter. The peg-in process will be enabled from day one, allowing users to start moving BTC into qBTC.
                        </p>
                      </div>

                      <div className="bg-card border border-primary/30 p-6 rounded-lg">
                        <h4 className="font-semibold text-primary mb-2">Phase 4 – Ecosystem Integration (2026-2027)</h4>
                        <p className="text-muted-foreground text-sm">
                          With mainnet live, the focus shifts to usage and ecosystem. We will work with wallet providers to add qBTC support and exchanges to support qBTC deposits/withdrawals, effectively treating qBTC as equivalent to BTC (but on a different chain).
                        </p>
                      </div>

                      <div className="bg-card border border-primary/30 p-6 rounded-lg">
                        <h4 className="font-semibold text-primary mb-2">Phase 5 – Trustless Peg Transition (tentative 2027+)</h4>
                        <p className="text-muted-foreground text-sm">
                          In parallel to the above, R&D efforts will continue on removing the federated peg. This phase will commence when a viable SPV proof mechanism is ready. If a Bitcoin soft fork has been adopted to support sidechain proofs, we will implement the necessary changes on qBTC.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div id="open-source">
                    <h2 className="text-3xl font-bold text-primary mb-4">Open Source and Licensing</h2>
                    <p className="text-muted-foreground mb-4">
                      qBTC is released under the MIT License, the same permissive open-source license used by Bitcoin Core. This choice of license ensures that qBTC's code can be freely reviewed, copied, modified, and integrated by anyone, fostering a broad developer and industry collaboration.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      All components of the project – from the core node software, the cryptographic libraries (where possible), to integration tools – are being developed or re-used under MIT-compatible licenses. By using MIT licensing, we align with Bitcoin's ethos of open development and allow any improvements in qBTC to potentially feed back into Bitcoin or other projects.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      From day one of open-sourcing (which occurred at the Bitcoin 2025 conference), the repository is publicly accessible for auditing. We invite the security and crypto community to audit the ML-DSA implementation, the peg contracts, and all consensus logic. An external security audit will also be conducted before mainnet launch.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="conclusion">
                    <h2 className="text-3xl font-bold text-primary mb-4">Conclusion</h2>
                    <p className="text-muted-foreground mb-4">
                      qBTC represents a bold but practical step towards securing Bitcoin's future. It marries the robustness of Bitcoin's design (Proof-of-Work, UTXO, decentralization) with cutting-edge post-quantum cryptography and a forward-looking sidechain architecture. By providing a quantum-safe haven for BTC users, qBTC mitigates a major long-term risk before it becomes an immediate threat.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      At the same time, qBTC is an innovation sandbox: it allows the Bitcoin community to gain experience with quantum-resistant tech and two-way peg mechanisms in a real economic setting, without altering Bitcoin L1. The insights gained from qBTC's deployment could directly inform how and when Bitcoin itself upgrades to quantum-resistant signatures in the future.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      qBTC's innovation lies in its synthesis: bringing together post-quantum security, sidechain mechanics, and Bitcoin's ethos. With a clear plan, strong technical foundations, and a commitment to open development, qBTC is on track to deliver an enterprise-ready, quantum-secure Bitcoin sidechain. We welcome the support and participation of all stakeholders in making Bitcoin quantum-proof, one block at a time.
                    </p>
                  </div>

                  <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                      This whitepaper provides a comprehensive overview of qBTC's technical architecture, roadmap, and implementation details for the quantum-secure Bitcoin sidechain.
                    </p>
                    <Button size="lg" className="orange-gradient text-white">
                      <Download className="w-5 h-5 mr-2" />
                      Download Complete Whitepaper PDF
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
