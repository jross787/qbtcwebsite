import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function MigrationPath() {
  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            The Migration Path to <span className="text-primary">Quantum Safety</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A clear, secure pathway from today's Bitcoin to tomorrow's quantum-resistant future.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          {/* BTC */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-24 h-24 orange-gradient rounded-full flex items-center justify-center mb-4 mx-auto animate-glow">
              <span className="text-white font-bold text-lg">BTC</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bitcoin Today</h3>
            <p className="text-muted-foreground">Current Bitcoin network</p>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ArrowRight className="w-8 h-8 md:block hidden" />
            <ArrowRight className="w-8 h-8 md:hidden rotate-90" />
          </motion.div>

          {/* qBTC */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse-orange">
              <span className="text-white font-bold text-lg">qBTC</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">qBTC Bridge</h3>
            <p className="text-muted-foreground">Quantum-safe transition</p>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ArrowRight className="w-8 h-8 md:block hidden" />
            <ArrowRight className="w-8 h-8 md:hidden rotate-90" />
          </motion.div>

          {/* BTC-PQ */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-orange-400 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-sm">BTC-PQ</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bitcoin L1 Upgraded</h3>
            <p className="text-muted-foreground">Future quantum-safe Bitcoin</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
