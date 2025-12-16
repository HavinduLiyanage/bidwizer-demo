"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Filter,
  Globe2,
  Search,
  ShieldCheck,
  Upload,
  Users
} from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";

interface TalentProfile {
  id: string;
  name: string;
  role: string;
  summary: string;
  location: string;
  timezone: string;
  availability: "Available now" | "Starting soon" | "Booked";
  rate: string;
  tenderWins: number;
  experience: string;
  verified: boolean;
  skills: string[];
  industries: string[];
  certifications: string[];
}

const talentProfiles: TalentProfile[] = [
  {
    id: "talent-01",
    name: "Aisha Patel",
    role: "Lead Bid Strategist",
    summary: "12+ years orchestrating World Bank and ADB proposals with 78% win rate.",
    location: "London, UK",
    timezone: "GMT+0",
    availability: "Available now",
    rate: "$120/hr",
    tenderWins: 43,
    experience: "Infrastructure, Healthcare",
    verified: true,
    skills: ["Bid Strategy", "Costing Models", "Compliance Review"],
    industries: ["Infrastructure", "Healthcare"],
    certifications: ["APMP Practitioner", "PMP"]
  },
  {
    id: "talent-02",
    name: "Samuel Kim",
    role: "Technical Writer",
    summary: "Transforms complex engineering specs into persuasive tender narratives.",
    location: "Singapore",
    timezone: "GMT+8",
    availability: "Starting soon",
    rate: "$95/hr",
    tenderWins: 31,
    experience: "Transport, Smart Cities",
    verified: true,
    skills: ["Technical Writing", "Stakeholder Interviews", "Design-Build"],
    industries: ["Transportation", "Smart Cities"],
    certifications: ["APMP Foundation"]
  },
  {
    id: "talent-03",
    name: "Elena Kovac",
    role: "Procurement Lawyer",
    summary: "Ensures bids withstand strict EU procurement scrutiny.",
    location: "Zagreb, Croatia",
    timezone: "GMT+1",
    availability: "Available now",
    rate: "$180/hr",
    tenderWins: 54,
    experience: "Government, Defense",
    verified: true,
    skills: ["Contract Law", "Risk Mitigation", "Bid Compliance"],
    industries: ["Government", "Defense"],
    certifications: ["LLM Procurement Law"]
  },
  {
    id: "talent-04",
    name: "Diego Martínez",
    role: "Cost Engineer",
    summary: "Builds bottom-up BOQs for mega infrastructure programs.",
    location: "Bogotá, Colombia",
    timezone: "GMT-5",
    availability: "Booked",
    rate: "$110/hr",
    tenderWins: 27,
    experience: "Energy, Water",
    verified: false,
    skills: ["Cost Engineering", "BOQ Modeling", "Value Engineering"],
    industries: ["Energy", "Water"],
    certifications: ["PMP"]
  },
  {
    id: "talent-05",
    name: "Maya Singh",
    role: "ESG & Impact Specialist",
    summary: "Aligns proposals with sustainability scoring frameworks.",
    location: "Bangalore, India",
    timezone: "GMT+5:30",
    availability: "Available now",
    rate: "$85/hr",
    tenderWins: 19,
    experience: "Education, Public Health",
    verified: true,
    skills: ["ESG Strategy", "Impact Modeling", "Stakeholder Engagement"],
    industries: ["Education", "Healthcare"],
    certifications: ["LEED AP", "APMG PPP"]
  },
  {
    id: "talent-06",
    name: "Noah Clarke",
    role: "Digital Submission Lead",
    summary: "Runs compliant digital submissions across e-procurement portals.",
    location: "Toronto, Canada",
    timezone: "GMT-4",
    availability: "Starting soon",
    rate: "$70/hr",
    tenderWins: 34,
    experience: "Smart Infrastructure",
    verified: true,
    skills: ["Portal Management", "Document Control", "QA"],
    industries: ["Technology", "Infrastructure"],
    certifications: ["Prince2 Practitioner"]
  }
];

const skillFilters = [
  "Bid Strategy",
  "Technical Writing",
  "Cost Engineering",
  "Legal Review",
  "ESG",
  "Digital Submission"
];

const availabilityFilters: TalentProfile["availability"][] = [
  "Available now",
  "Starting soon",
  "Booked"
];

const verificationSteps = [
  {
    title: "Identity & Work Email",
    description: "Talent confirms their identity with gov-issued ID plus verifiable work email or LinkedIn login.",
    icon: ShieldCheck
  },
  {
    title: "Tender Proof & References",
    description: "We collect award letters, references, and tender IDs to match against our tender database.",
    icon: BadgeCheck
  },
  {
    title: "Manual Review",
    description: "Marketplace reviewers validate documents, certifications, and remove duplicates or suspicious data.",
    icon: CheckCircle2
  }
];

const heroStats = [
  { label: "Verified experts", value: "420+", icon: Users },
  { label: "Avg. win rate", value: "72%", icon: Briefcase },
  { label: "Global coverage", value: "36 Countries", icon: Globe2 }
];

export default function TalentMarketplacePage() {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [availability, setAvailability] = useState<TalentProfile["availability"] | null>(null);

  const filteredTalent = useMemo(() => {
    return talentProfiles.filter(profile => {
      const matchesSearch =
        profile.name.toLowerCase().includes(search.toLowerCase()) ||
        profile.role.toLowerCase().includes(search.toLowerCase()) ||
        profile.summary.toLowerCase().includes(search.toLowerCase());

      const matchesSkill = !selectedSkill || profile.skills.some(skill => skill === selectedSkill);
      const matchesAvailability = !availability || profile.availability === availability;

      return matchesSearch && matchesSkill && matchesAvailability;
    });
  }, [search, selectedSkill, availability]);

  return (
    <>
      <SiteHeader variant="page" />
      <main className="bg-slate-50">
        <section className="bg-gradient-to-br from-navy-900 via-indigo-900 to-slate-900 text-white">
          <div className="container px-4 py-16 sm:py-20 lg:py-28 flex flex-col gap-10">
            <div className="max-w-3xl space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Talent Marketplace</p>
              <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">
                Hire tender specialists who know how to execute, not just consult.
              </h1>
              <p className="text-lg text-slate-200">
                Discover pre-vetted strategists, technical writers, engineers, and lawyers ready to plug into
                your live tenders. Each profile ships with proof of wins and document compliance history.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="#talent-grid"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg hover:translate-y-0.5 transition w-full sm:w-auto"
                >
                  Browse experts
                </Link>
                <Link
                  href="#submit-cv"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition w-full sm:w-auto"
                >
                  Join as talent
                </Link>
              </div>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {heroStats.map(stat => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 border border-white/20 p-5 backdrop-blur"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 text-blue-100">
                    <stat.icon className="h-5 w-5" />
                    <span className="text-xs uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container px-4 -mt-8 sm:-mt-12 pb-8" id="filters">
          <div className="rounded-3xl bg-white shadow-xl ring-1 ring-slate-100 p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Matchmaking</p>
                <h2 className="text-2xl font-semibold text-navy-900">Find the right specialist instantly</h2>
                <p className="text-sm text-slate-600">
                  Filter by skill tags, availability windows, or just search for what you need. We&apos;ll
                  surface the closest talent to your tender requirements.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={ev => setSearch(ev.target.value)}
                    placeholder="Search by role, skill, sector..."
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Skill focus</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {skillFilters.map(skill => {
                      const isActive = skill === selectedSkill;
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => setSelectedSkill(isActive ? null : skill)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            isActive
                              ? "border-navy-600 bg-navy-600 text-white shadow-md"
                              : "border-slate-200 bg-white text-slate-700 hover:border-navy-200 hover:text-navy-900"
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Availability</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {availabilityFilters.map(option => {
                      const isActive = option === availability;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setAvailability(isActive ? null : option)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            isActive
                              ? "border-emerald-600 bg-emerald-600 text-white shadow-md"
                              : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-900"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 pb-20" id="talent-grid">
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Results</p>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-2xl font-semibold text-navy-900">
                {filteredTalent.length} matching experts
              </h2>
              {(selectedSkill || availability || search) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSkill(null);
                    setAvailability(null);
                    setSearch("");
                  }}
                  className="text-sm font-medium text-slate-500 hover:text-navy-900"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredTalent.map(profile => (
              <motion.div
                key={profile.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100/70"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-lg font-semibold text-navy-900">
                        {profile.name
                          .split(" ")
                          .map(chunk => chunk[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-navy-900">{profile.name}</h3>
                          {profile.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              <ShieldCheck className="h-3 w-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{profile.role}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase text-slate-400">Availability</p>
                      <p
                        className={`text-sm font-semibold ${
                          profile.availability === "Available now"
                            ? "text-emerald-600"
                            : profile.availability === "Starting soon"
                            ? "text-amber-600"
                            : "text-slate-400"
                        }`}
                      >
                        {profile.availability}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600">{profile.summary}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Tender wins</p>
                      <p className="text-2xl font-semibold text-navy-900">{profile.tenderWins}</p>
                      <p className="text-xs text-slate-500">Across {profile.experience}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Rate</p>
                      <p className="text-2xl font-semibold text-navy-900">{profile.rate}</p>
                      <p className="text-xs text-slate-500">
                        {profile.location} • {profile.timezone}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {profile.certifications.map(cert => (
                      <span
                        key={cert}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 hover:border-navy-200 hover:bg-navy-50">
                      Request profile
                    </button>
                    <button className="rounded-full border border-transparent bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800">
                      Book intro call
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-white py-20" id="quality-control">
          <div className="container px-4 grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Quality control</p>
              <h2 className="text-3xl font-semibold text-navy-900">
                Every CV is verified before it ever hits your search results.
              </h2>
              <p className="text-slate-600">
                We run a three-step trust pipeline so you aren&apos;t wasting cycles on fabricated wins. If a
                profile doesn&apos;t pass, it stays hidden until the talent fixes their submission.
              </p>
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
                <p className="text-sm font-semibold text-navy-900">Community & AI backstops</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Talent profiles flagged by customers trigger an instant manual audit.</li>
                  <li>• Document fingerprinting prevents the same CV from being reused under fake names.</li>
                  <li>• AI anomaly checks compare claimed amounts against known tender budgets.</li>
                </ul>
              </div>
            </div>

            <div className="grid gap-4">
              {verificationSteps.map(step => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="rounded-2xl bg-navy-900/10 p-3 text-navy-900">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{step.title}</p>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 py-20" id="submit-cv">
          <div className="container px-4 grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Join marketplace</p>
              <h2 className="text-3xl font-semibold text-navy-900">Upload your CV and get verified</h2>
              <p className="text-slate-600">
                Tell us what tenders you have shipped, share supporting docs, and we&apos;ll notify you once the
                review is complete. Verified profiles can be surfaced next to live tenders automatically.
              </p>
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-5">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span>Average verification turnaround: 48 hours.</span>
                </div>
              </div>
            </div>

            <form className="rounded-3xl bg-white p-6 shadow-xl shadow-blue-100">
              <div className="flex items-center gap-3 rounded-2xl bg-blue-50/70 px-4 py-3 text-sm font-semibold text-blue-900">
                <Upload className="h-4 w-4" />
                Start by uploading your CV PDF
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-800">
                  Full name
                  <input
                    type="text"
                    placeholder="e.g. Priya Rao"
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Work email
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="text-sm font-medium text-slate-800 md:col-span-2">
                  LinkedIn profile
                  <input
                    type="url"
                    placeholder="https://www.linkedin.com/in/your-name"
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="mt-1 block text-xs text-slate-500">
                    We cross-check roles, endorsements, and shared contacts to reduce impersonation.
                  </span>
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Primary skill focus
                  <select className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <option value="">Select skill</option>
                    {skillFilters.map(skill => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Tender wins (IDs or links)
                  <textarea
                    rows={2}
                    placeholder="World Bank - P155-ADB (2023), Ministry of Transport - RFP-889 (2022)..."
                    className="mt-1 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-blue-100 h-[56px]"
                  />
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Upload CV (PDF only)
                  <div className="mt-1 flex flex-col gap-2 rounded-2xl border-2 border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                    <p>Drag & drop your CV PDF here</p>
                    <span className="text-xs text-slate-400">Accepted: .pdf &bull; Max 15 MB</span>
                    <button
                      type="button"
                      className="mx-auto rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-navy-200 hover:text-navy-900"
                    >
                      Upload CV
                    </button>
                  </div>
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Upload supporting docs
                  <div className="mt-1 flex flex-col gap-2 rounded-2xl border-2 border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                    <p>Drop PDF or images here</p>
                    <span className="text-xs text-slate-400">Award letters, certifications, references</span>
                    <button
                      type="button"
                      className="mx-auto rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-navy-200 hover:text-navy-900"
                    >
                      Choose files
                    </button>
                  </div>
                </label>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-2xl bg-navy-900 py-3 text-sm font-semibold text-white hover:bg-navy-800"
              >
                Submit for verification
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">
                We reach out if additional validation is required.
              </p>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
