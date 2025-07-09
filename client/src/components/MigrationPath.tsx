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
          {/* Connecting Lines - Animated */}
          <motion.div 
            className="hidden md:block absolute top-10 left-1/3 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>
          <motion.div 
            className="hidden md:block absolute top-10 left-2/3 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
          
          {/* Step 1: Bitcoin Today */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg"
                whileInView={{ 
                  boxShadow: ["0 0 0 0 rgba(249, 115, 22, 0.4)", "0 0 0 20px rgba(249, 115, 22, 0)", "0 0 0 0 rgba(249, 115, 22, 0)"]
                }}
                transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
                viewport={{ once: false }}
              >
                <span className="text-white font-bold text-lg">BTC</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Bitcoin Today
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Current Bitcoin network
              </motion.p>
            </div>
          </motion.div>

          {/* Step 2: Bridge */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 bg-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg"
                whileInView={{ 
                  boxShadow: ["0 0 0 0 rgba(148, 163, 184, 0.4)", "0 0 0 20px rgba(148, 163, 184, 0)", "0 0 0 0 rgba(148, 163, 184, 0)"]
                }}
                transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatDelay: 3 }}
                viewport={{ once: false }}
              >
                <span className="text-white font-bold text-sm">qBTC</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Bridge Now or Pre Commit
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Quantum-safe transition
              </motion.p>
            </div>
          </motion.div>

          {/* Step 3: Future */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg"
                whileInView={{ 
                  boxShadow: ["0 0 0 0 rgba(253, 186, 116, 0.4)", "0 0 0 20px rgba(253, 186, 116, 0)", "0 0 0 0 rgba(253, 186, 116, 0)"]
                }}
                transition={{ duration: 2, delay: 1.0, repeat: Infinity, repeatDelay: 3 }}
                viewport={{ once: false }}
              >
                <span className="text-white font-bold text-xs">BTC-PQ</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Bitcoin L1 Upgraded
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Quantum safety today and tomorrow
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
