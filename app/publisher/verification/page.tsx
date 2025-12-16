"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Clock } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function PublisherVerificationPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main className="min-h-screen bg-[#F9FAFB] flex items-center">
        <div className="max-w-xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-lg p-10 space-y-4"
          >
            <ShieldCheck className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Account under review</h1>
            <p className="text-gray-600">
              Thanks for registering with BidWizer. Government publishers require manual verification. Our
              team has received your request and will activate your access within 1 business day.
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 text-sm text-gray-600">
              <Clock className="h-5 w-5 text-primary" />
              <span>
                In the meantime, you can browse public tenders or explore the platform in read-only mode.
              </span>
            </div>
            <Button asChild className="w-full h-12 text-base font-semibold">
              <Link href="/">Return to homepage</Link>
            </Button>
            <p className="text-xs text-gray-500">
              Need to accelerate verification? Email support@bidwizer.com with your organization document.
            </p>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
