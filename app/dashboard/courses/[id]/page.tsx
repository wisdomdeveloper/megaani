"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MainNav } from '@/components/common/main-nav'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  MessageSquare,
  Download,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Circle,
  FileText,
  Video,
  PenTool,
  Bookmark,
  Share,
  ThumbsUp,
  Reply,
} from "lucide-react"

export default function CourseLearningPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showTranscript, setShowTranscript] = useState(false)
  const [currentLessonId, setCurrentLessonId] = useState("lesson-1")
  const [notes, setNotes] = useState("")
  const [newNote, setNewNote] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock course data
  const courseData = {
    id: "1",
    title: "Complete React Developer Course",
    instructor: "John Smith",
    progress: 75,
    currentSection: 1,
    currentLesson: 1,
    sections: [
      {
        id: "section-1",
        title: "Getting Started with React",
        lessons: [
          {
            id: "lesson-1",
            title: "Introduction to React",
            duration: "10:30",
            isCompleted: true,
            type: "video",
            videoUrl: "/placeholder-video.mp4",
          },
          {
            id: "lesson-2",
            title: "Setting up Development Environment",
            duration: "15:45",
            isCompleted: true,
            type: "video",
            videoUrl: "/placeholder-video.mp4",
          },
          {
            id: "lesson-3",
            title: "Your First React Component",
            duration: "12:20",
            isCompleted: false,
            type: "video",
            videoUrl: "/placeholder-video.mp4",
          },
          {
            id: "lesson-4",
            title: "Quiz: React Basics",
            duration: "5:00",
            isCompleted: false,
            type: "quiz",
          },
        ],
      },
      {
        id: "section-2",
        title: "React Components and Props",
        lessons: [
          {
            id: "lesson-5",
            title: "Understanding Components",
            duration: "18:15",
            isCompleted: false,
            type: "video",
            videoUrl: "/placeholder-video.mp4",
          },
          {
            id: "lesson-6",
            title: "Props and Data Flow",
            duration: "14:30",
            isCompleted: false,
            type: "video",
            videoUrl: "/placeholder-video.mp4",
          },
        ],
      },
    ],
  }

  const currentLesson = courseData.sections
    .flatMap((section) => section.lessons)
    .find((lesson) => lesson.id === currentLessonId)

  const allLessons = courseData.sections.flatMap((section) => section.lessons)
  const currentLessonIndex = allLessons.findIndex((lesson) => lesson.id === currentLessonId)

  const studentNotes = [
    {
      id: "note-1",
      timestamp: "2:30",
      content: "React is a JavaScript library for building user interfaces",
      createdAt: "2024-01-28T10:30:00Z",
    },
    {
      id: "note-2",
      timestamp: "5:45",
      content: "Components are the building blocks of React applications",
      createdAt: "2024-01-28T10:35:00Z",
    },
  ]

  const discussions = [
    {
      id: "discussion-1",
      user: "Alice Johnson",
      avatar: "/placeholder.svg",
      timestamp: "2 hours ago",
      content: "Great explanation! I finally understand how React components work.",
      likes: 5,
      replies: [
        {
          id: "reply-1",
          user: "Bob Smith",
          avatar: "/placeholder.svg",
          timestamp: "1 hour ago",
          content: "I agree! This lesson cleared up a lot of confusion for me too.",
          likes: 2,
        },
      ],
    },
    {
      id: "discussion-2",
      user: "Charlie Brown",
      avatar: "/placeholder.svg",
      timestamp: "4 hours ago",
      content: "Could you provide more examples of functional components?",
      likes: 3,
      replies: [],
    },
  ]

  const resources = [
    {
      id: "resource-1",
      title: "React Official Documentation",
      type: "link",
      url: "https://reactjs.org/docs",
    },
    {
      id: "resource-2",
      title: "Component Examples",
      type: "file",
      size: "2.5 MB",
    },
    {
      id: "resource-3",
      title: "Exercise Files",
      type: "file",
      size: "1.8 MB",
    },
  ]

  const transcript = [
    { timestamp: "0:00", text: "Welcome to this lesson on React components." },
    { timestamp: "0:15", text: "In this video, we'll explore what components are and how they work." },
    { timestamp: "0:30", text: "Components are the fundamental building blocks of React applications." },
    { timestamp: "1:00", text: "They allow us to split the UI into independent, reusable pieces." },
  ]

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const goToNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id)
    }
  }

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonId(allLessons[currentLessonIndex - 1].id)
    }
  }

  const addNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      setNewNote("")
    }
  }

  return (
    <div className="!min-h-full bg-background">
    <MainNav/>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col">
          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            <video
              ref={videoRef}
              className="w-full h-[40vh]"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              // poster=""
            >
              <source src={currentLesson?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="space-y-2">
                {/* Progress Bar */}
                <div className="flex items-center space-x-2 text-white text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <div className="flex-1">
                    <Progress value={(currentTime / duration) * 100} className="h-1 bg-white/20" />
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlayPause}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Select
                      value={playbackSpeed.toString()}
                      onValueChange={(value) => setPlaybackSpeed(Number.parseFloat(value))}
                    >
                      <SelectTrigger className="w-16 h-8 text-white border-white/20 bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5x</SelectItem>
                        <SelectItem value="0.75">0.75x</SelectItem>
                        <SelectItem value="1">1x</SelectItem>
                        <SelectItem value="1.25">1.25x</SelectItem>
                        <SelectItem value="1.5">1.5x</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info and Navigation */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
                <p className="text-muted-foreground">
                  {courseData.title} • {currentLesson?.duration}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Bookmark
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={goToPreviousLesson} disabled={currentLessonIndex === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center space-x-2">
                <Switch id="auto-play" checked={true} />
                <Label htmlFor="auto-play" className="text-sm">
                  Auto-play next lesson
                </Label>
              </div>
              <Button onClick={goToNextLesson} disabled={currentLessonIndex === allLessons.length - 1}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex-1 p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="discussions">Q&A</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">About this lesson</h3>
                    <p className="text-muted-foreground mb-4">
                      In this lesson, you'll learn the fundamentals of React components and how they form the building
                      blocks of React applications. We'll cover functional components, JSX syntax, and basic component
                      composition.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">What you'll learn:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Understanding React components</li>
                        <li>Creating functional components</li>
                        <li>Using JSX syntax</li>
                        <li>Component composition patterns</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">My Notes</h3>
                        <Button size="sm" onClick={addNote}>
                          <PenTool className="mr-2 h-4 w-4" />
                          Add Note
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a note at current timestamp..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          rows={3}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Note will be saved at {formatTime(currentTime)}
                          </span>
                          <Button size="sm" onClick={addNote} disabled={!newNote.trim()}>
                            Save Note
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        {studentNotes.map((note) => (
                          <div key={note.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="mr-1 h-3 w-3" />
                                {note.timestamp}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(note.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm">{note.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussions" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Questions & Answers</h3>
                        <Button size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Ask Question
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Textarea placeholder="Ask a question about this lesson..." rows={3} />
                        <div className="flex justify-end">
                          <Button size="sm">Post Question</Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-6">
                        {discussions.map((discussion) => (
                          <div key={discussion.id} className="space-y-4">
                            <div className="flex space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{discussion.user[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">{discussion.user}</span>
                                  <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                                </div>
                                <p className="text-sm">{discussion.content}</p>
                                <div className="flex items-center space-x-4">
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <ThumbsUp className="mr-1 h-3 w-3" />
                                    {discussion.likes}
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <Reply className="mr-1 h-3 w-3" />
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {discussion.replies.map((reply) => (
                              <div key={reply.id} className="ml-11 flex space-x-3">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{reply.user[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-xs">{reply.user}</span>
                                    <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-xs">{reply.content}</p>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <ThumbsUp className="mr-1 h-2 w-2" />
                                    {reply.likes}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Lesson Resources</h3>
                    <div className="space-y-3">
                      {resources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {resource.type === "link" ? (
                              <FileText className="h-5 w-5 text-blue-500" />
                            ) : (
                              <Download className="h-5 w-5 text-green-500" />
                            )}
                            <div>
                              <p className="font-medium text-sm">{resource.title}</p>
                              {resource.size && <p className="text-xs text-muted-foreground">{resource.size}</p>}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            {resource.type === "link" ? "Open" : "Download"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transcript" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Transcript</h3>
                      <div className="flex items-center space-x-2">
                        <Switch id="show-transcript" checked={showTranscript} onCheckedChange={setShowTranscript} />
                        <Label htmlFor="show-transcript" className="text-sm">
                          Show on video
                        </Label>
                      </div>
                    </div>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {transcript.map((item, index) => (
                          <div key={index} className="flex space-x-3 p-2 hover:bg-muted rounded cursor-pointer">
                            <Badge variant="outline" className="text-xs shrink-0">
                              {item.timestamp}
                            </Badge>
                            <p className="text-sm">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Course Navigation Sidebar */}
        <div className="lg:col-span-1 border-l bg-muted/30">
          <div className="p-4 border-b">
            <div className="space-y-2">
              <h2 className="font-semibold text-sm">{courseData.title}</h2>
              <p className="text-xs text-muted-foreground">by {courseData.instructor}</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Course Progress</span>
                  <span>{courseData.progress}%</span>
                </div>
                <Progress value={courseData.progress} className="h-1" />
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4 space-y-4">
              {courseData.sections.map((section, sectionIndex) => (
                <div key={section.id} className="space-y-2">
                  <h3 className="font-medium text-sm">
                    Section {sectionIndex + 1}: {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonId(lesson.id)}
                        className={`w-full flex items-center space-x-3 p-2 rounded text-left hover:bg-muted transition-colors ${
                          currentLessonId === lesson.id ? "bg-primary/10 border border-primary/20" : ""
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : currentLessonId === lesson.id ? (
                            <Play className="h-4 w-4 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            {lesson.type === "video" ? (
                              <Video className="h-3 w-3 text-blue-500" />
                            ) : (
                              <FileText className="h-3 w-3 text-green-500" />
                            )}
                            <span className="text-xs font-medium truncate">
                              {lessonIndex + 1}. {lesson.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
