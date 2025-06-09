import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Save,
  Eye,
  Upload,
  Plus,
  GripVertical,
  Play,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Video,
} from "lucide-react"
import { MainNav } from "@/components/common/main-nav"
import  { Footer } from "@/components/common/footer"
export default function EditCoursePage() {
  // Mock data - replace with real API calls
  const courseData = {
    id: "1",
    title: "Complete React Developer Course",
    description:
      "Learn React from scratch and build amazing web applications. This comprehensive course covers everything from basic concepts to advanced patterns.",
    category: "Development",
    subcategory: "Web Development",
    language: "English",
    level: "Beginner",
    price: 49.99,
    thumbnail: "/placeholder.svg?height=300&width=500",
    status: "published",
    requirements: ["Basic HTML and CSS knowledge", "JavaScript fundamentals", "Computer with internet connection"],
    learningObjectives: [
      "Build modern React applications",
      "Understand React hooks and state management",
      "Create responsive user interfaces",
      "Deploy React apps to production",
    ],
    curriculum: [
      {
        id: "section-1",
        title: "Getting Started with React",
        lessons: [
          { id: "lesson-1", title: "Introduction to React", type: "video", duration: "10:30", isPublished: true },
          {
            id: "lesson-2",
            title: "Setting up Development Environment",
            type: "video",
            duration: "15:45",
            isPublished: true,
          },
          { id: "lesson-3", title: "Your First React Component", type: "video", duration: "12:20", isPublished: true },
          { id: "lesson-4", title: "Quiz: React Basics", type: "quiz", duration: "5:00", isPublished: true },
        ],
      },
      {
        id: "section-2",
        title: "React Components and Props",
        lessons: [
          { id: "lesson-5", title: "Understanding Components", type: "video", duration: "18:15", isPublished: true },
          { id: "lesson-6", title: "Props and Data Flow", type: "video", duration: "14:30", isPublished: false },
          { id: "lesson-7", title: "Component Composition", type: "video", duration: "16:45", isPublished: false },
        ],
      },
    ],
  }

  return (
  <div>
    <MainNav/>
      <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Edit Course</h1>
          <p className="text-muted-foreground">Update your course content and settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" defaultValue={courseData.title} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={4} defaultValue={courseData.description} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select defaultValue={courseData.category}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Level</Label>
                      <Select defaultValue={courseData.level}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue={courseData.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courseData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input defaultValue={objective} />
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Objective
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Thumbnail</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video w-full overflow-hidden rounded border-2 border-dashed border-muted-foreground/25">
                    <img
                      src={courseData.thumbnail || "/placeholder.svg"}
                      alt="Course thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Thumbnail
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Upload a high-quality image (1280x720 recommended). JPG or PNG format.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courseData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input defaultValue={requirement} />
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Requirement
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Course Curriculum</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>

          <div className="space-y-4">
            {courseData.curriculum.map((section, sectionIndex) => (
              <Card key={section.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-lg">
                        Section {sectionIndex + 1}: {section.title}
                      </CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Section
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Section
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center space-x-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          {lesson.type === "video" ? (
                            <Video className="h-4 w-4 text-blue-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-green-500" />
                          )}
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={lesson.isPublished ? "default" : "secondary"}>
                            {lesson.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Lesson
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lesson
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Course Price (USD)</Label>
                    <Input id="price" type="number" defaultValue={courseData.price} step="0.01" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="free-course" />
                    <Label htmlFor="free-course">Make this course free</Label>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Promotional Pricing</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Discount price" type="number" step="0.01" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Revenue Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Course Price:</span>
                        <span>${courseData.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee (3%):</span>
                        <span>-${(courseData.price * 0.03).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Processing (2.9%):</span>
                        <span>-${(courseData.price * 0.029).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Your Earnings:</span>
                        <span>${(courseData.price * 0.941).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Status</Label>
                    <p className="text-sm text-muted-foreground">Control the visibility of your course</p>
                  </div>
                  <Select defaultValue={courseData.status}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Comments</Label>
                    <p className="text-sm text-muted-foreground">Let students comment on lessons</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Q&A</Label>
                    <p className="text-sm text-muted-foreground">Allow students to ask questions</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Certificate</Label>
                    <p className="text-sm text-muted-foreground">Issue certificates upon completion</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Enroll in Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically enroll existing students in new content
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">Total Enrollments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Completion Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">$62,500</div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Analytics chart would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    <Footer/>
  </div>
  )
}
