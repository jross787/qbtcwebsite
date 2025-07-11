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
    name: "Joe Ross",
    role: "VP Product",
    bio: "Joe Ross is a technologist and strategic advisor at the forefront of Web3 innovation. Drawing on over a decade of hands-on experience in distributed systems, cryptography, and on-chain governance, he translates deep technical insight and rigorous game-theoretic thinking into practical guidance for founders.",
    fullBio: "Joe Ross is a technologist and strategic advisor at the forefront of Web3 innovation. Drawing on over a decade of hands-on experience in distributed systems, cryptography, and on-chain governance, he translates deep technical insight and rigorous game-theoretic thinking into practical guidance for founders. Joe has partnered with dozens of early-stage teams, shaping token-economic frameworks, product architectures, and go-to-market strategies that scale from idea to global impact. Whether refining an incentive mechanism, stress-testing a protocol's security model, or mentoring executives on disciplined operating rhythms, Joe is known for turning complex challenges into decisive advantages, empowering ventures to build with confidence and clarity.",
    expertise: ["Web3 Innovation", "Product Strategy", "Token Economics"],
    photo: "joe",
    social: {
      linkedin: "https://www.linkedin.com/in/jross87/",
      twitter: "https://x.com/jross7878"
    }
  },
  {
    name: "Rick Schlesinger",
    role: "VP Operations",
    bio: "Rick is a seasoned entrepreneur, founder, investor, and strategic advisor. He has established multiple web3 technology companies, invested in numerous startups, and advised over 30 web3 companies.",
    fullBio: "Rick is a seasoned entrepreneur, founder, investor, and strategic advisor. He has established multiple web3 technology companies, invested in numerous startups, advised over 30 web3 companies, and provided board-level strategic guidance to innovative companies in the technology and fintech sectors. Rick currently serves as Venture Partner with DNA where he spearheads transformative deal advisory for its portfolio of cutting-edge investments. With a sharp focus on AI innovation, tokenomic design, and validating/mining opportunities, Rick leads strategic initiatives that position DNA at the forefront of technological advancement and market disruption. Rick began his fulltime web3 journey by participating in the decentralized global launch of the EOS blockchain. Rick founded EOS New York in 2017, an independent validator node which would become the leading validator node on the delegated-proof-of-stake blockchain. Under Rick's leadership, EOS New York became recognized for its role in running critical technology infrastructure across North America, Europe, and Africa, as well as actively leading governance and crypto-economic initiatives across the network. Rick's team would go on to be leading validator nodes across 6 different blockchains. The business was acquired in 2020. In addition to successfully running validator nodes, Rick was the co-editor of the original Chintai whitepaper, early investor, and is an ongoing advisor. Chintai is a leader in the Real World Asset (RWA) tokenization space, offering blockchain-as-a-service solutions for regulated digital assets like real estate, funds, equities, and commodities. Chintai provides a fully compliant tokenization issuance and secondary marketplace experience bringing billions of RWA's onto the blockchain. Before Rick's entrepreneurial ventures, Rick advised Fortune 500 companies on multi-billion dollar M&A deals as a strategy consultant with global consulting firm Ernst & Young. Rick holds a Bachelor of Science in Economics and Finance from Drexel University.",
    expertise: ["Web3 Strategy", "Blockchain Infrastructure", "Investment Strategy"],
    photo: "rick",
    social: {
      linkedin: "https://www.linkedin.com/in/rschlesinger",
      twitter: "https://x.com/ricksles"
    }
  },
  {
    name: "Garrett Paymon",
    role: "VP Marketing",
    bio: "Garrett, aka GMONEY is the host of Rugpull Radio the largest Bitcoin podcast on Rumble is a Bitcoin Freedom Cyberpunk committed to the ideals of privacy, sovereignty, and economic freedom.",
    fullBio: "Garrett, aka GMONEY is the host of Rugpull Radio the largest Bitcoin podcast on Rumble is a Bitcoin Freedom Cyberpunk committed to the ideals of privacy, sovereignty, and economic freedom. A digital revolutionary advocating for the use of Bitcoin as CYBERPOWER to disrupt institutions, traditional financial systems and empower individuals.",
    expertise: ["Bitcoin Advocacy", "Podcast Hosting", "Digital Marketing"],
    photo: "garrett",
    social: {
      linkedin: "https://www.linkedin.com/in/garrettpaymon/",
      twitter: "https://x.com/GMONEYPEPE"
    }
  }
];

export interface AdvisoryBoardMember {
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

export const advisoryBoardMembers: AdvisoryBoardMember[] = [
  {
    name: "Jameson Lopp",
    role: "Technical Advisor",
    bio: "Jameson has been building multisig wallets since 2015. In addition to Casa he also founded Mensa's Bitcoin Special Interest Group, the Triangle Bitcoin & Business meetup, and several open source Bitcoin projects. He enjoys researching various aspects of the ecosystem and giving presentations about what he has learned the hard way while trying to write robust software that can withstand both adversaries and unsophisticated users.",
    fullBio: "Jameson has been building multisig wallets since 2015. In addition to Casa he also founded Mensa's Bitcoin Special Interest Group, the Triangle Bitcoin & Business meetup, and several open source Bitcoin projects. He enjoys researching various aspects of the ecosystem and giving presentations about what he has learned the hard way while trying to write robust software that can withstand both adversaries and unsophisticated users.",
    expertise: ["Multisig Wallets", "Bitcoin Development", "Cybersecurity"],
    photo: "jameson",
    social: {
      twitter: "https://x.com/lopp"
    }
  },
  {
    name: "Vasily Pozdyshev",
    role: "Advisor",
    bio: "Vasily is a central banker with a robust technological background rooted in the defense industry. He previously held the position of Deputy Governor at the Central Bank of Russia and is now a Senior Advisor at the Bank for International Settlements (BIS) in Basel, Switzerland. In his current role, he supports monetary authorities in strengthening Cyber Resilience Frameworks for Systemically Important Financial Market Infrastructures, including those related to Digital Money. His contributions to the QBTC are undertaken strictly on a pro-bono basis and during his personal time.",
    fullBio: "Vasily is a central banker with a robust technological background rooted in the defense industry. He previously held the position of Deputy Governor at the Central Bank of Russia and is now a Senior Advisor at the Bank for International Settlements (BIS) in Basel, Switzerland. In his current role, he supports monetary authorities in strengthening Cyber Resilience Frameworks for Systemically Important Financial Market Infrastructures, including those related to Digital Money. His contributions to the QBTC are undertaken strictly on a pro-bono basis and during his personal time.",
    expertise: ["Central Banking", "Cyber Resilience", "Digital Money"],
    photo: "vasily",
    social: {
      linkedin: "https://www.linkedin.com/in/vasily-pozdyshev-130496246/"
    }
  },
  {
    name: "Ronit Ghose",
    role: "Advisor",
    bio: "Ronit runs the Future of Finance team at Citibank and prior to this, he was Citi's Global Head of Banks Research and Co-Head of Fintech Research. He is the lead author of Citi's cutting-edge GPS Fintech report series. He is also an Advisory Board member at the Centre for Financial Technology at Imperial College Business School and sits on the advisory board of various technology startups and venture capital firms in the UK, Middle East and Africa. He is based in Dubai, The UAE.",
    fullBio: "Ronit runs the Future of Finance team at Citibank and prior to this, he was Citi's Global Head of Banks Research and Co-Head of Fintech Research. He is the lead author of Citi's cutting-edge GPS Fintech report series. He is also an Advisory Board member at the Centre for Financial Technology at Imperial College Business School and sits on the advisory board of various technology startups and venture capital firms in the UK, Middle East and Africa. He is based in Dubai, The UAE.",
    expertise: ["Future of Finance", "Fintech Research", "Banking Technology"],
    photo: "ronit",
    social: {
      linkedin: "https://www.linkedin.com/in/ronit-ghose-86033610",
      twitter: "https://x.com/ronitA380"
    }
  },
  {
    name: "Dr. Axel York Poschmann",
    role: "Advisor",
    bio: "Dr. York is an accomplished technology and product leader with over 15 years of global experience driving growth, innovation, and transformation across cybersecurity, cryptography, and hardware security. Currently serving as VP of Product at PQShield, he spearheads the development of quantum-safe cryptographic solutions, skillfully merging strategic vision with practical execution to introduce cutting-edge technologies to the market.",
    fullBio: "Dr. York is an accomplished technology and product leader with over 15 years of global experience driving growth, innovation, and transformation across cybersecurity, cryptography, and hardware security. Currently serving as VP of Product at PQShield, he spearheads the development of quantum-safe cryptographic solutions, skillfully merging strategic vision with practical execution to introduce cutting-edge technologies to the market. Throughout his career, he has held leadership roles in both established corporations and dynamic startups, effectively managing diverse, cross-functional teams and cultivating strategic partnerships. Leveraging deep expertise in cryptographic engineering, he has consistently driven substantial business growth, successfully launched innovative products, and contributed to defining industry-wide security standards. He has demonstrated exceptional capability in scaling products, navigating intricate regulatory landscapes, and leading global teams across various international regions. Beyond industry leadership, he maintains strong academic ties, having served as an Assistant Professor and authoring numerous publications in cryptography. Additionally, he actively engages in mentoring startups, advising founders, and acting as an expert in residence at venture capital and private equity firms, aiding early-stage companies in scaling effectively and innovating within emerging technology sectors.",
    expertise: ["Quantum-Safe Cryptography", "Product Leadership", "Hardware Security"],
    photo: "axel",
    social: {
      linkedin: "https://www.linkedin.com/in/dr-axel-york-poschmann/"
    }
  },
  {
    name: "Ian Smith",
    role: "Advisor",
    bio: "Ian is the CTO of Quantum EVM - a project that aims to implement post quantum cryptography on the Ethereum network. He is a CEO/CTO Dev across 25+ languages, has been in tech since 1997 and Web3 since 2016.",
    fullBio: "Ian is the CTO of Quantum EVM - a project that aims to implement post quantum cryptography on the Ethereum network. He is a CEO/CTO Dev across 25+ languages, has been in tech since 1997 and Web3 since 2016.",
    expertise: ["Post-Quantum Cryptography", "Ethereum Development", "Web3 Technology"],
    photo: "ian",
    social: {
      linkedin: "https://www.linkedin.com/in/ian-smith-a83021314/",
      twitter: "https://x.com/IanSmith_HSA"
    }
  }
];
