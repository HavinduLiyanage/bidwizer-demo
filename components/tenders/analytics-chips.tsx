"use client";

import { Building2, Briefcase, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Tender } from "@/lib/mock-data";

interface AnalyticsChipsProps {
  selectedSector: Tender["sector"] | null;
  onSelect: (sector: Tender["sector"] | null) => void;
}

const sectorConfig: Array<{
  key: Tender["sector"];
  label: string;
  icon: typeof Building2;
  baseColor: string;
}> = [
  {
    key: "Government",
    label: "Government sector",
    icon: Building2,
    baseColor: "bg-green-50 text-green-700 border-green-200"
  },
  {
    key: "Private",
    label: "Private sector",
    icon: Briefcase,
    baseColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    key: "International",
    label: "World bank/ADB tenders",
    icon: Globe2,
    baseColor: "bg-purple-50 text-purple-700 border-purple-200"
  }
];

export function AnalyticsChips({ selectedSector, onSelect }: AnalyticsChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {sectorConfig.map((sector, idx) => {
        const isActive = selectedSector === sector.key;
        return (
          <motion.button
            key={sector.key}
            type="button"
            onClick={() => onSelect(isActive ? null : sector.key)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium transition-all hover:shadow-md ${
              isActive
                ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                : `${sector.baseColor} hover:bg-white hover:text-gray-900`
            }`}
          >
            <sector.icon className="h-4 w-4" />
            <span>{sector.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
