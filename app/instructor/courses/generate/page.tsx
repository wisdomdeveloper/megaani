"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  X,
  Plus,
  Sparkles,
  Wand2,
  RefreshCw,
  Save,
  CheckCircle,
  Info,
  Lightbulb,
  Zap,
  BookOpen,
  Target,
  Tag,
  DollarSign,
  Clock,
  Edit,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"
import { MainNav} from "@/components/common/main-nav"
import { Footer} from "@/components/common/footer"
export default function AIEnhancedCourseForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [activeAiSection, setActiveAiSection] = useState<string | null>(null)
  const [aiSuggestions, setAiSuggestions] = useState<any>({})
  const [showAiPanel, setShowAiPanel] = useState(true)

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: null as File | null,
    keywords: [] as string[],
    learningObjectives: [] as string[],
  })

  const [modules, setModules] = useState([
    {
      id: "1",
      title: "",
      lessons: [{ id: "1-1", title: "", duration: "", description: "" }],
    },
  ])

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

  // AI suggestions for different course aspects
  const aiPrompts = {
    title: "What topic will your course cover?",
    description: "Describe your course idea in a few words:",
    learningObjectives: "What should students learn from your course?",
    modules: "What main topics will your course cover?",
    keywords: "What's the primary subject of your course?",
    pricing: "What level of expertise does your course target?",
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (file: File | null, field: string) => {
    setCourseData((prev) => ({ ...prev, [field]: file }))
  }

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "",
        lessons: [{ id: `${Date.now()}-1`, title: "", duration: "", description: "" }],
      },
    ])
  }

  const removeModule = (id: string) => {
    setModules((prev) => prev.filter((module) => module.id !== id))
  }

  const updateModule = (id: string, field: string, value: string) => {
    setModules((prev) => prev.map((module) => (module.id === id ? { ...module, [field]: value } : module)))
  }

  const addLesson = (moduleId: string) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: [...module.lessons, { id: `${moduleId}-${Date.now()}`, title: "", duration: "", description: "" }],
          }
        }
        return module
      }),
    )
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
          }
        }
        return module
      }),
    )
  }

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, [field]: value } : lesson)),
          }
        }
        return module
      }),
    )
  }

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !courseData.keywords.includes(keyword.trim())) {
      setCourseData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()],
      }))
    }
  }

  const removeKeyword = (keyword: string) => {
    setCourseData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const addLearningObjective = (objective: string) => {
    if (objective.trim() && !courseData.learningObjectives.includes(objective.trim())) {
      setCourseData((prev) => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, objective.trim()],
      }))
    }
  }

  const removeLearningObjective = (objective: string) => {
    setCourseData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((o) => o !== objective),
    }))
  }

  const generateWithAI = async (section: string, prompt = "") => {
    setActiveAiSection(section)
    setAiGenerating(true)

    try {
      // Mock AI generation with delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let generatedContent: any = {}

      switch (section) {
        case "title":
          generatedContent = {
            title: prompt.includes("React")
              ? "Complete React Mastery: From Fundamentals to Advanced Patterns"
              : prompt.includes("JavaScript")
                ? "JavaScript Pro: Modern Development Techniques & Best Practices"
                : "Comprehensive Web Development Bootcamp: Full-Stack Mastery",
          }
          setCourseData((prev) => ({ ...prev, title: generatedContent.title }))
          break

        case "description":
          generatedContent = {
            description: `This comprehensive course will take you from beginner to professional in ${prompt}. You'll learn through hands-on projects, real-world examples, and industry best practices. By the end of this course, you'll have the skills and confidence to build professional applications and advance your career.`,
          }
          setCourseData((prev) => ({ ...prev, description: generatedContent.description }))
          break

        case "learningObjectives":
          generatedContent = {
            objectives: [
              `Master the fundamentals of ${prompt}`,
              "Build real-world projects for your portfolio",
              "Understand advanced concepts and patterns",
              "Implement industry best practices",
              "Troubleshoot common problems efficiently",
            ],
          }
          setCourseData((prev) => ({
            ...prev,
            learningObjectives: generatedContent.objectives,
          }))
          break

        case "modules":
          generatedContent = {
            modules: [
              {
                id: "m1",
                title: `Introduction to ${prompt}`,
                lessons: [
                  {
                    id: "m1-l1",
                    title: "Getting Started",
                    duration: "15:00",
                    description: "Course overview and setup",
                  },
                  {
                    id: "m1-l2",
                    title: "Core Concepts",
                    duration: "25:00",
                    description: "Understanding the fundamentals",
                  },
                  {
                    id: "m1-l3",
                    title: "Your First Project",
                    duration: "30:00",
                    description: "Building a simple application",
                  },
                ],
              },
              {
                id: "m2",
                title: "Intermediate Techniques",
                lessons: [
                  {
                    id: "m2-l1",
                    title: "Advanced Features",
                    duration: "20:00",
                    description: "Exploring powerful capabilities",
                  },
                  {
                    id: "m2-l2",
                    title: "Best Practices",
                    duration: "25:00",
                    description: "Writing clean, maintainable code",
                  },
                  {
                    id: "m2-l3",
                    title: "Common Patterns",
                    duration: "35:00",
                    description: "Implementing proven solutions",
                  },
                ],
              },
              {
                id: "m3",
                title: "Real-World Applications",
                lessons: [
                  {
                    id: "m3-l1",
                    title: "Building a Complete Project",
                    duration: "45:00",
                    description: "End-to-end implementation",
                  },
                  {
                    id: "m3-l2",
                    title: "Performance Optimization",
                    duration: "30:00",
                    description: "Making your application fast",
                  },
                  {
                    id: "m3-l3",
                    title: "Deployment & Scaling",
                    duration: "25:00",
                    description: "Taking your project live",
                  },
                ],
              },
            ],
          }
          setModules(generatedContent.modules)
          break

        case "keywords":
          generatedContent = {
            keywords: [
              prompt.toLowerCase(),
              `learn ${prompt.toLowerCase()}`,
              `${prompt.toLowerCase()} tutorial`,
              `${prompt.toLowerCase()} course`,
              `${prompt.toLowerCase()} for beginners`,
              `advanced ${prompt.toLowerCase()}`,
              `${prompt.toLowerCase()} certification`,
              `${prompt.toLowerCase()} masterclass`,
              `${prompt.toLowerCase()} projects`,
              `professional ${prompt.toLowerCase()}`,
            ],
          }
          setCourseData((prev) => ({ ...prev, keywords: generatedContent.keywords }))
          break

        case "pricing":
          generatedContent = {
            price: prompt === "beginner" ? "49.99" : prompt === "intermediate" ? "79.99" : "99.99",
            priceAnalysis:
              prompt === "beginner"
                ? "Beginner courses typically range from $39-59. This price is competitive while reflecting quality content."
                : prompt === "intermediate"
                  ? "Intermediate courses command $59-89. This price positions your course as premium but accessible."
                  : "Advanced courses range from $89-129. This price reflects the specialized knowledge provided.",
          }
          setCourseData((prev) => ({ ...prev, price: generatedContent.price }))
          setAiSuggestions((prev) => ({ ...prev, priceAnalysis: generatedContent.priceAnalysis }))
          break

        case "full":
          // Generate everything at once
          await generateWithAI("title", courseData.category || "Web Development")
          await generateWithAI("description", courseData.category || "Web Development")
          await generateWithAI("learningObjectives", courseData.category || "Web Development")
          await generateWithAI("modules", courseData.category || "Web Development")
          await generateWithAI("keywords", courseData.category || "Web Development")
          await generateWithAI("pricing", courseData.level || "intermediate")
          break
      }

      toast({
        title: "AI Generation Complete",
        description: `Successfully generated ${section === "full" ? "course content" : section}`,
      })
    } catch (error) {
      toast({
        title: "AI Generation Failed",
        description: "There was an error generating content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAiGenerating(false)
      setActiveAiSection(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Course created successfully!",
        description: "Your course has been saved as a draft and is ready for review.",
      })

      router.push("/instructor/courses")
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
    const modulesCompleted = modules.filter((module) => module.title).length
    const lessonsCompleted = modules.flatMap((module) =>
      module.lessons.filter((lesson) => lesson.title && lesson.duration),
    ).length

    const totalFields = fields.length + modules.length + modules.reduce((acc, module) => acc + module.lessons.length, 0)
    const completed = completedFields + modulesCompleted + lessonsCompleted

    return Math.round((completed / totalFields) * 100)
  }

  return (
  <div>

    <MainNav/>
  <div className="container mx-auto p-6 max-w-7xl">
    <button
    className="px-3 py-1 mb-[2rem] rounded-xl bg-purple-600 hover:bg-purple-700 transition-all"
    onClick={()=> router.back()}> Go Back </button>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create Course with AI</h1>
          <p className="text-muted-foreground">Let AI help you build a professional course in minutes</p>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowAiPanel(!showAiPanel)}>
                  {showAiPanel ? <Info className="h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
                  {showAiPanel ? "Hide AI Panel" : "Show AI Panel"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle the AI assistant panel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" size="sm" onClick={() => generateWithAI("full")} disabled={aiGenerating}>
            {aiGenerating && activeAiSection === "full" ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
            )}
            Generate Full Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-${showAiPanel ? "3" : "4"} space-y-6`}>
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="seo">SEO & Objectives</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Publish</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Provide the basic details about your course</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateWithAI("title", courseData.category || "Web Development")}
                        disabled={aiGenerating}
                      >
                        {aiGenerating && activeAiSection === "title" ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                        )}
                        Generate Title
                      </Button>
                    </div>
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="description">Course Description</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => generateWithAI("description", courseData.category || "Web Development")}
                          disabled={aiGenerating}
                        >
                          {aiGenerating && activeAiSection === "description" ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                          )}
                          AI Write
                        </Button>
                      </div>
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
                        <Select
                          value={courseData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
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
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Course Content</CardTitle>
                        <CardDescription>Create modules and lessons for your course</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateWithAI("modules", courseData.category || "Web Development")}
                        disabled={aiGenerating}
                      >
                        {aiGenerating && activeAiSection === "modules" ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                        )}
                        Generate Curriculum
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {modules.map((module, moduleIndex) => (
                      <Card key={module.id} className="border border-muted">
                        <CardHeader className="bg-muted/30 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">Module {moduleIndex + 1}</span>
                              <Input
                                placeholder="Module title"
                                value={module.title}
                                onChange={(e) => updateModule(module.id, "title", e.target.value)}
                                className="max-w-md"
                              />
                            </div>
                            {modules.length > 1 && (
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeModule(module.id)}>
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="py-3">
                          <div className="space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-1 text-center text-sm text-muted-foreground">
                                  {lessonIndex + 1}
                                </div>
                                <div className="col-span-5">
                                  <Input
                                    placeholder="Lesson title"
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Input
                                    placeholder="Duration"
                                    value={lesson.duration}
                                    onChange={(e) => updateLesson(module.id, lesson.id, "duration", e.target.value)}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <Input
                                    placeholder="Short description"
                                    value={lesson.description}
                                    onChange={(e) => updateLesson(module.id, lesson.id, "description", e.target.value)}
                                  />
                                </div>
                                <div className="col-span-1 text-right">
                                  {module.lessons.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeLesson(module.id, lesson.id)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="py-3 flex justify-center border-t">
                          <Button type="button" variant="ghost" size="sm" onClick={() => addLesson(module.id)}>
                            <Plus className="mr-1 h-3 w-3" />
                            Add Lesson
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={addModule} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Module
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Learning Objectives</CardTitle>
                        <CardDescription>Define what students will learn from your course</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateWithAI("learningObjectives", courseData.category || "Web Development")}
                        disabled={aiGenerating}
                      >
                        {aiGenerating && activeAiSection === "learningObjectives" ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                        )}
                        Generate Objectives
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {courseData.learningObjectives.map((objective, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {objective}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => removeLearningObjective(objective)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a learning objective"
                          id="new-objective"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              const input = e.currentTarget
                              addLearningObjective(input.value)
                              input.value = ""
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById("new-objective") as HTMLInputElement
                            addLearningObjective(input.value)
                            input.value = ""
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>SEO Keywords</CardTitle>
                        <CardDescription>Add keywords to help students find your course</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateWithAI("keywords", courseData.category || "Web Development")}
                        disabled={aiGenerating}
                      >
                        {aiGenerating && activeAiSection === "keywords" ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                        )}
                        Generate Keywords
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {courseData.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {keyword}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => removeKeyword(keyword)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a keyword"
                          id="new-keyword"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              const input = e.currentTarget
                              addKeyword(input.value)
                              input.value = ""
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById("new-keyword") as HTMLInputElement
                            addKeyword(input.value)
                            input.value = ""
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Pricing & Publishing</CardTitle>
                        <CardDescription>Set your course price and publish settings</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateWithAI("pricing", courseData.level || "intermediate")}
                        disabled={aiGenerating}
                      >
                        {aiGenerating && activeAiSection === "pricing" ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4 text-purple-500" />
                        )}
                        Suggest Price
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Course Price (USD)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={courseData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          min="0"
                          step="0.01"
                          className="pl-8"
                        />
                      </div>
                      {aiSuggestions.priceAnalysis && (
                        <div className="flex items-start space-x-2 text-sm p-2 bg-muted/50 rounded-md">
                          <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
                          <p className="text-muted-foreground">{aiSuggestions.priceAnalysis}</p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="free-course">Free Course</Label>
                        <Switch
                          id="free-course"
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange("price", "0")
                            }
                          }}
                          checked={courseData.price === "0"}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Make this course available for free</p>
                    </div>

                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 pt-4">
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save as Draft
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={completionPercentage() < 100}
                        className="flex-1"
                      >
                        Submit for Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>

        {/* AI Assistant Panel */}
        {showAiPanel && (
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="flex items-center text-lg">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
                  AI Course Assistant
                </CardTitle>
                <CardDescription>Let AI help you create your course</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <Zap className="mr-1 h-4 w-4 text-amber-500" />
                    Quick Generate
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => generateWithAI("title", courseData.category || "Web Development")}
                      disabled={aiGenerating}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Title
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => generateWithAI("description", courseData.category || "Web Development")}
                      disabled={aiGenerating}
                    >
                      <BookOpen className="mr-1 h-3 w-3" />
                      Description
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => generateWithAI("modules", courseData.category || "Web Development")}
                      disabled={aiGenerating}
                    >
                      <Target className="mr-1 h-3 w-3" />
                      Modules
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => generateWithAI("keywords", courseData.category || "Web Development")}
                      disabled={aiGenerating}
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      Keywords
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <Info className="mr-1 h-4 w-4 text-blue-500" />
                    AI Tips
                  </h3>
                  <div className="text-xs space-y-2 text-muted-foreground">
                    <p>• Select a category before generating content</p>
                    <p>• AI works best with specific topics</p>
                    <p>• You can edit any AI-generated content</p>
                    <p>• Generate modules first, then refine lessons</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-green-500" />
                    Time Saved
                  </h3>
                  <div className="bg-muted p-2 rounded-md text-center">
                    <p className="text-lg font-bold">~3.5 hours</p>
                    <p className="text-xs text-muted-foreground">Estimated time saved with AI</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => generateWithAI("full")}
                    disabled={aiGenerating}
                  >
                    {aiGenerating && activeAiSection === "full" ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generate Full Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
    <Footer/>
  </div>
  )
}
