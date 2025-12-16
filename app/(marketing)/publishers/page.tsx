"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Building2, Filter, Mail, ShieldCheck, Users } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PLANS, type PlanTier } from "@/lib/entitlements";
import {
  directoryPublishers,
  type DirectoryPublisher,
  type Sector,
  FOLLOWED_PUBLISHERS_STORAGE_KEY,
  FOLLOWED_PUBLISHERS_EVENT,
  DEFAULT_FOLLOWED_PUBLISHER_IDS
} from "@/lib/publisher-directory";

const categories = ["All", "Infrastructure", "Healthcare", "Transportation", "Utilities", "Education", "Energy"];
const sectorFilters: Array<{ label: string; value: Sector | "All" }> = [
  { label: "All sectors", value: "All" },
  { label: "Government", value: "Government" },
  { label: "Private", value: "Private" },
  { label: "International", value: "International" }
];

const demoPlanTier: PlanTier = "STANDARD";
const demoPlan = PLANS[demoPlanTier];
const userPlan = {
  name: demoPlan.name,
  maxFollowing: demoPlan.publisherFollowLimit,
  description:
    demoPlan.publisherFollowLimit === 0
      ? "Email alerts unlock with a paid plan. Upgrade anytime."
      : `You can follow up to ${demoPlan.publisherFollowLimit} publishers and receive instant alerts.`
};

export default function PublishersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSector, setSelectedSector] = useState<Sector | "All">("All");
  const [followedIds, setFollowedIds] = useState<string[]>(DEFAULT_FOLLOWED_PUBLISHER_IDS);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(FOLLOWED_PUBLISHERS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFollowedIds(parsed);
          return;
        }
      } catch (err) {
        console.warn("Failed to parse followed publishers from storage", err);
      }
    }

    window.localStorage.setItem(
      FOLLOWED_PUBLISHERS_STORAGE_KEY,
      JSON.stringify(DEFAULT_FOLLOWED_PUBLISHER_IDS)
    );
  }, []);

  const filteredPublishers = useMemo(() => {
    return directoryPublishers.filter((publisher) => {
      const matchesSearch =
        publisher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        publisher.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        publisher.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || publisher.category === selectedCategory;
      const matchesSector = selectedSector === "All" || publisher.sector === selectedSector;

      return matchesSearch && matchesCategory && matchesSector;
    });
  }, [searchQuery, selectedCategory, selectedSector]);

  const canFollowMore =
    userPlan.maxFollowing === 0 ? false : followedIds.length < userPlan.maxFollowing;

  const persistFollowed = (nextIds: string[]) => {
    setFollowedIds(nextIds);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FOLLOWED_PUBLISHERS_STORAGE_KEY, JSON.stringify(nextIds));
      window.dispatchEvent(new Event(FOLLOWED_PUBLISHERS_EVENT));
    }
  };

  const handleFollowToggle = (publisherId: string) => {
    const isFollowing = followedIds.includes(publisherId);

    if (isFollowing) {
      const next = followedIds.filter((id) => id !== publisherId);
      persistFollowed(next);
      setShowLimitMessage(false);
      return;
    }

    if (!canFollowMore) {
      setShowLimitMessage(true);
      return;
    }

    persistFollowed([...followedIds, publisherId]);
    setShowLimitMessage(false);
  };

  return (
    <>
      <SiteHeader variant="page" />
      <main className="min-h-screen bg-[#F9FAFB]">
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <Badge className="px-3 py-1 rounded-full bg-primary/10 text-primary border-0 mb-3">
              Follow publishers
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Stay notified about new tenders</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow verified publishers to receive email alerts whenever they publish a new tender. Use
              the filters below to find agencies that match your pipeline.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {/* Search + Filters */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search publishers, sectors, or locations"
                      className="pl-10 h-11 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition ${
                          selectedCategory === category
                            ? "bg-gray-900 text-white border-gray-900"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sectorFilters.map((sector) => (
                      <button
                        key={sector.value}
                        onClick={() => setSelectedSector(sector.value)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition ${
                          selectedSector === sector.value
                            ? "bg-primary text-white border-primary"
                            : "border-gray-200 text-gray-600 hover:border-primary/40"
                        }`}
                      >
                        {sector.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Publisher Results */}
              <div className="space-y-4">
                {filteredPublishers.length === 0 && (
                  <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-500">
                    No publishers match that filter set. Try another sector or category.
                  </div>
                )}
                {filteredPublishers.map((publisher, idx) => {
                  const isFollowing = followedIds.includes(publisher.id);
                  const disabled = !isFollowing && !canFollowMore;

                  return (
                    <motion.div
                      key={publisher.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-gray-900">{publisher.name}</h3>
                              {publisher.verified && (
                                <Badge className="bg-green-100 text-green-700 border-0 flex items-center gap-1">
                                  <ShieldCheck className="h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
                              <span>{publisher.location}</span>
                              <span>•</span>
                              <span>{publisher.category}</span>
                              <span>•</span>
                              <span>{publisher.sector}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{publisher.description}</p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                              <span className="flex items-center gap-1">
                                <Filter className="h-3.5 w-3.5" />
                                {publisher.activeTenders} active tenders
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                {publisher.followers} followers
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" />
                                Email alerts enabled
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-stretch gap-2 min-w-[200px]">
                          <button
                            onClick={() => handleFollowToggle(publisher.id)}
                            disabled={disabled && !isFollowing}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                              isFollowing
                                ? "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200"
                                : disabled
                                ? "bg-gray-100 text-gray-400 border border-dashed border-gray-200 cursor-not-allowed"
                                : "bg-primary text-white border border-primary hover:bg-primary/90"
                            }`}
                          >
                            {isFollowing ? "Following" : "Follow publisher"}
                          </button>
                          {isFollowing && (
                            <button
                              onClick={() => handleFollowToggle(publisher.id)}
                              className="rounded-xl px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition"
                            >
                              Unfollow
                            </button>
                          )}
                          <span className="text-xs text-gray-500 text-center">
                            Email when new tenders go live
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                  Plan limit
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{userPlan.name} plan</h3>
                <p className="text-sm text-gray-600 mb-4">{userPlan.description}</p>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                  <div>
                    <p className="text-xs text-gray-500">Publishers followed</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {followedIds.length}/{userPlan.maxFollowing}
                    </p>
                  </div>
                  <Badge className="bg-gray-900 text-white border-0">Upgrade</Badge>
                </div>
                {showLimitMessage && (
                  <p className="text-xs text-amber-600 mt-3">
                    Upgrade your plan to follow more publishers and receive tender alerts.
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-100 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">How following works</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Follow verified publishers you care about</li>
                  <li>• We email you instantly when they post a new tender</li>
                  <li>• Filter by sector to keep your pipeline focused</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
