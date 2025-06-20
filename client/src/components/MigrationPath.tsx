import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function MigrationPath() {
  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            The Migration Path to <span className="text-primary">Quantum Safety</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A clear, secure pathway from today's Bitcoin to tomorrow's quantum-resistant future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="hidden md:block absolute top-16 left-2/3 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          {/* Step 1: Bitcoin Today */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <span className="text-white font-bold text-lg">BTC</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bitcoin Today</h3>
              <p className="text-muted-foreground text-sm">Current Bitcoin network</p>
            </div>
          </motion.div>

          {/* Step 2: Bridge */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <span className="text-white font-bold text-sm">qBTC</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bridge Now or Pre Commit</h3>
              <p className="text-muted-foreground text-sm">Quantum-safe transition</p>
            </div>
          </motion.div>

          {/* Step 3: Future */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <span className="text-white font-bold text-xs">BTC-PQ</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bitcoin L1 Upgraded</h3>
              <p className="text-muted-foreground text-sm">Quantum safety without any upgrades needed on Bitcoin L1</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
