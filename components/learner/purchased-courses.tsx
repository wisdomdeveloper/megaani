import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Play, BookOpen } from "lucide-react"

export function PurchasedCourses() {
  // Mock data - replace with real API calls
  const recentCourses = [
    {
      id: "1",
      title: "Complete React Developer Course",
      instructor: "John Smith",
      progress: 75,
      thumbnail: "/placeholder.svg?height=100&width=150",
      lastWatched: "2024-01-28",
      nextLesson: "React Hooks Deep Dive",
    },
    {
      id: "2",
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      progress: 45,
      thumbnail: "/placeholder.svg?height=100&width=150",
      lastWatched: "2024-01-26",
      nextLesson: "Color Theory and Psychology",
    },
    {
      id: "3",
      title: "Python Programming for Beginners",
      instructor: "Emma Davis",
      progress: 100,
      thumbnail: "/placeholder.svg?height=100&width=150",
      lastWatched: "2024-01-25",
      nextLesson: "Course Completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off in your purchased courses</CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard/courses">
              <BookOpen className="mr-2 h-4 w-4" />
              View All
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCourses.map((course) => (
            <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="h-16 w-24 rounded object-cover"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium line-clamp-1">{course.title}</h3>
                  {course.progress === 100 && <Badge variant="default">Completed</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">Next: {course.nextLesson}</p>
              </div>
              <Button size="sm" asChild> 
                <Link href={`dashboard/courses/${course.id}/`}>
                  <Play className="mr-1 h-3 w-3" />
                  {course.progress === 100 ? "Review" : "Continue"}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
