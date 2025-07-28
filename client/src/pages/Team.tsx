import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { teamMembers, advisoryBoardMembers, TeamMember, AdvisoryBoardMember } from "@/data/team";
import { useState } from "react";

// Team member photos
import christianPhoto from "@assets/Chris_1751815318542.jpg";
import scottPhoto from "@assets/Scott 2_1751815535629.png";
import joePhoto from "@assets/Joe2_1751816011753.png";
import rickPhoto from "@assets/Rick_1751824776863.jpg";
import garrettPhoto from "@assets/Garrett_1751826325298.png";

// Advisory board photos
import jamesonPhoto from "@assets/Jameson_1751829377731.png";
import pierreLucPhoto from "@assets/Pierre Luc_1753717855269.png";
import vasilyPhoto from "@assets/Vasily_1751829377732.png";
import ronitPhoto from "@assets/Ronit 2_1751829377731.png";
import axelPhoto from "@assets/Axel_1751829377730.png";
import ianPhoto from "@assets/Ian2_1751829377731.png";

// Union type for components
type Member = TeamMember | AdvisoryBoardMember;

// Photo mapping utility
const photoMap: Record<string, string> = {
  // Team members
  christian: christianPhoto,
  scott: scottPhoto,
  joe: joePhoto,
  rick: rickPhoto,
  garrett: garrettPhoto,
  // Advisory board
  jameson: jamesonPhoto,
  "pierre-luc": pierreLucPhoto,
  vasily: vasilyPhoto,
  ronit: ronitPhoto,
  axel: axelPhoto,
  ian: ianPhoto,
};

const getPhotoSrc = (photoKey: string): string => {
  return photoMap[photoKey] || photoKey;
};

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="glass-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group h-full flex flex-col">
        <CardHeader className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            {member.photo ? (
              <img
                src={getPhotoSrc(member.photo)}
                alt={member.name}
                className="w-full h-full rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full orange-gradient rounded-full flex items-center justify-center text-white text-3xl font-bold group-hover:animate-glow">
                {member.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
          <p className="text-primary font-semibold">{member.role}</p>
        </CardHeader>
        <CardContent className="text-center flex-1 flex flex-col">
          <div className="text-muted-foreground mb-4 flex-1">
            <p className={`${!isExpanded ? "line-clamp-3" : ""}`}>
              {isExpanded && member.fullBio ? member.fullBio : member.bio}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-4 text-primary hover:text-primary/80"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Read Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Read More
              </>
            )}
          </Button>

          <div className="flex justify-center space-x-4 mt-auto">
            {member.social.github && (
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            )}
            {member.social.linkedin && (
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            )}
            {member.social.twitter && (
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Team() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              World-class researchers, engineers, and cryptographers building
              the quantum-safe future of Bitcoin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <MemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Advisory <span className="text-primary">Board</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Distinguished advisors providing strategic guidance and industry
              expertise to shape the quantum-safe future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advisory Board Grid */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {advisoryBoardMembers.map((advisor, index) => (
              <MemberCard
                key={advisor.name}
                member={advisor}
                index={index}
              />
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
              We're always looking for talented individuals who share our
              passion for quantum-safe cryptography and Bitcoin's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="orange-gradient text-white">
                View Open Positions
              </Button>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 border-2 border-white">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
