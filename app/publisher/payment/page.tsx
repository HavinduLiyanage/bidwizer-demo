"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, Shield, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";

const gatewaySteps = [
  "Review subscription summary",
  "Confirm billing details",
  "Connect to payment gateway",
  "Receive invoice via email"
];

export default function PublisherPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") === "monthly" ? "Monthly" : "Annual";

  return (
    <>
      <SiteHeader variant="page" />
      <main className="min-h-screen bg-[#F9FAFB] py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <Link
            href="/publisher/plan-selection"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to plan selection
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Private Publisher • {plan} plan</p>
                <h1 className="text-2xl font-bold text-gray-900">Connect to payment gateway</h1>
              </div>
            </div>
            <p className="text-gray-600 mb-8">
              We use a secure third-party provider to process payments. Once you proceed, you'll be
              redirected to confirm your billing details and finalize the subscription. This step takes
              less than 2 minutes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-2xl p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h2>
                <ul className="space-y-3 text-sm text-gray-600">
                  {gatewaySteps.map((step, idx) => (
                    <li key={step} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>
                        <span className="font-semibold text-gray-800 mr-1">Step {idx + 1}:</span>
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing summary</h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Selected plan</span>
                    <span className="font-semibold text-gray-900">{plan}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Billing cadence</span>
                    <span className="font-semibold text-gray-900">
                      {plan === "Annual" ? "12-month subscription" : "Monthly subscription"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated first payment</span>
                    <span className="font-semibold text-gray-900">To be confirmed on gateway</span>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs text-gray-500">
                  <Shield className="h-4 w-4 text-primary" />
                  Payments are encrypted and processed via a PCI-compliant provider.
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push("/publisher/plan-selection")}
                variant="outline"
                className="flex-1"
              >
                Choose another plan
              </Button>
              <Button
                className="flex-1 h-12 text-base font-semibold"
                onClick={() => router.push(`/publisher/gateway?plan=${plan}`)}
              >
                Proceed to secure checkout
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
