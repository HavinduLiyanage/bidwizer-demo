"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { Mail, Lock, CheckCircle, ShieldCheck, Sparkles, Building2, Gavel } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"BIDDER" | "PUBLISHER" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Show success message if user just registered
    if (searchParams.get("registered") === "true") {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const { login } = useAuth();
  const [errorQuery, setErrorQuery] = useState("");
  const roleOptions = [
    { label: "Bidder", value: "BIDDER", description: "Access tenders", icon: Gavel },
    { label: "Publisher", value: "PUBLISHER", description: "Manage postings", icon: Building2 },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setErrorQuery("Please select if you are logging in as a bidder or publisher.");
      return;
    }
    setIsSubmitting(true);
    setErrorQuery("");

    // Temporary placeholder login that skips API validation
    const mockUser: {
      id: string;
      email: string;
      name: string;
      email_verified: boolean;
      org_type: "BIDDER" | "PUBLISHER";
    } = {
      id: "temp-user",
      email,
      name: email?.split("@")[0] || "Guest",
      email_verified: true,
      org_type: selectedRole,
    };

    login("temp-token", mockUser);

    if (selectedRole === "PUBLISHER") {
      router.push("/publisher/dashboard");
    } else {
      router.push("/tenders");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <SiteHeader variant="page" />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* LEFT — Animated hero */}
            <motion.section
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex lg:col-span-6"
            >
              <div className="relative w-full overflow-hidden rounded-3xl border border-blue-100/60 dark:border-white/5 bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-blue-950/40 dark:via-blue-950/20 dark:to-gray-950 p-10">
                {/* soft backdrop blobs */}
                <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

                <div className="relative">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Simplify your tender management
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Join thousands of professionals using BidWizer to streamline tender publishing and bidding.
                  </p>

                  {/* Animated dashboard preview */}
                  <AnimatedDashboard />
                </div>
              </div>
            </motion.section>

            {/* RIGHT — Login card */}
            <motion.section
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex lg:col-span-6 items-center justify-center"
            >
              <Card className="w-full max-w-md bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border border-white/50 dark:border-white/10 shadow-xl rounded-3xl">
                <CardContent className="p-8 space-y-7">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                        <Sparkles className="h-3.5 w-3.5" />
                        Fresh new look
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        Secure access
                      </span>
                    </div>
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back 👋</h1>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Sign in to continue on BidWizer
                      </p>
                    </div>
                  </div>

                  {/* Success Message */}
                  {showSuccessMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Registration Successful!</p>
                        <p className="text-xs text-green-600">You can now sign in to your account.</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {errorQuery && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                      <div className="text-sm text-red-600">{errorQuery}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-11 h-12 rounded-xl border-gray-200 dark:border-white/10 bg-white/80"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Password <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-11 h-12 rounded-xl border-gray-200 dark:border-white/10 bg-white/80"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Log in as <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {roleOptions.map(({ label, value, description, icon: Icon }) => (
                          <Button
                            type="button"
                            key={value}
                            variant={selectedRole === value ? "primary" : "outline"}
                            className="flex flex-col items-start h-full gap-2 rounded-2xl px-4 py-4 text-left hover:shadow-sm transition-shadow"
                            aria-pressed={selectedRole === value}
                            onClick={() => setSelectedRole(value)}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span className="font-semibold">{label}</span>
                            </div>
                            <span className="text-xs text-gray-500">{description}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold rounded-xl shadow-sm"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging in..." : "Log in"}
                      </Button>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
                      {[
                        { label: "Avg. approval", value: "2 min" },
                        { label: "Active orgs", value: "480+" },
                        { label: "SLA uptime", value: "99.9%" },
                      ].map(({ label, value }) => (
                        <div key={label} className="rounded-xl border border-white/60 bg-white/80 backdrop-blur py-2">
                          <p className="text-sm font-semibold text-gray-900">{value}</p>
                          <p>{label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between text-sm">
                      <Link href="/forgot-password" className="text-primary hover:underline">
                        Forgot your password?
                      </Link>
                      <span className="text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/register/bidder/step1" className="text-primary font-medium hover:underline">
                          Sign Up
                        </Link>
                      </span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/** ---------- Animated dashboard (pure React, no external assets) ---------- */
function AnimatedDashboard() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-5">
      {/* KPI cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="md:col-span-2 rounded-2xl border border-white/60 shadow-sm bg-white/70 dark:bg-white/5 backdrop-blur p-5"
      >
        <p className="text-sm text-gray-500 dark:text-gray-300">Active Tenders</p>
        <motion.h3
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          128
        </motion.h3>
        <p className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">+12% this week</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="md:col-span-3 rounded-2xl border border-white/60 shadow-sm bg-white/70 dark:bg-white/5 backdrop-blur p-5"
      >
        <p className="text-sm text-gray-500 dark:text-gray-300">AI Insights</p>
        {/* animated line bars */}
        <div className="mt-3 flex items-end gap-2 h-20">
          {[40, 64, 52, 80, 58, 74, 65].map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-md bg-blue-500/70 dark:bg-blue-400/70"
              initial={{ height: `${h - 15}%`, opacity: 0.6 }}
              animate={{ height: `${h}%`, opacity: 1 }}
              transition={{
                delay: 0.3 + i * 0.08,
                duration: 0.6,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 2.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* table-ish card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="md:col-span-3 rounded-2xl border border-white/60 shadow-sm bg-white/70 dark:bg-white/5 backdrop-blur p-5"
      >
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">Recent Activity</p>
        <ul className="space-y-2 text-sm">
          {[
            ["Bid submitted", "2m ago"],
            ["AI summary generated", "14m ago"],
            ["Tender edited", "1h ago"],
          ].map(([label, time], i) => (
            <li key={i} className="flex items-center justify-between">
              <span className="text-gray-800 dark:text-gray-200">{label}</span>
              <span className="text-gray-500 dark:text-gray-400">{time}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* pulse card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="md:col-span-2 rounded-2xl border border-white/60 shadow-sm bg-white/70 dark:bg-white/5 backdrop-blur p-5"
      >
        <p className="text-sm text-gray-500 dark:text-gray-300">System Health</p>
        <div className="mt-3 flex items-center gap-3">
          <motion.span
            className="h-3 w-3 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          <span className="text-gray-800 dark:text-gray-200">All services operational</span>
        </div>
      </motion.div>
    </div>
  );
}
