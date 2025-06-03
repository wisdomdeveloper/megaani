export interface Advertisement {
  id: string
  courseId: string
  instructorId: string
  title: string
  description: string
  targetAudience: string[]
  budget: number
  duration: number // in days
  status: "pending" | "active" | "paused" | "completed" | "rejected"
  impressions: number
  clicks: number
  conversions: number
  costPerClick: number
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface AdCampaignStats {
  totalSpent: number
  totalImpressions: number
  totalClicks: number
  totalConversions: number
  averageCTR: number
  averageConversionRate: number
  costPerConversion: number
}
