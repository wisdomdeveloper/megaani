import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Eye, Edit, Trash2, Users, DollarSign, Target } from "lucide-react"

export function InstructorCoursesList() {
  // Mock data - replace with real API calls
  const courses = [
    {
      id: "1",
      title: "Complete React Developer Course",
      status: "published",
      students: 1542,
      revenue: 15420.5,
      rating: 4.8,
      progress: 100,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      status: "draft",
      students: 0,
      revenue: 0,
      rating: 0,
      progress: 75,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-20",
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      status: "published",
      students: 892,
      revenue: 8920.0,
      rating: 4.6,
      progress: 100,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-18",
    },
    {
      id: "4",
      title: "Full Stack Web Development",
      status: "review",
      students: 0,
      revenue: 0,
      rating: 0,
      progress: 100,
      createdAt: "2024-01-12",
      updatedAt: "2024-01-22",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Courses</CardTitle>
        <CardDescription>Manage all your courses in one place</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{course.title}</div>
                    {course.status === "draft" && (
                      <div className="space-y-1">
                        <Progress value={course.progress} className="h-1 w-24" />
                        <div className="text-xs text-muted-foreground">{course.progress}% complete</div>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      course.status === "published" ? "default" : course.status === "draft" ? "secondary" : "outline"
                    }
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                    {course.students}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-3 w-3 text-muted-foreground" />${course.revenue.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {course.rating > 0 ? (
                    <div className="flex items-center">
                      <span>⭐ {course.rating}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/course/${course.id}`}>
                        <Eye className="h-3 w-3" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/instructor/courses/${course.id}/edit`}>
                        <Edit className="h-3 w-3" />
                      </Link>
                    </Button>
                    {course.status === "published" && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/instructor/courses/${course.id}/advertise`}>
                          <Target className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
