"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Bell, TrendingUp, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  directoryPublishers,
  FOLLOWED_PUBLISHERS_EVENT,
  FOLLOWED_PUBLISHERS_STORAGE_KEY,
  DEFAULT_FOLLOWED_PUBLISHER_IDS
} from "@/lib/publisher-directory";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function FollowedPublishers() {
  const [followedIds, setFollowedIds] = useState<string[]>(DEFAULT_FOLLOWED_PUBLISHER_IDS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsClient(true);

    const syncFromStorage = () => {
      const stored = window.localStorage.getItem(FOLLOWED_PUBLISHERS_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setFollowedIds(parsed);
            return;
          }
        } catch (err) {
          console.warn("Failed to parse followed publishers", err);
        }
      }
      setFollowedIds(DEFAULT_FOLLOWED_PUBLISHER_IDS);
    };

    syncFromStorage();

    window.addEventListener(FOLLOWED_PUBLISHERS_EVENT, syncFromStorage);
    window.addEventListener("storage", syncFromStorage);

    return () => {
      window.removeEventListener(FOLLOWED_PUBLISHERS_EVENT, syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const followedPublishers = useMemo(
    () =>
      directoryPublishers.filter((publisher) => followedIds.includes(publisher.id)),
    [followedIds]
  );

  const totalNew = followedPublishers.reduce((acc, publisher) => acc + publisher.newThisWeek, 0);
  const totalActive = followedPublishers.reduce(
    (acc, publisher) => acc + publisher.activeTenders,
    0
  );

  if (!isClient) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Following</h3>
              <p className="text-xs text-gray-500">Loading publishers...</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-gray-200 bg-white animate-pulse h-20"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bell className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Following</h3>
            <p className="text-xs text-gray-500">
              {followedPublishers.length} publisher{followedPublishers.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <Link 
          href="/publishers" 
          className="text-xs text-primary hover:underline font-medium"
        >
          Manage
        </Link>
      </div>

      {/* Publishers List */}
      <div className="space-y-2">
        {followedPublishers.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-xl p-4 text-sm text-gray-500 text-center">
            You are not following any publishers yet. Click "Follow more publishers" to start.
          </div>
        ) : (
          followedPublishers.map((publisher, idx) => (
            <motion.div
              key={publisher.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <Link
                href={`/publishers/${publisher.id}`}
                className="group block p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
              >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy-900 to-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-xs font-bold">
                    {getInitials(publisher.name)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name and Arrow */}
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                      {publisher.name}
                    </h4>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      <span className="font-medium">{publisher.activeTenders}</span>
                      <span className="text-gray-500">active</span>
                    </div>
                    {publisher.newThisWeek > 0 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span className="font-medium">{publisher.newThisWeek} new</span>
                      </div>
                    )}
                  </div>

                  {/* Last Posted */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>Posted {publisher.lastPosted}</span>
                  </div>
                </div>
              </div>

              {/* New Badge */}
              {publisher.newThisWeek > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <Badge className="bg-green-50 text-green-700 border-0 text-xs">
                    {publisher.newThisWeek} new tender{publisher.newThisWeek > 1 ? 's' : ''} this week
                  </Badge>
                </div>
              )}
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {/* Follow More CTA */}
      <Link
        href="/publishers"
        className="block w-full p-3 text-center text-sm font-medium text-primary border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-blue-50 transition-all"
      >
        + Follow more publishers
      </Link>

      {/* Quick Stats */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold text-gray-900">This Week</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {totalNew}
            </div>
            <div className="text-xs text-gray-600">New tenders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {totalActive}
            </div>
            <div className="text-xs text-gray-600">Total active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
