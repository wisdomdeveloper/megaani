import type { Course, CourseFilters } from "@/types/course"

// Mock course data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Developer Course",
    description:
      "Learn React from scratch and build amazing web applications with modern React features including hooks, context, and more.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 89.99,
    originalPrice: 199.99,
    category: "development",
    level: "intermediate",
    duration: "40 hours",
    purchases: 15420,
    rating: 4.8,
    totalRatings: 2341,
    instructor: {
      id: "inst1",
      name: "John Smith",
      title: "Senior React Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "10+ years of experience in web development",
      rating: 4.9,
      students: 50000,
      courses: 12,
    },
    lessons: [
      { id: "1", title: "Introduction to React", duration: "15 min" },
      { id: "2", title: "Setting up Development Environment", duration: "20 min" },
      { id: "3", title: "Your First React Component", duration: "25 min" },
    ],
    reviews: [
      {
        id: "1",
        userId: "user1",
        userName: "Alice Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Excellent course! Very well explained and practical examples.",
        createdAt: "2024-01-15",
      },
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    description:
      "Master digital marketing strategies including SEO, social media marketing, email marketing, and paid advertising.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 79.99,
    category: "marketing",
    level: "beginner",
    duration: "30 hours",
    purchases: 8920,
    rating: 4.6,
    totalRatings: 1205,
    instructor: {
      id: "inst2",
      name: "Sarah Wilson",
      title: "Digital Marketing Expert",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Marketing consultant with 8+ years experience",
      rating: 4.7,
      students: 25000,
      courses: 8,
    },
    createdAt: "2024-01-05",
    updatedAt: "2024-01-20",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn the principles of user interface and user experience design. Create beautiful and functional designs.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 0,
    category: "design",
    level: "beginner",
    duration: "25 hours",
    purchases: 12340,
    rating: 4.7,
    totalRatings: 1876,
    instructor: {
      id: "inst3",
      name: "Mike Chen",
      title: "Senior UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Design lead at top tech companies",
      rating: 4.8,
      students: 35000,
      courses: 15,
    },
    createdAt: "2024-01-10",
    updatedAt: "2024-01-25",
  },
  {
    id: "4",
    title: "Business Strategy & Leadership",
    description:
      "Develop essential business strategy and leadership skills to advance your career and grow your business.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 129.99,
    category: "business",
    level: "advanced",
    duration: "35 hours",
    purchases: 5670,
    rating: 4.9,
    totalRatings: 892,
    instructor: {
      id: "inst4",
      name: "David Brown",
      title: "Business Consultant",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Former Fortune 500 executive",
      rating: 4.9,
      students: 18000,
      courses: 6,
    },
    createdAt: "2024-01-12",
    updatedAt: "2024-01-28",
  },
  {
    id: "5",
    title: "Python Programming for Beginners",
    description: "Start your programming journey with Python. Learn syntax, data structures, and build real projects.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 59.99,
    category: "development",
    level: "beginner",
    duration: "45 hours",
    purchases: 18750,
    rating: 4.5,
    totalRatings: 3210,
    instructor: {
      id: "inst5",
      name: "Emma Davis",
      title: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Python developer with 6+ years experience",
      rating: 4.6,
      students: 42000,
      courses: 10,
    },
    createdAt: "2024-01-08",
    updatedAt: "2024-01-22",
  },
  {
    id: "6",
    title: "Photography Masterclass",
    description: "Master the art of photography from composition to post-processing. Suitable for all camera types.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 99.99,
    category: "photography",
    level: "intermediate",
    duration: "28 hours",
    purchases: 7890,
    rating: 4.8,
    totalRatings: 1456,
    instructor: {
      id: "inst6",
      name: "Alex Rodriguez",
      title: "Professional Photographer",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Award-winning photographer and educator",
      rating: 4.9,
      students: 28000,
      courses: 7,
    },
    createdAt: "2024-01-14",
    updatedAt: "2024-01-30",
  },
]

export function getCourses(filters?: CourseFilters): Course[] {
  let filteredCourses = [...mockCourses]

  if (filters) {
    if (filters.query) {
      const query = filters.query.toLowerCase()
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.name.toLowerCase().includes(query),
      )
    }

    if (filters.category) {
      const categories = filters.category.split(",")
      filteredCourses = filteredCourses.filter((course) => categories.includes(course.category))
    }

    if (filters.level) {
      const levels = filters.level.split(",")
      filteredCourses = filteredCourses.filter((course) => levels.includes(course.level))
    }

    if (filters.minPrice !== undefined) {
      filteredCourses = filteredCourses.filter((course) => course.price >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      filteredCourses = filteredCourses.filter((course) => course.price <= filters.maxPrice!)
    }
  }

  return filteredCourses
}

export function getCourseById(id: string): Course | undefined {
  return mockCourses.find((course) => course.id === id)
}

export function getFeaturedCourses(): Course[] {
  return mockCourses.filter((course) => course.rating >= 4.7).slice(0, 8)
}

export function getInstructorCourses(instructorId: string): Course[] {
  return mockCourses.filter((course) => course.instructor.id === instructorId)
}
