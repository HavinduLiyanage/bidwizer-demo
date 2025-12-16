"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Loader2, ArrowLeftCircle } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function PublisherGatewayPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main className="min-h-screen bg-[#F3F5F9] flex items-center">
        <Suspense fallback={<GatewayPageFallback />}>
          <GatewayContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

function GatewayContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "Annual";

  return (
    <div className="max-w-xl mx-auto px-6 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-xl"
      >
        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connecting to gateway</h1>
        <p className="text-gray-600 mb-6">
          You selected the <span className="font-semibold text-gray-900">{plan}</span> plan. Sit tight while we
          securely redirect you to the payment provider.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
          <Loader2 className="h-4 w-4 animate-spin" />
          Establishing secure session...
        </div>
        <div className="flex flex-col gap-3">
          <Button
            className="h-12 text-base font-semibold flex items-center justify-center gap-2"
            onClick={() => router.push("/login?registered=true")}
          >
            Continue once payment completes
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-semibold flex items-center justify-center gap-2"
            onClick={() => router.push("/publisher/plan-selection")}
          >
            <ArrowLeftCircle className="h-4 w-4" />
            Cancel and return
          </Button>
        </div>
        <div className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-2">
          <Lock className="h-4 w-4" />
          PCI-compliant ƒ?› SSL encrypted ƒ?› Hosted checkout
        </div>
      </motion.div>
    </div>
  );
}

function GatewayPageFallback() {
  return (
    <div className="max-w-xl mx-auto px-6 w-full">
      <div className="h-[28rem] rounded-3xl border border-dashed border-gray-200 bg-white/40 animate-pulse" />
    </div>
  );
}
