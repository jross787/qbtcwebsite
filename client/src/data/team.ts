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
    name: "Christian Papathanasiou",
    role: "Chief Scientist",
    bio: "Chief Architect behind qBTC with 20+ years cybersecurity experience for leading worldwide companies. Pioneer in Android security and founding member of the UK Digital Currency Association.",
    fullBio: "Christian Papathanasiou is the Chief Architect behind qBTC, the world's first quantum‑safe implementation of Bitcoin. With more than two decades of hands‑on cybersecurity experience, he began his career as a penetration tester for global financial institutions such as Citibank, Misys, and the Royal Bank of Scotland. Christian's research has been featured by outlets including Forbes, Reuters, and Dark Reading, and he has spoken at premier security conferences such as Black Hat and DEF CON. As a contributing author to the European Union Agency for Cybersecurity (ENISA) guidelines for secure mobile development, he was a pioneer in Android security during its formative years. A founding member of the UK Digital Currency Association and an early participant in the Bitcoin community, Christian wrote his first line of code at age 12 and has since served as Chief Security Officer for three leading technology companies. Today, he brings together deep expertise in offensive security, cryptography, and distributed systems to deliver qBTC — a next‑generation, post‑quantum secure form of Bitcoin designed to withstand the era of quantum computing.",
    expertise: ["Offensive Security", "Cryptography", "Distributed Systems"],
    photo: "christian",
    social: {
      github: "https://github.com/0xfffffffa",
      linkedin: "https://www.linkedin.com/in/papathanasiou",
      twitter: "https://x.com/0xfffffffa"
    }
  },
  {
    name: "Scott Walker",
    role: "Co-Founder",
    bio: "An Investor and Serial Entrepreneur. In 2012 he fell in love with Bitcoin. With early Investments in ETH, BTC, and dozens of successful launches Walker is one of the most experienced and successful investors in the space.",
    fullBio: "Scott Walker is a seasoned investor and serial entrepreneur who has been at the forefront of the cryptocurrency revolution since 2012. His early recognition of Bitcoin's potential led him to become one of the first institutional investors in the space. With strategic investments in ETH, BTC, and dozens of successful blockchain projects, Scott has built one of the most impressive portfolios in the cryptocurrency industry. His deep understanding of market dynamics and investor psychology has been instrumental in securing funding and partnerships for qBTC. Scott's entrepreneurial journey spans multiple successful exits and his expertise in scaling businesses from startup to enterprise level brings invaluable strategic guidance to the qBTC project.",
    expertise: ["Investment Strategy", "Business Development", "Market Analysis"],
    photo: "scott",
    social: {
      linkedin: "https://www.linkedin.com/in/scott-walker-8128817/",
      twitter: "https://x.com/scottwalker99"
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
