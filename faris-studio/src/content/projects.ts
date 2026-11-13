import type { Category, Project } from "./types";

/**
 * PROJECT CONFIGURATION
 * ---------------------
 * To add a project: append an object to `projects`. That is the whole job —
 * the card, the category listing, the detail page, the sitemap entry and the
 * tests all derive from this array.
 *
 * Rules this file follows (keep them):
 *  - Every claim is checkable against the linked repository.
 *  - No metrics, users, or outcomes that were not measured.
 *  - `limitations` is mandatory for case studies.
 */

export const categories: Category[] = [
  {
    id: "cybersecurity",
    index: "01",
    title: "Cybersecurity",
    summary: "Detection logic, log analysis and lab work aimed at SOC operations.",
  },
  {
    id: "ai-software",
    index: "02",
    title: "AI & Software Engineering",
    summary: "Products that put a language model behind a typed, server-side API.",
  },
  {
    id: "creative",
    index: "03",
    title: "Creative Technology",
    summary: "Real-time interaction and game feel.",
  },
];

const gh = "https://github.com/frsxizwan";

export const projects: Project[] = [
  {
    slug: "soc-sentinel",
    title: "SOC Sentinel",
    summary:
      "A rule-based security log analyzer that correlates authentication events, scores risk from 0–100 and writes incident reports.",
    category: "cybersecurity",
    status: "prototype",
    year: "2026",
    stack: ["Python 3 (stdlib only)", "TypeScript", "React", "Tailwind CSS", "Vite"],
    repo: `${gh}/soc-sentinel`,
    featured: true,
    cover: {
      src: "/projects/soc-sentinel-dashboard.webp",
      alt: "SOC Sentinel dashboard showing a risk gauge, alert counts and a list of correlated incidents",
      caption: "Triage dashboard: severity profile, top source IPs and incidents sorted by risk score.",
      width: 1697,
      height: 805,
    },
    caseStudy: {
      problem:
        "Raw authentication logs are noisy. An analyst needs related events grouped into incidents and ranked, so the first thing read is the thing most likely to matter.",
      approach: [
        "Normalise CSV logs: ISO 8601 timestamps, booleans, chronological ordering, and tolerant handling of malformed rows.",
        "Run six correlation rules over sliding windows: brute force, brute force followed by success, password spraying, impossible travel, privilege escalation and off-hours logons.",
        "Score each alert from a base severity plus context: attack outcome, admin target, external origin and repeat offenders.",
        "Emit a human-readable incident report and a JSON export, and mirror the same engine in a browser dashboard for exploration.",
      ],
      architecture: [
        { label: "Ingest", nodes: [{ name: "log_parser.py", detail: "CSV → normalised, time-sorted events" }] },
        { label: "Detect", nodes: [{ name: "threat_detector.py", detail: "Six sliding-window correlation rules" }] },
        { label: "Score", nodes: [{ name: "risk_engine.py", detail: "Base severity + contextual modifiers → 0–100" }] },
        {
          label: "Report",
          nodes: [
            { name: "report_generator.py", detail: "Text incident report + JSON export" },
            { name: "React dashboard", detail: "securityEngine.ts mirrors the rules in the browser" },
          ],
        },
      ],
      architectureNote: "main.py orchestrates the four stages from the command line.",
      screenshots: [
        {
          src: "/projects/soc-sentinel-dashboard.webp",
          alt: "SOC Sentinel dashboard showing a risk gauge, alert counts and a list of correlated incidents",
          caption: "Dashboard view against the bundled sample log set.",
          width: 1697,
          height: 805,
        },
      ],
      storyboard: [
        { title: "Load logs", description: "Open the Security Log Viewer; the bundled sample CSV is parsed and listed chronologically." },
        { title: "Run the scan", description: "Trigger the scan. Correlation rules fire and alerts appear with their rule ID and actor." },
        { title: "Triage by risk", description: "The dashboard sorts incidents by score — an impossible-travel event leads, off-hours logons trail." },
        { title: "Tune a rule", description: "Change a threshold in the Rule Configurator and watch alert counts respond." },
        { title: "Export the report", description: "Open the Triage Incident Report for the written summary and remediation steps." },
      ],
      limitations: [
        "A simulation: it analyses a bundled sample CSV, not live telemetry or a SIEM feed.",
        "Rules are deterministic heuristics. There is no machine learning and no measured detection rate.",
        "The repository ships a CI workflow that runs pytest, but no test suite exists yet.",
      ],
    },
  },
  {
    slug: "home-security-lab",
    title: "Home security lab",
    summary:
      "A virtualised practice environment — Kali Linux, Windows Server and Active Directory — for attack-and-detect exercises.",
    category: "cybersecurity",
    status: "in-progress",
    stack: ["Kali Linux", "Windows Server", "Active Directory", "Virtual machines"],
  },
  {
    slug: "villainous-agenda",
    title: "Villainous Agenda",
    summary:
      "A to-do app that sends each chore to Gemini and gets it back rewritten as a supervillain master plan, as structured JSON.",
    category: "ai-software",
    status: "prototype",
    year: "2026",
    stack: ["TypeScript", "React", "Express", "Gemini API", "Tailwind CSS", "Vite"],
    repo: `${gh}/Supervillain-To-Do-List-App`,
    featured: true,
    cover: {
      src: "/projects/supervillain-agenda.webp",
      alt: "Villainous Agenda interface with a chore input, three malice levels and a monologue panel",
      caption: "The agenda: chore input, three complexity levels and a generated monologue panel.",
      width: 2000,
      height: 890,
    },
    caseStudy: {
      problem:
        "A small, complete exercise in putting a language model behind a product surface: the model has to return data the UI can trust, and the API key must never reach the browser.",
      approach: [
        "Keep the Gemini key server-side behind two Express endpoints, /api/diabolize and /api/monologue.",
        "Fix the persona in a system instruction and require JSON responses so the client renders typed fields rather than free text.",
        "Let the user pick one of three complexity levels — petty, grand, cosmic — which shape the prompt.",
        "Persist tasks in localStorage so the list survives a reload without a database.",
      ],
      architecture: [
        { label: "Client", nodes: [{ name: "React app", detail: "Task list, complexity selector, audio cues" }] },
        {
          label: "API",
          nodes: [
            { name: "POST /api/diabolize", detail: "Chore + complexity → rewritten plan" },
            { name: "POST /api/monologue", detail: "Task list → monologue + threat level" },
          ],
        },
        { label: "Model", nodes: [{ name: "Gemini", detail: "System-instructed persona, JSON-only output" }] },
        { label: "State", nodes: [{ name: "localStorage", detail: "Tasks persisted in the browser" }] },
      ],
      screenshots: [
        {
          src: "/projects/supervillain-agenda.webp",
          alt: "Villainous Agenda interface with a chore input, three malice levels and a monologue panel",
          caption: "Empty state of the agenda before the first chore is submitted.",
          width: 2000,
          height: 890,
        },
      ],
      storyboard: [
        { title: "Enter a chore", description: "Type something ordinary — “pay the electricity bill”." },
        { title: "Choose the malice", description: "Select Petty Revenge, Grand Malice or Cosmic Chaos." },
        { title: "Diabolize", description: "The server calls Gemini; the chore returns as a scheme with a villain's comment." },
        { title: "Request a monologue", description: "The current task list is summarised into a monologue with a threat level and plan phase." },
        { title: "Complete objectives", description: "Tick tasks off and watch the “evil achieved” percentage climb." },
      ],
      limitations: [
        "Scaffolded in Google AI Studio and extended from there.",
        "Requires your own GEMINI_API_KEY; there is no hosted demo.",
        "No authentication, rate limiting or automated tests.",
      ],
    },
  },
  {
    slug: "shadow-zero",
    title: "Shadow Zero: Katana Protocol",
    summary:
      "A browser combat sandbox for a 2D ninja fighter, paired with the C# scripts intended for a Unity build.",
    category: "creative",
    status: "prototype",
    year: "2026",
    stack: ["TypeScript", "React", "HTML Canvas", "C# (Unity reference scripts)", "Vite"],
    repo: `${gh}/ninja-shadow-fight-game`,
    featured: true,
    cover: {
      src: "/projects/shadow-zero-boss.webp",
      alt: "Two stylised ninja characters facing each other in a boss battle, with health bars and touch controls",
      caption: "Boss battle in the gameplay sandbox, with on-screen touch controls.",
      width: 887,
      height: 612,
    },
    caseStudy: {
      problem:
        "Combat feel — input buffering, hit-stop, knockback — is hard to judge on paper. The sandbox makes those values playable in a browser before committing them to engine code.",
      approach: [
        "Build a playable simulator with a dojo mode and a multi-phase boss encounter.",
        "Wire an upgrade store to the simulator so stat changes are felt immediately.",
        "Keep ten C# reference scripts alongside it — player controller, combat, enemy and boss AI, camera, effects — each mapped to one responsibility.",
        "Include a setup guide covering Unity project configuration and mobile export.",
      ],
      architecture: [
        { label: "Play", nodes: [{ name: "GameSimulator.tsx", detail: "Canvas loop: movement, combos, block, boss phases" }] },
        { label: "Progress", nodes: [{ name: "UpgradeStore.tsx", detail: "Health, speed, damage, combo multiplier" }] },
        {
          label: "Engine reference",
          nodes: [
            { name: "UnityScripts.ts", detail: "10 C# scripts: PlayerController, CombatSystem, EnemyAI, BossAI…" },
            { name: "SetupGuide.tsx", detail: "Unity configuration and Android / iOS export steps" },
          ],
        },
      ],
      screenshots: [
        {
          src: "/projects/shadow-zero-boss.webp",
          alt: "Two stylised ninja characters facing each other in a boss battle, with health bars and touch controls",
          caption: "Boss battle mode with virtual joystick and action buttons.",
          width: 887,
          height: 612,
        },
        {
          src: "/projects/shadow-zero-upgrades.webp",
          alt: "Upgrade screen listing four stat upgrades with coin costs",
          caption: "Upgrade sandbox — purchases apply to the simulator immediately.",
          width: 1251,
          height: 657,
        },
        {
          src: "/projects/shadow-zero-hub.webp",
          alt: "Setup guide page describing Android and iOS export steps",
          caption: "Setup blueprint: export steps for Android and iOS.",
          width: 950,
          height: 467,
        },
      ],
      storyboard: [
        { title: "Enter the dojo", description: "Move with the virtual joystick; chain light attacks into a three-hit combo." },
        { title: "Feel the weight", description: "Land a heavy attack — note the knockback and screen feedback. Block an incoming hit." },
        { title: "Start the boss battle", description: "Switch to Boss Battle; the boss has a larger health pool and a second, more aggressive phase." },
        { title: "Upgrade", description: "Spend earned coins in the Upgrade Sandbox and return to the fight with new stats." },
        { title: "Read the scripts", description: "Open Unity C# Scripts to see how each system maps to a component." },
      ],
      limitations: [
        "The playable part is a web simulator. The repository contains C# reference scripts, not a Unity project or a compiled mobile build.",
        "Scaffolded in Google AI Studio and extended from there.",
        "It is 2D. No 3D or hardware work is represented here yet.",
      ],
    },
  },
  {
    slug: "placeholder-3d-iot",
    title: "3D or IoT project",
    summary:
      "Reserved slot. Add a project object to src/content/projects.ts with category “creative” and remove this entry.",
    category: "creative",
    status: "in-progress",
    stack: [],
    placeholder: true,
  },
];

export const visibleProjects = (showPlaceholders: boolean) =>
  projects.filter((p) => showPlaceholders || !p.placeholder);

export const caseStudyProjects = projects.filter((p) => p.caseStudy && !p.placeholder);

export const getProject = (slug: string) => caseStudyProjects.find((p) => p.slug === slug);
