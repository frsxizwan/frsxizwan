import type { SkillGroup, SkillLevel } from "./types";

/**
 * About, skills and resume content.
 * SOURCE: the public GitHub profile README (github.com/frsxizwan) and the linked repositories.
 * Nothing here was inferred beyond those sources. Fields that the sources do not
 * state are null and render as "to be added" — fill them in, do not guess.
 */

export const about = {
  lead: "I build security tooling, small AI products and interactive prototypes — and I document how each one works, including where it stops.",
  paragraphs: [
    "My grounding is in cybersecurity: a bachelor's degree in the field, hands-on IT administration, and a current focus on SOC operations, threat detection and response.",
    "The projects here are prototypes and learning builds. Each case study lists its architecture, its stack and its limitations so you can judge the work on what it actually is.",
  ],
  principles: [
    {
      title: "Evidence over adjectives",
      body: "Every project links to its source. If a claim cannot be checked against the repository, it does not appear on this site.",
    },
    {
      title: "Small, legible systems",
      body: "One module, one responsibility. A parser parses, a detector detects, a scorer scores — so each part can be read and replaced.",
    },
    {
      title: "State the limits",
      body: "A simulation is labelled a simulation. Knowing what a tool does not do is part of knowing the tool.",
    },
  ],
};

export const skillLevels: Record<SkillLevel, { label: string; description: string; steps: 1 | 2 | 3 }> = {
  demonstrated: {
    label: "Demonstrated",
    description: "Used in a public repository linked from this site.",
    steps: 3,
  },
  practiced: {
    label: "Practiced",
    description: "Used in coursework, labs or work. Self-reported; no public artefact.",
    steps: 2,
  },
  learning: {
    label: "Learning",
    description: "Currently studying.",
    steps: 1,
  },
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Security",
    skills: [
      { name: "Log analysis & detection rules", level: "demonstrated", evidence: "SOC Sentinel" },
      { name: "Wireshark · Nmap", level: "practiced" },
      { name: "Burp Suite · Metasploit", level: "practiced" },
      { name: "Vulnerability assessment", level: "practiced" },
      { name: "SOC operations · incident response", level: "learning" },
    ],
  },
  {
    title: "Software",
    skills: [
      { name: "Python", level: "demonstrated", evidence: "SOC Sentinel" },
      { name: "TypeScript · React", level: "demonstrated", evidence: "All three case studies" },
      { name: "Tailwind CSS · Vite", level: "demonstrated", evidence: "All three case studies" },
      { name: "Node.js · Express", level: "demonstrated", evidence: "Villainous Agenda" },
      { name: "SQL · Java · C++ · PHP", level: "practiced" },
    ],
  },
  {
    title: "AI",
    skills: [
      { name: "LLM API integration (Gemini)", level: "demonstrated", evidence: "Villainous Agenda" },
      { name: "Structured (JSON) model output", level: "demonstrated", evidence: "Villainous Agenda" },
    ],
  },
  {
    title: "Systems & networks",
    skills: [
      { name: "Linux · Kali Linux", level: "practiced" },
      { name: "Windows Server", level: "practiced" },
      { name: "TCP/IP · routing & switching", level: "practiced" },
      { name: "Cloud technologies", level: "learning" },
    ],
  },
  {
    title: "Creative technology",
    skills: [
      { name: "Canvas game loops & interaction", level: "demonstrated", evidence: "Shadow Zero" },
      { name: "Unity · C#", level: "learning" },
    ],
  },
];

export const resume = {
  education: [
    {
      title: "Bachelor of Cybersecurity",
      institution: null as string | null, // PLACEHOLDER — add institution
      period: null as string | null, // PLACEHOLDER — add years
      detail: "CGPA 3.62",
    },
  ],
  experience: [
    {
      title: "IT Administrator",
      organisation: "Sophic Automation",
      period: null as string | null, // PLACEHOLDER — add dates
      points: [
        "Managed IT infrastructure and user support",
        "Troubleshot hardware and software issues",
        "System monitoring and maintenance",
      ],
    },
    {
      title: "Customer Success Specialist",
      organisation: "Teleperformance",
      period: null as string | null, // PLACEHOLDER — add dates
      points: ["Supported global clients and Meta platform users", "Resolved technical and operational issues"],
    },
  ],
  certifications: [
    "Google Cybersecurity Professional Certificate",
    "Foundation of Cybersecurity",
    "Connect and Protect: Networks and Network Security",
    "Sound the Alarm: Detection and Response",
    "Automate Cybersecurity Tasks with Python",
    "Cisco Networking Basics",
    "Cisco Cybersecurity Fundamentals",
  ],
  recognition: [
    "Best Computer Science Student",
    "Champion — Tunas Saintis Muda Competition",
    "Bronze Medal — International Research, Youth & Science Competition Exhibition (I-RYSCE)",
  ],
};
