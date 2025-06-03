import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Instructor } from "@/types/course"
import { Star, Users, BookOpen } from "lucide-react"

interface CourseInstructorProps {
  instructor: Instructor
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructor</CardTitle>
        <CardDescription>Learn more about your instructor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <img
            src={instructor.avatar || "/placeholder.svg?height=80&width=80"}
            alt={instructor.name}
            className="h-20 w-20 rounded-full"
          />
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{instructor.name}</h3>
              <p className="text-muted-foreground">{instructor.title}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {instructor.rating && (
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{instructor.rating}</span>
                  <span className="text-muted-foreground ml-1">Instructor Rating</span>
                </div>
              )}
              {instructor.students && (
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{instructor.students.toLocaleString()} Students</span>
                </div>
              )}
              {instructor.courses && (
                <div className="flex items-center">
                  <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{instructor.courses} Courses</span>
                </div>
              )}
            </div>

            {instructor.bio && <p className="text-sm text-muted-foreground leading-relaxed">{instructor.bio}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
