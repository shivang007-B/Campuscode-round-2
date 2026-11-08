import * as React from "react"
import CampusCode from "./components/campuscode"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import type {
  CampusCodeNavLink,
  CampusCodeHero,
  CampusCodeMission,
  CampusCodeProject,
  CampusCodeProjects,
  CampusCodeNight,
  CampusCodeTier,
  CampusCodeJoin,
  CampusCodeFooter,
} from "./components/campuscode"

// ── CampusCode · Hackathon Arena ──────────────────────────────────────────────

function inDays(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0")
}

const nav: CampusCodeNavLink[] = [
  { label: "About", target: "mission" },
  { label: "How it Works", target: "projects" },
  { label: "Hackathons", target: "nights" },
  { label: "Community", target: "join" },
]

const hero: Partial<CampusCodeHero> = {
  wordmark: "CampusCode",
  issue: "#001",
  title: "BUILD\nCOMPETE\nSHIP.",
  blurb:
    "A digital arena for students who don't just have ideas. They build them. CampusCode brings students, teams, organizers and hackathons into one connected ecosystem.",
  credit: "CampusCode · Chennai, India · The Student Hackathon Arena",
  primaryCta: "Explore Hackathons",
  secondaryCta: "Join CampusCode",
  hint: "CAMPUSCODE / 001",
}

const mission: Partial<CampusCodeMission> = {
  bandTitle: "CAMPUS\nCODE",
  kicker: "CAMPUSCODE PROJECT",
  meta: ["CampusCode — Chennai · India", "#001 Hackathon Arena", "Built for student builders"],
  title: "Where students build.",
  body:
    "CampusCode brings students, teams, organizers and hackathons into one connected ecosystem. Find a challenge, team up with people who share your ambition, turn your idea into something real, and ship it to the arena. No experience needed — just the drive to build.",
  stats: [
    { value: "5,000+", label: "Students" },
    { value: "120", label: "Hackathons" },
    { value: "48", label: "Colleges" },
    { value: "12", label: "Cities" },
  ],
}

const projects: CampusCodeProject[] = [
  {
    code: "#01",
    title: "AI Innovation",
    summary: "Build intelligent solutions for problems that matter.",
    detail:
      "Design and deploy AI-powered projects that tackle real-world challenges. Whether it's ML models, NLP tools, or computer-vision apps — if it thinks, it belongs here.",
    status: "ongoing",
    progress: 0.7,
    goal: "LIVE — submissions open",
    cta: "Enter Arena",
  },
  {
    code: "#02",
    title: "Future Web",
    summary: "Design and ship the next generation of digital experiences.",
    detail:
      "Push the boundaries of what the browser can do. Build beautiful, fast, accessible apps that redefine how students interact with the web.",
    status: "open",
    progress: 0.45,
    goal: "OPEN — register your team",
    cta: "Register Team",
  },
  {
    code: "#03",
    title: "Campus Tech",
    summary: "Create technology that makes student life better.",
    detail:
      "Smart timetables, attendance trackers, campus maps, peer-learning tools — if it helps students thrive on campus, build it here.",
    status: "ongoing",
    progress: 0.3,
    goal: "UPCOMING — prep your idea",
    cta: "Get Notified",
  },
  {
    code: "#04",
    title: "Open Innovation",
    summary: "No category. No limits. Ship anything worth building.",
    detail:
      "Have an idea that doesn't fit a box? This track is for you. Build games, hardware hacks, climate tools — whatever your team is fired up about.",
    status: "open",
    progress: 0.15,
    goal: "Open call — all ideas welcome",
    cta: "Pitch an Idea",
  },
]

const projectsCopy: Partial<CampusCodeProjects> = {
  title: "CAMPUS\nCODE",
  issue: "001",
  ribbonText: "campuscode · hackathon arena",
  heading: "From idea to impact.",
  body:
    "Discover a challenge, team up with people who share your ambition, turn your idea into something people can use, then submit your work and take it to the arena.",
}

const nights: CampusCodeNight[] = [
  { date: inDays(2), time: "10:00", title: "AI Innovation Hackathon", place: "Anna University, Chennai", kind: "Hackathon", target: "Artificial Intelligence", seats: 200, going: 148 },
  { date: inDays(7), time: "09:00", title: "Future Web Challenge", place: "IIT Madras Research Park", kind: "Hackathon", target: "Web Development", seats: 150, going: 112 },
  { date: inDays(14), time: "11:00", title: "Campus Tech Sprint", place: "SRM University, Kattankulathur", kind: "Hackathon", target: "Smart Technology", seats: 100, going: 67 },
  { date: inDays(21), time: "10:00", title: "Team Formation Meetup", place: "T-Hub Coworking, Chennai", kind: "Workshop", target: "Team Building & Ideation", seats: 60, going: 54 },
  { date: inDays(30), time: "09:30", title: "Open Innovation Hackathon", place: "VIT Chennai Campus", kind: "Hackathon", target: "Open Track", seats: 300, going: 189 },
]

const tiers: CampusCodeTier[] = [
  {
    name: "Student",
    price: "Free",
    blurb: "For the curious builder.",
    perks: ["Explore all hackathons", "Public community forums", "Monthly builder digest"],
  },
  {
    name: "Builder",
    price: "₹99",
    period: "/mo",
    blurb: "For serious competitors.",
    perks: ["Everything in Student", "Early hackathon access", "Team matching tools", "Mentor office hours"],
    featured: true,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/mo",
    blurb: "For teams that ship.",
    perks: ["Everything in Builder", "Unlimited team projects", "Priority judging slots", "Recruiter profile badge"],
  },
]

const join: Partial<CampusCodeJoin> = {
  tag: "Membership",
  title: "Get your card. Find your team.",
  body: "Pick a tier, enter your name and watch your CampusCode card print. You can change tiers any time.",
  namePlaceholder: "Your full name",
  emailPlaceholder: "you@college.edu or College (e.g. JKLU)",
  button: "Print my card",
  success: "Welcome to the arena, {name}. Your card is on its way.",
}

const footer: Partial<CampusCodeFooter> = {
  bandTitle: "CAMPUS\nCODE",
  tagline: "THE STUDENT HACKATHON ARENA.  YOU BUILD THE IDEA, WE RUN THE COMPETITION.",
  credit: "CAMPUSCODE · CHENNAI, INDIA · HACKATHON ARENA",
  links: [
    { label: "About", href: "#about" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "How it Works", href: "#how" },
    { label: "Community", href: "#community" },
    { label: "Students", href: "#student" },
    { label: "Teams", href: "#teams" },
    { label: "Organizers", href: "#organizers" },
    { label: "Developers", href: "#developers" },
    { label: "Hackathon Rules", href: "#rules" },
    { label: "FAQ", href: "#faq" },
    { label: "Support", href: "#support" },
    { label: "Contact", href: "#contact" },
    { label: "Terms", href: "#terms" },
    { label: "Privacy", href: "#privacy" },
  ],
}

type Page = "landing" | "login" | "register" | "dashboard"
type User = { name: string; email: string; college?: string; avatar?: string }

export default function App() {
  const [page, setPage] = React.useState<Page>("landing")
  const [user, setUser] = React.useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("campuscode_user")
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Quick navigation handler from any component or link hash
  React.useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.toLowerCase()
      if (h === "#login") {
        setPage("login")
      } else if (h === "#register" || h === "#join") {
        setPage("register")
      } else if (h === "#dashboard") {
        // AUTH GUARD: Do not allow direct redirect or access to dashboard without login
        const loggedUser = user || (() => {
          try {
            const saved = localStorage.getItem("campuscode_user")
            return saved ? JSON.parse(saved) : null
          } catch {
            return null
          }
        })()

        if (!loggedUser) {
          setPage("login")
          window.location.hash = "#login"
        } else {
          setPage("dashboard")
        }
      } else if (h === "#home") {
        setPage("landing")
      }
    }

    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [user])

  if (page === "login") {
    return (
      <LoginPage
        onLogin={async (email) => {
          const derivedName = email.includes("@") ? email.split("@")[0] : email
          const newUser: User = {
            name: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
            email,
            college: "Anna University",
            avatar: "/avatar.png",
          }
          setUser(newUser)
          try {
            localStorage.setItem("campuscode_user", JSON.stringify(newUser))
          } catch { }
          setPage("dashboard")
          window.location.hash = "#dashboard"
        }}
        onGoRegister={() => {
          setPage("register")
          window.location.hash = "#register"
        }}
        onGoHome={() => {
          setPage("landing")
          window.location.hash = ""
        }}
      />
    )
  }

  if (page === "register") {
    return (
      <RegisterPage
        onRegister={async (data) => {
          const newUser: User = {
            name: data.name || "Student Builder",
            email: data.email,
            college: data.college || "Anna University",
            avatar: "/avatar.png",
          }
          setUser(newUser)
          try {
            localStorage.setItem("campuscode_user", JSON.stringify(newUser))
          } catch { }
          setPage("dashboard")
          window.location.hash = "#dashboard"
        }}
        onGoLogin={() => {
          setPage("login")
          window.location.hash = "#login"
        }}
        onGoHome={() => {
          setPage("landing")
          window.location.hash = ""
        }}
      />
    )
  }

  if (page === "dashboard") {
    // AUTH GUARD: Strictly forbid rendering dashboard if not logged in
    if (!user) {
      return (
        <LoginPage
          onLogin={async (email) => {
            const derivedName = email.includes("@") ? email.split("@")[0] : email
            const newUser: User = {
              name: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
              email,
              college: "Anna University",
              avatar: "/avatar.png",
            }
            setUser(newUser)
            try {
              localStorage.setItem("campuscode_user", JSON.stringify(newUser))
            } catch { }
            setPage("dashboard")
            window.location.hash = "#dashboard"
          }}
          onGoRegister={() => {
            setPage("register")
            window.location.hash = "#register"
          }}
          onGoHome={() => {
            setPage("landing")
            window.location.hash = ""
          }}
        />
      )
    }

    return (
      <DashboardPage
        user={user}
        onLogout={() => {
          try {
            localStorage.removeItem("campuscode_user")
          } catch { }
          setUser(null)
          setPage("landing")
          window.location.hash = ""
        }}
        onGoHome={() => {
          setPage("landing")
          window.location.hash = ""
        }}
      />
    )
  }

  return (
    <CampusCode
      brand="CampusCode"
      navCta="Join CampusCode ↗"
      navLoginCta="Login"
      onNavLogin={() => {
        setPage("login")
        window.location.hash = "#login"
      }}
      nav={nav}
      hero={hero}
      mission={mission}
      projects={projects}
      projectsCopy={projectsCopy}
      nightsTag="04 · Enter the Arena"
      nightsTitle="Hackathons happening now."
      nights={nights}
      tiers={tiers}
      join={join}
      footer={footer}
      palette="cobalt"
      paletteSwitcher={true}
      defaultTheme="system"
      onNavCta={() => {
        setPage("register")
        window.location.hash = "#register"
      }}
      onJoin={(member) => {
        const isFullEmail = member.email.includes("@")
        const collegeName = isFullEmail
          ? member.email.split("@")[1].split(".")[0].toUpperCase()
          : member.email.toUpperCase()
        const userEmail = isFullEmail
          ? member.email
          : `${member.name.toLowerCase().replace(/\s+/g, "")}@${member.email.toLowerCase()}.edu.in`

        const newUser: User = {
          name: member.name,
          email: userEmail,
          college: collegeName || "Anna University",
          avatar: "/avatar.png",
        }
        setUser(newUser)
        try {
          localStorage.setItem("campuscode_user", JSON.stringify(newUser))
        } catch { }
        setPage("dashboard")
        window.location.hash = "#dashboard"
      }}
      onViewDashboard={() => {
        if (user) {
          setPage("dashboard")
          window.location.hash = "#dashboard"
        } else {
          setPage("login")
          window.location.hash = "#login"
        }
      }}
    />
  )
}

