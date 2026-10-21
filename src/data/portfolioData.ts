export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  category: string;
  date: string;
  verification?: string;
  link?: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  badge: string;
  description: string;
  tech: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const personalInfo = {
  name: "Md Shoyeb Rabbi",
  role: "Data Analyst & IT Systems Specialist",
  email: "hello@shoyebrabbi.com",
  phone: "+8801824422687",
  whatsappUrl: "https://wa.me/8801824422687",
  linkedinUrl: "https://linkedin.com",
  githubUrl: "https://github.com",
  facebookUrl: "https://facebook.com",
  bio: "Specializing in Data Analytics (SQL, Power BI, Python), Linux Systems, and Enterprise Networking (MikroTik, CCNA). Dedicated to delivering actionable intelligence and robust tech infrastructure.",
};

export const skillCategories = [
  {
    category: "Data Analytics & BI",
    skills: ["SQL / PostgreSQL", "Power BI & DAX", "Excel & Power Query", "Python (Data Analysis)"]
  },
  {
    category: "Systems & Networking",
    skills: ["Linux Server Administration", "Windows Server", "MikroTik RouterOS", "Cisco CCNA Principles"]
  },
  {
    category: "Digital Tools & Operations",
    skills: ["Blogger / CMS Setup", "Canva Visual Design", "Cybersecurity Basics", "Community Management"]
  }
];

export const experience = [
  {
    role: "Junior Data Analyst & IT Support",
    company: "Rich Information Technology",
    period: "March 2021 – May 2023",
    description: [
      "Extracted, cleaned, and analyzed transaction records using SQL queries and Microsoft Excel.",
      "Built dynamic reporting sheets and assisted in business process optimization.",
      "Managed local office network infrastructure, router configurations, and hardware troubleshooting."
    ]
  }
];

export const education = {
  degree: "Bachelor of Science in Computer Science & Information Technology (BSc CSIT)",
  institution: "Southern University Bangladesh",
  period: "Graduated 2020",
  highlights: [
    "Core focus: Database Management Systems (DBMS), Networking, Operating Systems, and System Analysis.",
    "Completed Capstone Degree Project focused on Information Technology."
  ]
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Customer Transaction & Revenue Analytics",
    badge: "Data Analytics",
    description: "End-to-end sales performance platform analyzing customer transactions to deliver insights on retention and monthly revenue growth.",
    tech: ["PostgreSQL", "Power BI", "Excel", "DAX"],
    image: "/projects/revenue-analytics.webp",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: "p2",
    title: "Enterprise MikroTik & BDIX Traffic Optimization",
    badge: "Networking",
    description: "High-performance network routing configuration optimizing local bandwidth, traffic shaping, and secure captive portal management.",
    tech: ["MikroTik RouterOS", "BDIX", "Firewall", "QoS"],
    image: "/projects/mikrotik-network.webp",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: "p3",
    title: "Automated Linux Web & Database Server",
    badge: "Systems",
    description: "Production-ready automated server infrastructure with scheduled database backups and system monitoring scripts.",
    tech: ["Ubuntu Server", "PostgreSQL", "Bash Scripting", "SSH Hardening"],
    image: "/projects/linux-server.webp",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: "p4",
    title: "Smart Corporate Meeting & Resource Management",
    badge: "Automation",
    description: "Automated meeting scheduling and resource allocation tool featuring dynamic calendar conflict detection and visual reporting.",
    tech: ["MS Excel", "VBA / Macros", "Dynamic Dashboards"],
    image: "/projects/resource-management.webp",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export const certificates: Certificate[] = [
  {
    id: "c1",
    title: "AI for App Deployment",
    issuer: "Google (Coursera)",
    badge: "Google Official",
    category: "AI & Cloud",
    date: "Aug 2025",
    verification: "ID : 28YMWK89516L",
    link: "https://coursera.org/verify/28YMWK89516L",
    image: "/certs/cert-google-ai.webp"
  },
  {
    id: "c2",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (Forage)",
    badge: "Big 4 Firm",
    category: "Data & Analytics",
    date: "July 2025",
    verification: "Code : m3kYqspuzmR6Y14h",
    link: "#",
    image: "/certs/cert-deloitte.webp"
  },
  {
    id: "c3",
    title: "Introduction to MS Excel",
    issuer: "Simplilearn (Powered by Microsoft)",
    badge: "Microsoft Certified",
    category: "Data & Analytics",
    date: "July 2025",
    verification: "Code : 8072539",
    link: "#",
    image: "/certs/cert-ms-excel.webp"
  },
  {
    id: "c4",
    title: "Power BI Complete E-Learning Course",
    issuer: "CoursePe / Learn More Pro",
    badge: "ISO 9001:2015",
    category: "Data & Analytics",
    date: "June 2025",
    verification: "Cert. ID: 100799",
    link: "#",
    image: "/certs/cert-powerbi.webp"
  },
  {
    id: "c5",
    title: "30 Days SQL Database Mastery",
    issuer: "CoursePe / Learn More Pro",
    badge: "ISO 9001:2015",
    category: "Data & Analytics",
    date: "June 2025",
    verification: "Cert. ID: 100799",
    link: "#",
    image: "/certs/cert-sql.webp"
  },
  {
    id: "c6",
    title: "Presenting Data (Charts & Spreadsheets)",
    issuer: "HP LIFE (HP Foundation)",
    badge: "HP Foundation",
    category: "Data & Analytics",
    date: "July 2025",
    verification: "Verified",
    link: "#",
    image: "/certs/cert-hp-data.webp"
  },
  {
    id: "c7",
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP LIFE (HP Foundation)",
    badge: "HP Foundation",
    category: "Systems & Security",
    date: "July 2025",
    verification: "Verified",
    link: "#",
    image: "/certs/cert-hp-cyber.webp"
  },
  {
    id: "c8",
    title: "IT for Business Success",
    issuer: "HP LIFE (HP Foundation)",
    badge: "HP Foundation",
    category: "Systems & Security",
    date: "July 2025",
    verification: "Verified",
    link: "#",
    image: "/certs/cert-hp-it.webp"
  },
  {
    id: "c9",
    title: "Inventory Management",
    issuer: "HP LIFE (HP Foundation)",
    badge: "HP Foundation",
    category: "Business & Strategy",
    date: "July 2025",
    verification: "Verified",
    link: "#",
    image: "/certs/cert-hp-inventory.webp"
  },
  {
    id: "c10",
    title: "Business Communications",
    issuer: "HP LIFE (HP Foundation)",
    badge: "HP Foundation",
    category: "Professional Skills",
    date: "July 2025",
    verification: "Verified",
    link: "#",
    image: "/certs/cert-hp-comm.webp"
  },
  {
    id: "c11",
    title: "Business Email",
    issuer: "HP LIFE (HP Foundation)",
    badge: "HP Foundation",
    category: "Professional Skills",
    date: "July 2025",
    verification: "Verified",
    link: "#",
    image: "/certs/cert-hp-email.webp"
  },
  {
    id: "c12",
    title: "Success Mindset & Strategic Planning",
    issuer: "HP LIFE (HP Foundation)",
    badge: "HP Foundation",
    category: "Professional Skills",
    date: "July 2025",
    verification: "Verified",
    link: "#",
    image: "/certs/cert-hp-strategy.webp"
  }
];
