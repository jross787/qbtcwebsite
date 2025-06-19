export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Alice Quantum",
    role: "Founder & CEO",
    bio: "Former Bitcoin Core contributor with 10+ years in cryptography research. PhD in Post-Quantum Cryptography from MIT.",
    expertise: ["Post-Quantum Cryptography", "Bitcoin Protocol", "Consensus Algorithms"],
    social: {
      github: "https://github.com/alicequantum",
      linkedin: "https://linkedin.com/in/alicequantum",
      twitter: "https://twitter.com/alicequantum"
    }
  },
  {
    name: "Bob Dilithium",
    role: "CTO & Co-founder",
    bio: "Previously lead engineer at major cryptocurrency exchange. Expert in distributed systems and blockchain architecture.",
    expertise: ["Blockchain Architecture", "Distributed Systems", "Smart Contracts"],
    social: {
      github: "https://github.com/bobdilithium",
      linkedin: "https://linkedin.com/in/bobdilithium"
    }
  },
  {
    name: "Carol Shor",
    role: "Head of Research",
    bio: "Quantum computing researcher with expertise in Shor's algorithm and post-quantum signature schemes. Former NIST contributor.",
    expertise: ["Quantum Computing", "Cryptanalysis", "Algorithm Design"],
    social: {
      github: "https://github.com/carolshor",
      linkedin: "https://linkedin.com/in/carolshor",
      twitter: "https://twitter.com/carolshor"
    }
  },
  {
    name: "Dave Bridge",
    role: "Lead Engineer",
    bio: "Full-stack developer specializing in bridge protocols and cross-chain interoperability. Former DeFi protocol architect.",
    expertise: ["Bridge Protocols", "DeFi", "Cross-chain Security"],
    social: {
      github: "https://github.com/davebridge",
      linkedin: "https://linkedin.com/in/davebridge"
    }
  },
  {
    name: "Eve Quantum",
    role: "Security Engineer",
    bio: "Cybersecurity expert with focus on cryptocurrency security audits. Led security reviews for major blockchain projects.",
    expertise: ["Security Auditing", "Penetration Testing", "Cryptographic Security"],
    social: {
      github: "https://github.com/evequantum",
      linkedin: "https://linkedin.com/in/evequantum"
    }
  },
  {
    name: "Frank Hash",
    role: "DevOps Engineer",
    bio: "Infrastructure specialist with experience in blockchain node operations and distributed system deployment at scale.",
    expertise: ["DevOps", "Cloud Infrastructure", "Node Operations"],
    social: {
      github: "https://github.com/frankhash",
      linkedin: "https://linkedin.com/in/frankhash"
    }
  }
];
