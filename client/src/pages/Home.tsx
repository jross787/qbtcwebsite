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

const dilithiumCode = `<span class="text-muted-foreground">// Post-quantum signature scheme</span>
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

const bridgeCode = `<span class="text-muted-foreground">// 2-of-2 multisig with zk-attestation</span>
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero content */}
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Quantum-Safe Bitcoin,</span>
                <br />
                <span className="text-foreground">Ready Today.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                qBTC is a proof-of-work side-chain that inherits Bitcoin's economics while upgrading its cryptography to survive the first large-scale quantum computer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg" className="orange-gradient hover:shadow-lg hover:shadow-primary/25 text-white px-8 py-4 text-lg">
                  <Link href="/whitepaper">Read the Whitepaper</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-muted-foreground text-muted-foreground hover:bg-muted-foreground hover:text-background px-8 py-4 text-lg">
                  <Link href="/docs">Join the Testnet</Link>
                </Button>
              </div>
              
              <QuantumCountdown />
            </motion.div>

            {/* Right side - Interactive fluid animation */}
            <motion.div 
              className="relative h-[600px] w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <iframe
                src="data:text/html;charset=utf-8,%3C!DOCTYPE%20html%3E%0A%3Chtml%20lang%3D%22en%22%3E%0A%3Chead%3E%0A%20%20%20%20%3Cmeta%20charset%3D%22UTF-8%22%3E%0A%20%20%20%20%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%22%3E%0A%20%20%20%20%3Ctitle%3EAI-Powered%20Fluid%20Image%20Pixelation%3C%2Ftitle%3E%0A%20%20%20%20%3Cscript%20src%3D%22https%3A%2F%2Fcdn.tailwindcss.com%22%3E%3C%2Fscript%3E%0A%20%20%20%20%3Clink%20href%3D%22https%3A%2F%2Ffonts.googleapis.com%2Fcss2%3Ffamily%3DInter%3Awght%40400%3B500%3B700%26display%3Dswap%22%20rel%3D%22stylesheet%22%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20%20%20body%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20'Inter'%2C%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20overflow%3A%20hidden%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20canvas%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20display%3A%20block%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20cursor%3A%20none%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20top%3A%2050%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20left%3A%2050%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20transform%3A%20translate(-50%25%2C%20-50%25)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20.ai-panel%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20backdrop-filter%3A%20blur(10px)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20-webkit-backdrop-filter%3A%20blur(10px)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20.loader%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20border%3A%204px%20solid%20rgba(255%2C%20255%2C%20255%2C%200.2)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20border-left-color%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20border-radius%3A%2050%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20width%3A%2024px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20height%3A%2024px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20animation%3A%20spin%201s%20linear%20infinite%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%40keyframes%20spin%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20to%20%7B%20transform%3A%20rotate(360deg)%3B%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%3C%2Fstyle%3E%0A%3C%2Fhead%3E%0A%3Cbody%20class%3D%22bg-gray-900%20text-white%20flex%20items-center%20justify-center%20min-h-screen%22%3E%0A%0A%20%20%20%20%3Ccanvas%20id%3D%22interactive-canvas%22%3E%3C%2Fcanvas%3E%0A%20%20%20%20%0A%20%20%20%20%3C!--%20The%20image%20to%20be%20used.%20It's%20hidden%20because%20we'll%20draw%20it%20on%20the%20canvas.%20--%3E%0A%20%20%20%20%3Cimg%20id%3D%22source-image%22%20src%3D%22https%3A%2F%2Fplacehold.co%2F800x600%2F2E2A3A%2FFFFFFF%3Ftext%3DA%2BNew%2BBeginning%22%20class%3D%22hidden%22%20alt%3D%22Placeholder%20image%22%20crossorigin%3D%22anonymous%22%3E%0A%0A%20%20%20%20%3Cscript%3E%0A%20%20%20%20%20%20%20%20document.addEventListener('DOMContentLoaded'%2C%20()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20canvas%20%3D%20document.getElementById('interactive-canvas')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20ctx%20%3D%20canvas.getContext('2d'%2C%20%7B%20willReadFrequently%3A%20true%20%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20image%20%3D%20document.getElementById('source-image')%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20PARTICLE_SIZE%20%3D%205%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20MOUSE_RADIUS%20%3D%2060%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20PUSH_STRENGTH%20%3D%200.8%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20RETURN_SPEED%20%3D%200.04%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20DAMPING%20%3D%200.95%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20particles%20%3D%20%5B%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20mouse%20%3D%20%7B%20x%3A%20-Infinity%2C%20y%3A%20-Infinity%20%7D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20animationFrameId%20%3D%20null%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20class%20Particle%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20constructor(x%2C%20y%2C%20color)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%20x%3B%20this.y%20%3D%20y%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.originX%20%3D%20x%3B%20this.originY%20%3D%20y%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.color%20%3D%20color%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.vx%20%3D%200%3B%20this.vy%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20draw()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillStyle%20%3D%20this.color%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillRect(this.x%2C%20this.y%2C%20PARTICLE_SIZE%2C%20PARTICLE_SIZE)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20update()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20dx%20%3D%20this.x%20-%20mouse.x%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20dy%20%3D%20this.y%20-%20mouse.y%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20distance%20%3D%20Math.sqrt(dx%20*%20dx%20%2B%20dy%20*%20dy)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(distance%20%3C%20MOUSE_RADIUS)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20force%20%3D%20(MOUSE_RADIUS%20-%20distance)%20%2F%20MOUSE_RADIUS%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20angle%20%3D%20Math.atan2(dy%2C%20dx)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.vx%20%2B%3D%20force%20*%20Math.cos(angle)%20*%20PUSH_STRENGTH%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.vy%20%2B%3D%20force%20*%20Math.sin(angle)%20*%20PUSH_STRENGTH%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.vx%20%2B%3D%20(this.originX%20-%20this.x)%20*%20RETURN_SPEED%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.vy%20%2B%3D%20(this.originY%20-%20this.y)%20*%20RETURN_SPEED%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.vx%20*%3D%20DAMPING%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.vy%20*%3D%20DAMPING%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%2B%3D%20this.vx%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%2B%3D%20this.vy%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20function%20init()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(!image.complete%20%7C%7C%20image.naturalWidth%20%3D%3D%3D%200)%20return%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20aspectRatio%20%3D%20image.naturalWidth%20%2F%20image.naturalHeight%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20canvasWidth%20%3D%20Math.min(window.innerWidth%20*%200.9%2C%20image.naturalWidth%2C%201000)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20canvasHeight%20%3D%20canvasWidth%20%2F%20aspectRatio%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20canvas.width%20%3D%20canvasWidth%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20canvas.height%20%3D%20canvasHeight%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20particles%20%3D%20%5B%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.drawImage(image%2C%200%2C%200%2C%20canvas.width%2C%20canvas.height)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20imageData%20%3D%20ctx.getImageData(0%2C%200%2C%20canvas.width%2C%20canvas.height)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20for%20(let%20y%20%3D%200%3B%20y%20%3C%20canvas.height%3B%20y%20%2B%3D%20PARTICLE_SIZE)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20for%20(let%20x%20%3D%200%3B%20x%20%3C%20canvas.width%3B%20x%20%2B%3D%20PARTICLE_SIZE)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20index%20%3D%20(y%20*%20imageData.width%20%2B%20x)%20*%204%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(imageData.data%5Bindex%20%2B%203%5D%20%3E%20128)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20color%20%3D%20%60rgb(%24%7BimageData.data%5Bindex%5D%7D%2C%24%7BimageData.data%5Bindex%2B1%5D%7D%2C%24%7BimageData.data%5Bindex%2B2%5D%7D)%60%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20particles.push(new%20Particle(x%2C%20y%2C%20color))%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20catch(e)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.error(%22Error%20getting%20image%20data%3A%22%2C%20e)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20return%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if(!animationFrameId)%20animate()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20function%20animate()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.clearRect(0%2C%200%2C%20canvas.width%2C%20canvas.height)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20for%20(const%20particle%20of%20particles)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20particle.update()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20particle.draw()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20drawMouseFollower()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20animationFrameId%20%3D%20requestAnimationFrame(animate)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20function%20drawMouseFollower()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if(mouse.x%20%3C%200%20%7C%7C%20mouse.y%20%3C%200)%20return%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.beginPath()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.arc(mouse.x%2C%20mouse.y%2C%20MOUSE_RADIUS%20%2F%203%2C%200%2C%20Math.PI%20*%202)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.fillStyle%20%3D%20'rgba(255%2C%20153%2C%200%2C%200.2)'%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ctx.fill()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20canvas.addEventListener('mousemove'%2C%20(e)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20rect%20%3D%20canvas.getBoundingClientRect()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mouse.x%20%3D%20e.clientX%20-%20rect.left%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mouse.y%20%3D%20e.clientY%20-%20rect.top%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20canvas.addEventListener('mouseleave'%2C%20()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mouse.x%20%3D%20-Infinity%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mouse.y%20%3D%20-Infinity%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20image.onload%20%3D%20init%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(image.complete)%20init()%3B%0A%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%3C%2Fscript%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E"
                className="w-full h-full rounded-2xl shadow-2xl border border-muted/20"
                title="Interactive Fluid Animation"
                frameBorder="0"
              />
            </motion.div>
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for the <span className="text-muted-foreground">Quantum Era</span>
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
                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on proven post-quantum algorithms and battle-tested consensus mechanisms.
            </p>
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
                title="Dilithium Signatures"
                code={dilithiumCode}
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
                title="Bridge Security"
                code={bridgeCode}
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
