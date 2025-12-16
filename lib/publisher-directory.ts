import type { Publisher } from "./mock-data";

export type Sector = "Government" | "Private" | "International";

export const FOLLOWED_PUBLISHERS_STORAGE_KEY = "bidwizer_followed_publishers";
export const FOLLOWED_PUBLISHERS_EVENT = "followed_publishers_updated";
export const DEFAULT_FOLLOWED_PUBLISHER_IDS = ["1", "2", "3", "4"];

export interface DirectoryPublisher extends Publisher {
  sector: Sector;
  category: string;
  location: string;
  activeTenders: number;
  followers: number;
  description: string;
  verified?: boolean;
  newThisWeek: number;
  lastPosted: string;
}

export const directoryPublishers: DirectoryPublisher[] = [
  {
    id: "1",
    name: "Ministry of Construction",
    logo: "https://ui-avatars.com/api/?name=Ministry+of+Construction&background=2563EB&color=fff",
    sector: "Government",
    category: "Infrastructure",
    location: "Colombo, Sri Lanka",
    activeTenders: 8,
    followers: 420,
    description: "National level construction and government facilities projects.",
    verified: true,
    newThisWeek: 2,
    lastPosted: "2 days ago"
  },
  {
    id: "2",
    name: "Department of Health",
    logo: "https://ui-avatars.com/api/?name=Department+of+Health&background=10B981&color=fff",
    sector: "Government",
    category: "Healthcare",
    location: "Kandy, Sri Lanka",
    activeTenders: 5,
    followers: 360,
    description: "Hospital infrastructure, medical equipment and healthcare programs.",
    newThisWeek: 1,
    lastPosted: "5 days ago"
  },
  {
    id: "3",
    name: "Transport Authority",
    logo: "https://ui-avatars.com/api/?name=Transport+Authority&background=F59E0B&color=fff",
    sector: "Government",
    category: "Transportation",
    location: "Colombo, Sri Lanka",
    activeTenders: 12,
    followers: 515,
    description: "Road, rail and public transportation modernization projects.",
    verified: true,
    newThisWeek: 3,
    lastPosted: "1 day ago"
  },
  {
    id: "4",
    name: "National Water Board",
    logo: "https://ui-avatars.com/api/?name=National+Water+Board&background=06B6D4&color=fff",
    sector: "Government",
    category: "Utilities",
    location: "Kurunegala, Sri Lanka",
    activeTenders: 3,
    followers: 280,
    description: "Water supply, treatment and maintenance works.",
    newThisWeek: 0,
    lastPosted: "1 week ago"
  },
  {
    id: "5",
    name: "Ministry of Education",
    logo: "https://ui-avatars.com/api/?name=Ministry+of+Education&background=8B5CF6&color=fff",
    sector: "Government",
    category: "Education",
    location: "Jaffna, Sri Lanka",
    activeTenders: 4,
    followers: 310,
    description: "ICT upgrades and nationwide learning infrastructure.",
    newThisWeek: 0,
    lastPosted: "3 days ago"
  },
  {
    id: "6",
    name: "World Bank South Asia",
    logo: "https://ui-avatars.com/api/?name=World+Bank&background=0EA5E9&color=fff",
    sector: "International",
    category: "Infrastructure",
    location: "Colombo, Sri Lanka",
    activeTenders: 14,
    followers: 690,
    description: "Multilateral funding for transport, energy and social infrastructure programs.",
    verified: true,
    newThisWeek: 5,
    lastPosted: "Today"
  },
  {
    id: "7",
    name: "BlueWave Energy",
    logo: "https://ui-avatars.com/api/?name=BlueWave&background=818CF8&color=fff",
    sector: "Private",
    category: "Energy",
    location: "Singapore",
    activeTenders: 6,
    followers: 250,
    description: "Private IPP focusing on regional renewable energy and micro-grid deployments.",
    newThisWeek: 1,
    lastPosted: "4 days ago"
  }
];
