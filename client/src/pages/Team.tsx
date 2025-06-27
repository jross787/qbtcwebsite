import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/data/team";

export default function Team() {
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
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              World-class researchers, engineers, and cryptographers building the quantum-safe future of Bitcoin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 relative">
                      <div className="w-full h-full orange-gradient rounded-full flex items-center justify-center text-white text-3xl font-bold group-hover:animate-glow">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    
                    {member.expertise.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground mb-2">Expertise</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                          {member.expertise.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-center space-x-4">
                      {member.social.github && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                      {member.social.linkedin && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-5 h-5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-24 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our <span className="text-primary">Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion for quantum-safe cryptography and Bitcoin's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="orange-gradient text-white">
                View Open Positions
              </Button>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Advisory <span className="text-primary">Board</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Distinguished advisors providing strategic guidance and industry expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Sarah Chen", role: "Quantum Cryptography Expert", affiliation: "MIT" },
              { name: "Prof. Michael Roberts", role: "Blockchain Researcher", affiliation: "Stanford" },
              { name: "Alex Thompson", role: "Former Bitcoin Core Dev", affiliation: "Bitcoin Foundation" },
              { name: "Dr. Lisa Wang", role: "Post-Quantum Security", affiliation: "NIST" },
            ].map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card text-center">
                  <CardHeader>
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                      {advisor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{advisor.name}</h3>
                    <p className="text-primary font-semibold text-sm">{advisor.role}</p>
                    <p className="text-muted-foreground text-sm">{advisor.affiliation}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
