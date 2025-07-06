export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  fullBio?: string;
  expertise: string[];
  photo?: string;
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
    fullBio: "Dr. Alice Quantum is a renowned cryptographer and the visionary behind qBTC. With over a decade of experience in cryptocurrency development, she has been instrumental in advancing post-quantum cryptography research. Her PhD dissertation on lattice-based cryptographic systems from MIT has been cited extensively in the field. Before founding qBTC, Alice was a core contributor to Bitcoin's development, focusing on security enhancements and protocol improvements. She has published numerous papers on quantum-resistant algorithms and regularly speaks at international conferences on blockchain security.",
    expertise: ["Post-Quantum Cryptography", "Bitcoin Protocol", "Consensus Algorithms"],
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
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
    fullBio: "Bob Dilithium brings over 8 years of experience in building scalable blockchain infrastructure. As former lead engineer at a top-tier cryptocurrency exchange, he architected systems processing millions of transactions daily. His expertise in distributed systems and consensus mechanisms has been crucial in designing qBTC's robust architecture. Bob holds a Master's degree in Computer Science from Stanford and has contributed to several open-source blockchain projects. He's passionate about creating secure, efficient protocols that can withstand both classical and quantum attacks.",
    expertise: ["Blockchain Architecture", "Distributed Systems", "Smart Contracts"],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    social: {
      github: "https://github.com/bobdilithium",
      linkedin: "https://linkedin.com/in/bobdilithium"
    }
  },
  {
    name: "Carol Shor",
    role: "Head of Research",
    bio: "Quantum computing researcher with expertise in Shor's algorithm and post-quantum signature schemes. Former NIST contributor.",
    fullBio: "Carol Shor is a leading researcher in quantum computing and post-quantum cryptography. With her deep understanding of Shor's algorithm and its implications for current cryptographic systems, she has been instrumental in developing qBTC's quantum-resistant protocols. As a former contributor to NIST's post-quantum cryptography standardization process, Carol brings invaluable expertise in evaluating and implementing quantum-safe algorithms. She holds a PhD in Mathematics from Princeton University and has published extensively on lattice-based cryptography and hash-based signatures.",
    expertise: ["Quantum Computing", "Cryptanalysis", "Algorithm Design"],
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
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
    fullBio: "Dave Bridge is a seasoned full-stack developer with specialized expertise in bridge protocols and cross-chain interoperability. His experience as a DeFi protocol architect has given him deep insights into the complexities of secure cross-chain operations. At qBTC, Dave leads the development of the Bitcoin-to-qBTC bridge infrastructure, ensuring seamless and secure asset transfers. He's particularly skilled in Solidity, Rust, and Go, and has contributed to several major DeFi protocols with a combined TVL of over $2 billion.",
    expertise: ["Bridge Protocols", "DeFi", "Cross-chain Security"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    social: {
      github: "https://github.com/davebridge",
      linkedin: "https://linkedin.com/in/davebridge"
    }
  },
  {
    name: "Eve Quantum",
    role: "Security Engineer",
    bio: "Cybersecurity expert with focus on cryptocurrency security audits. Led security reviews for major blockchain projects.",
    fullBio: "Eve Quantum is a cybersecurity expert specializing in cryptocurrency and blockchain security. With over 6 years of experience in security auditing, she has led security reviews for major blockchain projects with combined market caps exceeding $10 billion. Her expertise includes smart contract auditing, penetration testing, and cryptographic security analysis. Eve holds certifications in ethical hacking and has discovered critical vulnerabilities in several high-profile DeFi protocols. At qBTC, she ensures the highest security standards across all systems and protocols.",
    expertise: ["Security Auditing", "Penetration Testing", "Cryptographic Security"],
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    social: {
      github: "https://github.com/evequantum",
      linkedin: "https://linkedin.com/in/evequantum"
    }
  },
  {
    name: "Frank Hash",
    role: "DevOps Engineer",
    bio: "Infrastructure specialist with experience in blockchain node operations and distributed system deployment at scale.",
    fullBio: "Frank Hash is an infrastructure specialist with extensive experience in blockchain node operations and distributed system deployment at scale. He has managed infrastructure for networks processing over 100,000 transactions per second and has expertise in cloud platforms, containerization, and automated deployment pipelines. Frank's background includes roles at major cloud providers and blockchain infrastructure companies. At qBTC, he oversees the deployment and maintenance of the quantum-safe blockchain network, ensuring high availability and optimal performance.",
    expertise: ["DevOps", "Cloud Infrastructure", "Node Operations"],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    social: {
      github: "https://github.com/frankhash",
      linkedin: "https://linkedin.com/in/frankhash"
    }
  }
];
