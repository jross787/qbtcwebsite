import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  { title: "Overview", anchor: "#overview" },
  { title: "Key Features and Architecture", anchor: "#features" },
  { title: "Peg-in/Peg-out Process", anchor: "#peg-process" },
  { title: "Merged Mining and Security", anchor: "#mining" },
  { title: "Development Roadmap", anchor: "#roadmap" },
  { title: "Open Source and Licensing", anchor: "#licensing" },
  { title: "Conclusion", anchor: "#conclusion" },
];

export default function Whitepaper() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 orange-gradient rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
              qBTC: Quantum Secure <span className="text-primary">Bitcoin Sidechain</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
              A Bitcoin sidechain designed to protect Bitcoin users against quantum attacks while preserving Bitcoin's core principles of decentralization and security.
            </p>
            <div className="flex justify-center mb-6 sm:mb-8 px-4">
              <Button size="lg" className="orange-gradient text-white">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Table of Contents - Hidden on mobile, visible on larger screens */}
            <motion.div
              className="hidden lg:block lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-card sticky top-24">
                <CardHeader className="p-4">
                  <CardTitle className="text-base sm:text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <a
                        key={section.title}
                        href={section.anchor}
                        className="block text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1"
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
              className="col-span-1 lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardContent className="p-4 sm:p-6 md:p-8 prose prose-invert max-w-none">
                  <div id="overview">
                    <h2 className="text-3xl font-bold text-primary mb-4">Overview</h2>
                    <p className="text-muted-foreground mb-6">
                      qBTC is a Bitcoin sidechain designed to protect Bitcoin users against quantum attacks while preserving Bitcoin's core principles of decentralization and security. It implements post-quantum cryptography for transactions, uses Bitcoin's Proof-of-Work via merged mining, and enables a two-way peg so that BTC can move between Bitcoin and qBTC. The project is open-sourced (MIT licensed) and implemented in Rust for high performance and security. The goal is to offer a quantum-safe haven for Bitcoin holders before quantum computers become a threat.
                    </p>
                    <p className="text-muted-foreground mb-8">
                      <strong>Why qBTC?</strong> Quantum computers pose a potential threat to Bitcoin's elliptic-curve signatures; a sufficiently advanced quantum attacker could derive private keys from public keys, breaking Bitcoin's security. qBTC addresses this risk proactively by integrating NIST-approved post-quantum signatures and new address types that hide public keys until they are used (mitigating quantum exposure). By acting as a sidechain, qBTC preserves Bitcoin's base layer while offering an immediate migration path for users who want quantum protection today.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="features">
                    <h2 className="text-3xl font-bold text-primary mb-4">Key Features and Architecture</h2>
                    
                    <h3 className="text-2xl font-semibold mb-3">Post-Quantum Signatures (ML-DSA-87)</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC uses the Module-Lattice Digital Signature Algorithm at NIST Security Level 5 (commonly known as ML-DSA-87, based on CRYSTALS-Dilithium) for all transactions. This provides quantum-resistant authentication, replacing ECDSA/Schnorr. ML-DSA-87 was standardized in NIST FIPS 204 (2024) and offers the highest security level. Each signature is ~4.6 KB in size, so qBTC's block and networking design is optimized to handle this increased data requirement while maintaining performance comparable to Bitcoin.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">BIP-360 Quantum-Resistant Addresses (P2QRH)</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC adopts the proposed Pay-to-Quantum-Resistant-Hash (P2QRH) address and script format (per BIP-360) to support post-quantum keys. Similar to SegWit's design, funds are sent to a hash of a quantum-safe public key, and the full ML-DSA public key is revealed only at spending time. This ensures quantum-safe addresses: an attacker cannot obtain the public key (to attempt a quantum attack) until the moment of use, greatly reducing exposure. qBTC addresses will use a distinct prefix to differentiate them from Bitcoin addresses.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Merged Mining with Bitcoin (Auxiliary PoW)</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC's consensus is secured by Bitcoin's mining power through merged mining. qBTC blocks use the SHA-256 proof-of-work and can be mined alongside Bitcoin blocks without additional hardware or energy cost to miners. In practice, Bitcoin miners can include qBTC's block header hash in their Bitcoin coinbase transaction (auxiliary block commitment) to prove they found a valid qBTC block. This gives qBTC comparable security to Bitcoin, proportional to the fraction of Bitcoin miners that participate in merge-mining qBTC.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Two-Way Peg (BTC ↔ qBTC)</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC implements a two-way peg so that Bitcoin can move into the sidechain (peg-in) and back out (peg-out) at a 1:1 ratio. When users peg-in, they send BTC to a special output on the Bitcoin mainnet. That BTC is then locked, and an equivalent amount of qBTC is issued on the sidechain to the user's qBTC address. For the initial launch, qBTC will use a federation-based peg: a trusted federation of functionaries (secured by multi-signature) observes BTC peg-in transactions and issues qBTC accordingly. Peg-outs work in reverse: qBTC is burned on the sidechain, and the federation releases BTC back to the user.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Roadmap to Trustless Peg (ZKP-SPV)</h3>
                    <p className="text-muted-foreground mb-6">
                      Crucially, the federated peg is an interim solution. The long-term architecture of qBTC is to migrate to a trustless two-way peg using Simple Payment Verification (SPV) proofs verified via zero-knowledge proofs. In other words, the goal is that a smart contract or Bitcoin protocol upgrade will validate a proof that "qBTC coins were burned on the sidechain" to unlock BTC on the mainchain – without relying on any trusted third party. This approach is in line with the original vision of Bitcoin sidechains and would make qBTC fully trustless.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Scalability and Throughput (20 MB Blocks)</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC targets a throughput and capacity comparable to Bitcoin's, even with the larger post-quantum signatures. To achieve this, qBTC uses a block size of 20 MB (with a ~10-minute block interval, similar to Bitcoin's timing). A 20 MB block filled with ML-DSA signatures and transactions yields roughly the same number of transactions per second as a 1 MB Bitcoin block filled with ECDSA signatures. For example, an ML-DSA-87 signature (~4600 bytes) is about 65× larger than a typical Bitcoin signature (~71 bytes), but qBTC's 20× larger blocks can accommodate this while maintaining similar transaction throughput.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Rust Implementation & Performance</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC is implemented in Rust, chosen for its strong memory safety guarantees and performance. Rust's reliability helps prevent low-level vulnerabilities, which is critical in cryptocurrency software. The codebase is being built from scratch (not a fork of Bitcoin Core) to allow a clean integration of post-quantum cryptography and modern networking. We leverage well-vetted Rust libraries for Bitcoin primitives (transaction format, merkle trees, etc.) where possible, and incorporate battle-tested post-quantum cryptography implementations.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Bitcoin Parity and Compatibility</h3>
                    <p className="text-muted-foreground mb-6">
                      From a developer and user perspective, qBTC looks and feels like Bitcoin. It employs the UTXO transaction model and similar script language (augmented for PQ signatures). Block structure (header + Merkle tree of transactions) and block intervals align with Bitcoin, making integration with existing tools and workflows easier. Standard Bitcoin RPC methods (e.g. getblocktemplate, submitblock, etc.) are supported for mining, allowing miners to merge-mine qBTC with minimal changes to their infrastructure.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Pre-Commitment Mechanism (Commit-and-Reveal)</h3>
                    <p className="text-muted-foreground mb-8">
                      Many institutions, custodians, and other bitcoin holders may be unwilling or unable to move their BTC immediately, but may wish to have the option to do so should the Bitcoin network face an attack. With qBTC, a holder can secure their coins ahead of time by posting a PreCommit transaction to the sidechain that binds their current Bitcoin identity to a future quantum-safe key. The transaction carries a BIP-322–style message signed with the user's ECDSA private key; the message commits to a qBTC public key. If quantum computers later threaten Bitcoin, the user can "activate" this commitment by moving their BTC to the quantum-safe sidechain using the pre-committed keys, even if their original ECDSA keys are compromised.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="peg-process">
                    <h2 className="text-3xl font-bold text-primary mb-4">Peg-in/Peg-out Process Details</h2>
                    
                    <h3 className="text-2xl font-semibold mb-3">Peg-In</h3>
                    <p className="text-muted-foreground mb-6">
                      To move BTC into qBTC, a user sends bitcoin to a designated peg address on the Bitcoin main chain. This address is a multi-signature script controlled by the qBTC federation (e.g., an M-of-N multisig of reputable functionaries). The user then submits the Bitcoin transaction proof (e.g. an SPV proof of the deposit) to the qBTC sidechain or a federation oracle. Once the deposit is confirmed on Bitcoin (with sufficient confirmations), the federation signs a transaction on qBTC that mints the equivalent amount of qBTC and sends it to the user's specified qBTC address.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Peg-Out</h3>
                    <p className="text-muted-foreground mb-6">
                      To redeem BTC back from qBTC, the user initiates a peg-out by sending their qBTC to a special burn address (or using a dedicated "peg-out" transaction format) on the sidechain, specifying a Bitcoin withdrawal address. This triggers the federation – after a safety delay – to send the equivalent BTC from the multisig reserve to the user's Bitcoin address. In the sidechain, the qBTC tokens are burned/cancelled. Peg-outs via federation will likely require a processing time (e.g., 24-48 hours) to allow for dispute resolution and security checks.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Federation Security</h3>
                    <p className="text-muted-foreground mb-6">
                      The federation will consist of a diverse set of functionaries (e.g., 15 out of 20 multisig) spread across different jurisdictions and organizations to minimize collusion risk. They will operate secure signing nodes with hardware isolation (HSMs) to protect keys. All peg transactions will be auditable on-chain and by external auditors. In the unlikely event that federation members attempt malicious behavior, the community can fork qBTC to exclude bad actors or implement emergency procedures.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Trustless Peg Roadmap</h3>
                    <p className="text-muted-foreground mb-8">
                      Achieving a trustless peg is a top priority. The plan is to implement a Zero-Knowledge SPV Proof system: essentially, prove to Bitcoin that a peg-out request on qBTC is valid, in a succinct proof that Bitcoin miners or nodes can verify. One concept under exploration is an OP_SPVPROOFVERIFY opcode (as proposed in some discussions) that would allow a Bitcoin script to validate a zk-SNARK proving a sidechain block header and burn transaction. Alternatively, a soft fork could introduce covenant opcodes that enable more flexible sidechain integrations. Research continues on the most practical approach.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="mining">
                    <h2 className="text-3xl font-bold text-primary mb-4">Merged Mining and Network Security</h2>
                    
                    <h3 className="text-2xl font-semibold mb-3">AuxPoW Integration</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC uses the Auxiliary Proof-of-Work (AuxPoW) framework similar to Namecoin/RSK. Each qBTC block header includes an extra field for an AuxPoW structure that links it to a specific Bitcoin block's coinbase. To mine qBTC, a miner includes a hash of the qBTC block in their Bitcoin block's coinbase data (typically in an OP_RETURN). If the Bitcoin block meets Bitcoin's difficulty, it by definition meets the much lower qBTC difficulty (since qBTC will initially target a similar hashrate to other merge-mined chains). The miner can then submit the qBTC block along with a proof (the Bitcoin block + Merkle path) to claim the qBTC block reward.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Incentives for Miners</h3>
                    <p className="text-muted-foreground mb-6">
                      By merge-mining, miners earn qBTC fees on top of their Bitcoin rewards, with virtually no extra work. All the heavy lifting (SHA-256 hashing) they do for Bitcoin counts for qBTC as well. The additional overhead is minimal: constructing a qBTC block template and adding a hash to coinbase. In return, miners collect transaction fees from qBTC transactions (which are paid in qBTC, a Bitcoin-pegged asset). Even if qBTC's transaction volume is modest at first, any extra revenue is welcome to miners facing increasing operational costs.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Chain Difficulty & Independence</h3>
                    <p className="text-muted-foreground mb-6">
                      qBTC will dynamically adjust its mining difficulty so that blocks stay on a 10-minute target, despite not all Bitcoin miners participating initially. If only a subset of hashpower merge-mines, qBTC's difficulty will be set proportional to that subset's hashpower. This ensures reliable block times on qBTC. In effect, qBTC piggybacks on Bitcoin's hashpower but has its own difficulty adjustment algorithm (similar to Bitcoin's, e.g. adjusting every ~2016 blocks) to respond to changes in miner participation.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Reorg Security</h3>
                    <p className="text-muted-foreground mb-6">
                      One nuance of merge-mining is that qBTC blocks are found when Bitcoin blocks are found. This means if Bitcoin experiences a reorg of depth N, qBTC could also experience a reorg up to depth N (since the qBTC blocks tied to those orphaned Bitcoin blocks would be orphaned too). However, Bitcoin reorgs are typically shallow (1-2 blocks at most), so qBTC will inherit that stability. Additionally, the qBTC nodes will validate that the merged-mined proofs correspond to the longest Bitcoin chain to prevent attacks.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Double-Spend and 51% Attack</h3>
                    <p className="text-muted-foreground mb-8">
                      An attacker trying to 51% attack qBTC (e.g., to double-spend or censor on qBTC) would need to outmine the honest merged miners. Because qBTC is leveraging Bitcoin's hashing algorithm and (ideally) a significant portion of its miners, an attack is extremely difficult without simultaneously attacking Bitcoin. If an attacker had quantum computing capabilities to challenge qBTC's PoW, they would equally threaten Bitcoin's PoW – at which point proof-of-work itself would need upgrading, not just the signature schemes.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="roadmap">
                    <h2 className="text-3xl font-bold text-primary mb-4">Development Roadmap and Milestones</h2>
                    
                    <h3 className="text-2xl font-semibold mb-3">Phase 1 – Prototype and Proof-of-Concept (Q2 2025)</h3>
                    <p className="text-muted-foreground mb-6">
                      An early prototype (Devnet) was released in late May of 2025. Written in Python, this early implementation demonstrated the feasibility of a Bitcoin-like blockchain with ML-DSA signatures.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Phase 2 – MVP and Testnet (Q4 2025)</h3>
                    <p className="text-muted-foreground mb-6">
                      The initial implementation of qBTC will be deployed on a public testnet. This MVP will include the core features: ML-DSA-87 signature support, P2QRH address format, 20 MB blocks, merged mining support, block explorers, and a basic federated peg with a small federation (for testing). Goals of the testnet phase are to battle-test consensus (especially merged mining coordination and network stability with large blocks) and to integrate with wallets/mining pools in a low-risk environment.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Phase 3 – Mainnet Launch with Federated Peg (Q2 2026)</h3>
                    <p className="text-muted-foreground mb-6">
                      After thorough testing and audits, qBTC mainnet will launch. The federation for mainnet peg will consist of well-known, reputable institutions (to be announced prior to launch) operating under a federation charter. The peg-in process will be enabled from day one, allowing users to start moving BTC into qBTC. We expect an initial period of low volume as the system gains trust. Miner support will be actively fostered: we aim to have a significant percentage of Bitcoin's hashpower merge-mining qBTC by the end of 2026.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Phase 4 – Ecosystem Integration (2026-2027)</h3>
                    <p className="text-muted-foreground mb-6">
                      With mainnet live, the focus shifts to usage and ecosystem. We will work with wallet providers to add qBTC support (so users can easily send/receive on the sidechain). Exchanges and custodians will be approached to support qBTC deposits/withdrawals, effectively treating qBTC as equivalent to BTC (but on a different chain). This will greatly increase the utility and reach of qBTC. During this phase, any necessary interoperability tools will be developed – for example, a bridge service or wallet plugin that automates peg-ins/peg-outs for users.
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Phase 5 – Trustless Peg Transition (tentative 2027+)</h3>
                    <p className="text-muted-foreground mb-6">
                      In parallel to the above, R&D efforts will continue on removing the federated peg. This phase will commence when a viable SPV proof mechanism is ready. If a Bitcoin soft fork (or drivechain-like mechanism) has been adopted to support sidechain proofs, we will implement the necessary changes on qBTC and coordinate a peg-out migration. The federation would gradually hand off control: for example, a period during which peg-outs require both federation signatures and a ZK proof, and later only the ZK proof (once confidence is high).
                    </p>

                    <h3 className="text-2xl font-semibold mb-3">Beyond – Future Innovations</h3>
                    <p className="text-muted-foreground mb-8">
                      qBTC's immediate mandate is to secure Bitcoin's present model against quantum threats. In the long term, qBTC can serve as a platform for further innovation: new cryptographic protocols (e.g., post-quantum stateful signatures or zero-knowledge-based smart contracts) can be tested here without risking Bitcoin mainnet. qBTC could also explore performance upgrades (e.g., if larger blocks or faster block times prove safe, qBTC could increase those to further boost throughput).
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="licensing">
                    <h2 className="text-3xl font-bold text-primary mb-4">Open Source and Licensing</h2>
                    <p className="text-muted-foreground mb-6">
                      qBTC is released under the MIT License, the same permissive open-source license used by Bitcoin Core. This choice of license ensures that qBTC's code can be freely reviewed, copied, modified, and integrated by anyone, fostering a broad developer and industry collaboration. All components of the project – from the core node software, the cryptographic libraries (where possible), to integration tools – are being developed or re-used under MIT-compatible licenses.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      From day one of open-sourcing (which occurred at the Bitcoin 2025 conference), the repository is publicly accessible for auditing. We invite the security and crypto community to audit the ML-DSA implementation, the peg contracts, and all consensus logic. An external security audit will also be conducted before mainnet launch. The use of Rust, plus robust testing (unit, integration, property-based tests) and formal reviews, is meant to maintain high code quality.
                    </p>
                    <p className="text-muted-foreground mb-8">
                      <em>Note: "ML-DSA" refers to the Module-Lattice-based Digital Signature Algorithm standardized in NIST FIPS 204, which corresponds to the CRYSTALS-Dilithium family. "P2QRH" refers to Pay-to-Quantum-Resistant-Hash addresses as per Bitcoin Improvement Proposal 360. All trademarks and Bitcoin references are properties of their respective owners.</em>
                    </p>
                  </div>

                  <Separator className="my-8" />

                  <div id="conclusion">
                    <h2 className="text-3xl font-bold text-primary mb-4">Conclusion</h2>
                    <p className="text-muted-foreground mb-6">
                      qBTC represents a bold but practical step towards securing Bitcoin's future. It marries the robustness of Bitcoin's design (Proof-of-Work, UTXO, decentralization) with cutting-edge post-quantum cryptography and a forward-looking sidechain architecture. By providing a quantum-safe haven for BTC users, qBTC mitigates a major long-term risk before it becomes an immediate threat.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Additionally, qBTC offers a clear value proposition: it extends Bitcoin's longevity and utility in the face of technological change, potentially unlocking new use cases (e.g. quantum-safe custody for institutions) and ensuring Bitcoin remains the trustworthy store-of-value it is today. The project's roadmap is concrete – starting with a federated model that works now, and iterating toward a trustless, decentralized model as technology permits.
                    </p>
                    <p className="text-muted-foreground mb-8">
                      qBTC's innovation lies in its synthesis: bringing together post-quantum security, sidechain mechanics, and Bitcoin's ethos. With a clear plan, strong technical foundations, and a commitment to open development, qBTC is on track to deliver an enterprise-ready, quantum-secure Bitcoin sidechain. We welcome the support and participation of all stakeholders in making Bitcoin quantum-proof, one block at a time.
                    </p>
                  </div>

                  <div className="text-center mt-12">
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
