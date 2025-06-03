export interface Instructor {
  id: string
  name: string
  title: string
  avatar?: string
  bio?: string
  rating?: number
  students?: number
  courses?: number
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
}

export interface Lesson {
  id: string
  title: string
  duration: string
  videoUrl?: string
  isCompleted?: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnail?: string
  price: number
  originalPrice?: number
  category: string
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  purchases: number // Changed from enrollments
  rating: number
  totalRatings: number
  instructor: Instructor
  lessons?: Lesson[]
  reviews?: Review[]
  isPurchased?: boolean // Changed from isEnrolled
  progress?: number
  createdAt: string
  updatedAt: string
}

export interface CourseFilters {
  query?: string
  category?: string
  level?: string
  minPrice?: number
  maxPrice?: number
}
