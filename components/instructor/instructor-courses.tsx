import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { PlusCircle, Eye, Users, DollarSign, Target } from "lucide-react"

export function InstructorCourses() {
  // Mock data - replace with real API calls
  const recentCourses = [
    {
      id: "1",
      title: "Complete React Developer Course",
      status: "published",
      students: 1542,
      revenue: 15420.5,
      rating: 4.8,
      progress: 100,
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      status: "draft",
      students: 0,
      revenue: 0,
      rating: 0,
      progress: 75,
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      status: "published",
      students: 892,
      revenue: 8920.0,
      rating: 4.6,
      progress: 100,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Manage and track your course performance</CardDescription>
          </div>
          <Button asChild>
            <Link href="/instructor/courses/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Course
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCourses.map((course) => (
            <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{course.title}</h3>
                  <Badge variant={course.status === "published" ? "default" : "secondary"}>{course.status}</Badge>
                </div>
                {course.status === "draft" && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Course completion</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-3 w-3" />${course.revenue.toLocaleString()}
                  </div>
                  {course.rating > 0 && (
                    <div className="flex items-center">
                      <span>⭐ {course.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/course/${course.id}`}>
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/instructor/courses/${course.id}/edit`}>Edit</Link>
                </Button>
                {course.status === "published" && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/instructor/courses/${course.id}/advertise`}>
                      <Target className="mr-1 h-3 w-3" />
                      Advertise
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" asChild>
            <Link href="/instructor/courses">View All Courses</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
