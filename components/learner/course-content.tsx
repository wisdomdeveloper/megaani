import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/types/course"
import { Play, Lock, CheckCircle } from "lucide-react"

interface CourseContentProps {
  course: Course
}

export function CourseContent({ course }: CourseContentProps) {
  // Mock lessons data
  const sections = [
    {
      id: "1",
      title: "Getting Started",
      lessons: [
        { id: "1", title: "Introduction to the Course", duration: "5 min", isPreview: true, isCompleted: false },
        {
          id: "2",
          title: "Setting up Development Environment",
          duration: "15 min",
          isPreview: false,
          isCompleted: false,
        },
        { id: "3", title: "Course Resources and Materials", duration: "8 min", isPreview: true, isCompleted: false },
      ],
    },
    {
      id: "2",
      title: "Core Concepts",
      lessons: [
        { id: "4", title: "Understanding the Fundamentals", duration: "25 min", isPreview: false, isCompleted: false },
        { id: "5", title: "Practical Examples", duration: "30 min", isPreview: false, isCompleted: false },
        {
          id: "6",
          title: "Common Patterns and Best Practices",
          duration: "20 min",
          isPreview: false,
          isCompleted: false,
        },
      ],
    },
    {
      id: "3",
      title: "Advanced Topics",
      lessons: [
        { id: "7", title: "Advanced Techniques", duration: "35 min", isPreview: false, isCompleted: false },
        { id: "8", title: "Real-world Projects", duration: "45 min", isPreview: false, isCompleted: false },
        { id: "9", title: "Performance Optimization", duration: "28 min", isPreview: false, isCompleted: false },
      ],
    },
  ]

  const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0)
  const totalDuration = "8 hours 31 minutes" // This would be calculated from actual lesson durations

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
        <CardDescription>
          {sections.length} sections • {totalLessons} lessons • {totalDuration} total length
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={["1"]} className="w-full">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center justify-between w-full mr-4">
                  <span className="font-medium">{section.title}</span>
                  <span className="text-sm text-muted-foreground">{section.lessons.length} lessons</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : lesson.isPreview ? (
                            <Play className="h-4 w-4 text-primary" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{lesson.title}</span>
                            {lesson.isPreview && (
                              <Badge variant="outline" className="text-xs">
                                Preview
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
