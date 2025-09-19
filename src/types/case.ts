// types/case.ts
export interface DonationCase {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  targetAmount: number;
  currentAmount: number;
  daysLeft: number;
  images: string[];
  beneficiaryName: string;
  verified: boolean;
  urgency: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
