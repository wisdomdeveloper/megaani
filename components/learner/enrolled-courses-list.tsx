import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Play, Search, Filter } from "lucide-react"

export function EnrolledCoursesList() {
  // Mock data - replace with real API calls
  const courses = [
    {
      id: "1",
      title: "Complete React Developer Course",
      instructor: "John Smith",
      progress: 75,
      thumbnail: "/placeholder.svg?height=120&width=200",
      enrolledDate: "2024-01-15",
      lastWatched: "2024-01-28",
      category: "Development",
      status: "in-progress",
    },
    {
      id: "2",
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      progress: 45,
      thumbnail: "/placeholder.svg?height=120&width=200",
      enrolledDate: "2024-01-10",
      lastWatched: "2024-01-26",
      category: "Design",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Python Programming for Beginners",
      instructor: "Emma Davis",
      progress: 100,
      thumbnail: "/placeholder.svg?height=120&width=200",
      enrolledDate: "2024-01-05",
      lastWatched: "2024-01-25",
      category: "Development",
      status: "completed",
    },
    {
      id: "4",
      title: "Digital Marketing Masterclass",
      instructor: "Sarah Wilson",
      progress: 20,
      thumbnail: "/placeholder.svg?height=120&width=200",
      enrolledDate: "2024-01-20",
      lastWatched: "2024-01-22",
      category: "Marketing",
      status: "in-progress",
    },
  ]

  const inProgressCourses = courses.filter((course) => course.status === "in-progress")
  const completedCourses = courses.filter((course) => course.status === "completed")

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search your courses..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses ({courses.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inProgressCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{course.category}</Badge>
              {course.status === "completed" && <Badge variant="default">Completed</Badge>}
            </div>
            <h3 className="font-semibold line-clamp-2">{course.title}</h3>
            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Enrolled: {new Date(course.enrolledDate).toLocaleDateString()}</span>
            <span>Last watched: {new Date(course.lastWatched).toLocaleDateString()}</span>
          </div>

          <Button asChild className="w-full">
            <Link href={`/course/${course.id}/learn`}>
              <Play className="mr-2 h-4 w-4" />
              {course.status === "completed" ? "Review Course" : "Continue Learning"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
