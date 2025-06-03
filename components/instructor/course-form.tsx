"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, Plus } from "lucide-react"

export function CourseForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: null as File | null,
  })
  const [lessons, setLessons] = useState([{ id: "1", title: "", duration: "", videoFile: null as File | null }])

  const categories = [
    { value: "development", label: "Development" },
    { value: "business", label: "Business" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "photography", label: "Photography" },
    { value: "music", label: "Music" },
  ]

  const levels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (file: File | null, field: string) => {
    setCourseData((prev) => ({ ...prev, [field]: file }))
  }

  const addLesson = () => {
    setLessons((prev) => [...prev, { id: Date.now().toString(), title: "", duration: "", videoFile: null }])
  }

  const removeLesson = (id: string) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id))
  }

  const updateLesson = (id: string, field: string, value: string | File | null) => {
    setLessons((prev) => prev.map((lesson) => (lesson.id === id ? { ...lesson, [field]: value } : lesson)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call - replace with real implementation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Course created successfully!",
        description: "Your course has been saved as a draft and is ready for review.",
      })

      // Reset form or redirect
    } catch (error) {
      toast({
        title: "Error creating course",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const completionPercentage = () => {
    const fields = [courseData.title, courseData.description, courseData.category, courseData.level, courseData.price]
    const completedFields = fields.filter(Boolean).length
    const lessonsCompleted = lessons.filter((lesson) => lesson.title && lesson.duration).length
    return Math.round(((completedFields + lessonsCompleted) / (fields.length + lessons.length)) * 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Complete all sections to publish your course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Course completion</span>
              <span className="text-sm text-muted-foreground">{completionPercentage()}%</span>
            </div>
            <Progress value={completionPercentage()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the basic details about your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={courseData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn"
                    value={courseData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={courseData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select value={courseData.level} onValueChange={(value) => handleInputChange("level", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Course Thumbnail</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                        <span className="text-sm font-medium text-primary">Upload a file</span>
                        <span className="text-sm text-muted-foreground"> or drag and drop</span>
                      </Label>
                      <Input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null, "thumbnail")}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  {courseData.thumbnail && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{courseData.thumbnail.name}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileChange(null, "thumbnail")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>Add lessons and organize your course content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Lesson {index + 1}</h4>
                      {lessons.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeLesson(lesson.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Lesson Title</Label>
                        <Input
                          placeholder="Enter lesson title"
                          value={lesson.title}
                          onChange={(e) => updateLesson(lesson.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input
                          placeholder="e.g., 15 min"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(lesson.id, "duration", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Video File</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <div className="mt-2">
                          <Label htmlFor={`video-${lesson.id}`} className="cursor-pointer">
                            <span className="text-sm font-medium text-primary">Upload video</span>
                          </Label>
                          <Input
                            id={`video-${lesson.id}`}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => updateLesson(lesson.id, "videoFile", e.target.files?.[0] || null)}
                          />
                        </div>
                      </div>
                      {lesson.videoFile && <Badge variant="outline">{lesson.videoFile.name}</Badge>}
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addLesson} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lesson
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Publishing</CardTitle>
                <CardDescription>Set your course price and publish settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Course Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={courseData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    min="0"
                    step="0.01"
                  />
                  <p className="text-sm text-muted-foreground">Set to 0 for a free course</p>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Creating..." : "Save as Draft"}
                  </Button>
                  <Button type="button" variant="outline" disabled={completionPercentage() < 100} className="flex-1">
                    Submit for Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
