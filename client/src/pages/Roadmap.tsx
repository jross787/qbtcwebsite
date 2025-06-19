import { motion } from "framer-motion";
import { CheckCircle, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const milestones = [
  {
    title: "MVP Live",
    description: "Testnet operational with core functionality",
    date: "Q2 2024",
    status: "completed",
    details: [
      "Core blockchain implementation",
      "Dilithium signature integration",
      "Basic bridge functionality",
      "RPC API endpoints",
      "Block explorer"
    ]
  },
  {
    title: "External Audit Complete",
    description: "Third-party security audit by Halborn / Trail of Bits",
    date: "Q3 2025",
    status: "in-progress",
    details: [
      "Comprehensive security review",
      "Smart contract auditing",
      "Bridge security analysis",
      "Cryptographic implementation review",
      "Penetration testing"
    ]
  },
  {
    title: "Testnet Public Stress Test",
    description: "Community-driven testing and optimization",
    date: "Q4 2025",
    status: "upcoming",
    details: [
      "Public testnet launch",
      "Load testing campaigns",
      "Community bug bounty",
      "Performance optimization",
      "Documentation updates"
    ]
  },
  {
    title: "Mainnet Launch + Safety Bounty",
    description: "Production release with comprehensive bug bounty program",
    date: "Q1 2026",
    status: "upcoming",
    details: [
      "Mainnet deployment",
      "Bridge activation",
      "Mining pool integration",
      "$1M safety bounty program",
      "Ecosystem partnerships"
    ]
  }
];

const phases = [
  {
    phase: "Research & Development",
    period: "2023-2024",
    description: "Core protocol development and testing",
    color: "bg-green-500"
  },
  {
    phase: "Security & Audit",
    period: "2024-2025",
    description: "Comprehensive security reviews and improvements",
    color: "bg-primary"
  },
  {
    phase: "Public Testing",
    period: "2025",
    description: "Community testing and optimization",
    color: "bg-blue-500"
  },
  {
    phase: "Production Launch",
    period: "2026",
    description: "Mainnet deployment and ecosystem growth",
    color: "bg-purple-500"
  }
];

export default function Roadmap() {
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
            <div className="w-24 h-24 orange-gradient rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Development <span className="text-primary">Roadmap</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent milestones on our path to quantum-safe Bitcoin. Track our progress and upcoming features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phase Overview */}
      <section className="py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Development Phases</h2>
            <p className="text-muted-foreground">
              Our roadmap is organized into four distinct phases, each building upon the previous one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card text-center h-full">
                  <CardHeader>
                    <div className={`w-4 h-4 ${phase.color} rounded-full mx-auto mb-4`} />
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <div className="text-primary font-semibold">{phase.period}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{phase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/30"></div>
            
            {/* Milestone items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Left side (odd indices) */}
                  {index % 2 === 0 ? (
                    <>
                      <div className="flex-1 text-right pr-8">
                        <Card className="glass-card p-6 inline-block max-w-md">
                          <div className="flex items-center justify-end mb-3">
                            <Badge 
                              variant={milestone.status === 'completed' ? 'default' : 
                                      milestone.status === 'in-progress' ? 'secondary' : 'outline'}
                              className="mr-2"
                            >
                              {milestone.status === 'completed' ? 'Completed' :
                               milestone.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                            </Badge>
                            <span className="text-primary font-semibold">{milestone.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground mb-4">{milestone.description}</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {milestone.details.map((detail, i) => (
                              <li key={i} className="flex items-center justify-end">
                                <span>• {detail}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                      <div className="relative z-10">
                        <div className={`w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in-progress' ? 'bg-primary animate-pulse-orange' : 'bg-muted-foreground'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <Clock className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 pl-8"></div>
                    </>
                  ) : (
                    /* Right side (even indices) */
                    <>
                      <div className="flex-1 pr-8"></div>
                      <div className="relative z-10">
                        <div className={`w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in-progress' ? 'bg-primary animate-pulse-orange' : 'bg-muted-foreground'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <Clock className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 pl-8">
                        <Card className="glass-card p-6 inline-block max-w-md">
                          <div className="flex items-center mb-3">
                            <span className="text-primary font-semibold mr-2">{milestone.date}</span>
                            <Badge 
                              variant={milestone.status === 'completed' ? 'default' : 
                                      milestone.status === 'in-progress' ? 'secondary' : 'outline'}
                            >
                              {milestone.status === 'completed' ? 'Completed' :
                               milestone.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground mb-4">{milestone.description}</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {milestone.details.map((detail, i) => (
                              <li key={i}>• {detail}</li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Beyond <span className="text-primary">2026</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our long-term vision extends beyond the initial launch, focusing on ecosystem growth and protocol evolution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Ecosystem Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• DeFi protocol integrations</li>
                    <li>• Institutional adoption</li>
                    <li>• Developer tooling expansion</li>
                    <li>• Cross-chain interoperability</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Protocol Evolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Advanced privacy features</li>
                    <li>• Scalability improvements</li>
                    <li>• New cryptographic primitives</li>
                    <li>• Smart contract capabilities</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Quantum Readiness</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Algorithm upgrades</li>
                    <li>• Quantum threat monitoring</li>
                    <li>• Research partnerships</li>
                    <li>• Future-proof architecture</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
