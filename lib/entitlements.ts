/**
 * Entitlements and plan management
 */

export type PlanTier = "FREE" | "STANDARD" | "PREMIUM";

export interface PlanFeatures {
  name: string;
  price: number;
  monthlyAIQuestions: number;
  seats?: number;
  features: string[];
  popular?: boolean;
  publisherFollowLimit: number;
}

export const PLANS: Record<PlanTier, PlanFeatures> = {
  FREE: {
    name: "FREEMIUM / TRIAL",
    price: 0,
    monthlyAIQuestions: 2, // Per tender as per UI? Or total? UI says "AI Chat: 2 per tender". We'll map to per-tender logic or global limit later.
    seats: 1,
    publisherFollowLimit: 0,
    features: [
      "View tenders",
      "View tender details",
      "Workspace preview: first 3 pages",
      "AI Brief: 1 per tender",
      "AI Chat: 2 per tender",
      "Email support"
    ],
  },
  STANDARD: {
    name: "STANDARD",
    price: 6000,
    monthlyAIQuestions: 120,
    seats: 1,
    publisherFollowLimit: 5,
    features: [
      "Full access to all tender documents",
      "120 AI Q&A interactions per month",
      "AI Brief: Unlimited",
      "Cover Letter generator",
      "Follow up to 5 publishers with email alerts",
      "Email + in-app chat support"
    ],
  },
  PREMIUM: {
    name: "PREMIUM",
    price: 10000,
    monthlyAIQuestions: 300,
    seats: 2,
    publisherFollowLimit: 10,
    popular: true,
    features: [
      "Full access to all tender documents",
      "300 AI Q&A interactions per month",
      "AI Brief: Unlimited",
      "Folder Chat (Beta)",
      "Collaboration (2 seats)",
      "Follow up to 10 publishers with email alerts",
      "Priority support (24-hour response)",
      "Billing & plan management"
    ],
  }
};

export function getPlanFeatures(tier: PlanTier): PlanFeatures {
  return PLANS[tier];
}
