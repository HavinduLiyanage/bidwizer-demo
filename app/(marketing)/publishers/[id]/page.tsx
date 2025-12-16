"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Users, Mail, Globe2, Clock, MapPin, BadgeCheck, Filter } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { directoryPublishers } from "@/lib/publisher-directory";
import { mockTenders } from "@/lib/mock-data";
import { motion } from "framer-motion";

interface PublisherPageProps {
  params: {
    id: string;
  };
}

export default function PublisherDetailPage({ params }: PublisherPageProps) {
  const publisher = directoryPublishers.find((pub) => pub.id === params.id);
  if (!publisher) {
    notFound();
  }

  const publishedTenders = mockTenders.filter(
    (tender) => tender.publisher.name === publisher.name
  );

  const heroStats = [
    { label: "Active tenders", value: publisher.activeTenders },
    { label: "Followers", value: publisher.followers },
    { label: "New this week", value: publisher.newThisWeek }
  ];

  return (
    <>
      <SiteHeader variant="page" />
      <main className="min-h-screen bg-[#F9FAFB]">
        <section className="max-w-[1200px] mx-auto px-6 py-10">
          <Link
            href="/tenders"
            className="inline-flex items-center text-sm text-primary mb-6 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to tenders
          </Link>

          {/* Hero */}
          <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-100 rounded-3xl p-8 mb-8 shadow-lg">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold text-gray-900">{publisher.name}</h1>
                      {publisher.verified && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 inline-flex items-center gap-1">
                          <BadgeCheck className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2 max-w-2xl">{publisher.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        {publisher.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Filter className="h-4 w-4 text-primary" />
                        {publisher.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Globe2 className="h-4 w-4 text-primary" />
                        {publisher.sector}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2 rounded-xl border border-gray-900 text-gray-900 font-semibold hover:bg-white/60 transition">
                    Follow publisher
                  </button>
                  <button className="px-5 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
                    Contact team
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/70 bg-white/70 backdrop-blur-sm p-5 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Open tenders</h2>
                <span className="text-sm text-gray-500">
                  {publishedTenders.length} listing{publishedTenders.length === 1 ? "" : "s"}
                </span>
              </div>

              {publishedTenders.length === 0 ? (
                <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-500">
                  This publisher has no public tenders right now.
                </div>
              ) : (
                <div className="space-y-5">
                  {publishedTenders.map((tender, idx) => (
                    <motion.div
                      key={tender.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase text-primary font-semibold mb-1">
                            {tender.category}
                          </p>
                          <h3 className="text-xl font-semibold text-gray-900">{tender.title}</h3>
                          <p className="text-sm text-gray-600 mt-2">{tender.description}</p>
                        </div>
                        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                          {tender.status}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-500">
                        <p>Budget: <span className="text-gray-900 font-medium">{tender.budget || "N/A"}</span></p>
                        <p>Deadline: <span className="text-gray-900 font-medium">{new Date(tender.deadline).toLocaleDateString()}</span></p>
                        <p>Type: <span className="text-gray-900 font-medium">{tender.type}</span></p>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <Link
                          href={`/tenders/${tender.id}`}
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          View tender
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Publisher details</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    {publisher.followers} followers
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    alerts@bidwizer.com
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-primary" />
                    bidwizer.com/publishers/{publisher.id}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Last posted {publisher.lastPosted}
                  </li>
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
