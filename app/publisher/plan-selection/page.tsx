"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Calendar, CreditCard, Shield } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    description: "Great for testing BidWizer with lower commitment.",
    cadence: "Billed monthly",
    perks: [
      "Unlimited tender publishing",
      "Workspace & analytics",
      "Email alerts to followers"
    ]
  },
  {
    id: "annual",
    name: "Annual",
    description: "Best value with priority support and onboarding.",
    cadence: "Billed annually",
    perks: [
      "Everything in Monthly",
      "Dedicated customer success",
      "Custom branding options"
    ],
    badge: "Recommended"
  }
];

export default function PublisherPlanSelectionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinue = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push(`/publisher/payment?plan=${selectedPlan}`);
  };

  return (
    <>
      <SiteHeader variant="page" />
      <main className="min-h-screen bg-[#F9FAFB] py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-3">
            <motion.p
              className="text-sm font-semibold text-primary uppercase tracking-wide"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Private Publisher
            </motion.p>
            <motion.h1
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Choose how you want to subscribe
            </motion.h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a billing cadence. You can switch or cancel anytime. Prices will be confirmed
              on the next step before connecting to the payment gateway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                whileHover={{ translateY: -2 }}
                className={`text-left p-6 rounded-2xl border transition shadow-sm ${
                  selectedPlan === plan.id
                    ? "border-primary bg-white ring-4 ring-primary/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-semibold text-gray-900">{plan.name}</h2>
                  {plan.badge && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3">{plan.description}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                  <Calendar className="h-4 w-4" />
                  {plan.cadence}
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-2xl p-6 shadow-sm gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-primary" />
              Secure checkout via accredited payment gateway. You'll confirm the final amount before paying.
            </div>
            <Button
              onClick={handleContinue}
              disabled={isProcessing}
              className="px-6 h-12 text-base font-semibold"
            >
              {isProcessing ? "Preparing checkout..." : "Continue to payment"}
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
