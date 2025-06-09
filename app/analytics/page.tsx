"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  DollarSign,
  Users,
  Star,
  Eye,
  Play,
  Download,
  MessageSquare,
  Globe,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { useRouter } from "next/navigation"

export default function InstructorAnalyticsPage() {
    const router = useRouter();
      const [timeRange, setTimeRange] = useState("30d")
  const [selectedCourse, setSelectedCourse] = useState("all")

  // Mock analytics data
  const overviewStats = {
    totalRevenue: 125750,
    revenueChange: 12.5,
    totalStudents: 3420,
    studentsChange: 8.2,
    averageRating: 4.7,
    ratingChange: 0.3,
    totalViews: 45680,
    viewsChange: -2.1,
  }

  const revenueData = [
    { month: "Jan", revenue: 8500, students: 120 },
    { month: "Feb", revenue: 12300, students: 180 },
    { month: "Mar", revenue: 15600, students: 220 },
    { month: "Apr", revenue: 18900, students: 280 },
    { month: "May", revenue: 22100, students: 320 },
    { month: "Jun", revenue: 25400, students: 380 },
    { month: "Jul", revenue: 28700, students: 420 },
    { month: "Aug", revenue: 31200, students: 460 },
    { month: "Sep", revenue: 28900, students: 440 },
    { month: "Oct", revenue: 32500, students: 480 },
    { month: "Nov", revenue: 35800, students: 520 },
    { month: "Dec", revenue: 38200, students: 580 },
  ]

  const coursePerformance = [
    {
      id: "1",
      title: "Complete React Developer Course",
      students: 1250,
      revenue: 62500,
      rating: 4.8,
      completion: 78,
      engagement: 85,
      reviews: 245,
    },
    {
      id: "2",
      title: "Node.js Backend Development",
      students: 890,
      revenue: 35600,
      rating: 4.6,
      completion: 72,
      engagement: 79,
      reviews: 156,
    },
    {
      id: "3",
      title: "Advanced JavaScript Concepts",
      students: 680,
      revenue: 40800,
      rating: 4.9,
      completion: 85,
      engagement: 92,
      reviews: 198,
    },
    {
      id: "4",
      title: "Python for Data Science",
      students: 600,
      revenue: 42000,
      rating: 4.7,
      completion: 68,
      engagement: 74,
      reviews: 134,
    },
  ]

  const geographicData = [
    { country: "United States", students: 1250, percentage: 36.5 },
    { country: "India", students: 680, percentage: 19.9 },
    { country: "United Kingdom", students: 420, percentage: 12.3 },
    { country: "Canada", students: 310, percentage: 9.1 },
    { country: "Germany", students: 280, percentage: 8.2 },
    { country: "Australia", students: 180, percentage: 5.3 },
    { country: "Others", students: 300, percentage: 8.8 },
  ]

  const engagementData = [
    { day: "Mon", videoViews: 1200, discussions: 45, notes: 89 },
    { day: "Tue", videoViews: 1100, discussions: 52, notes: 76 },
    { day: "Wed", videoViews: 1350, discussions: 38, notes: 94 },
    { day: "Thu", videoViews: 1280, discussions: 41, notes: 82 },
    { day: "Fri", videoViews: 980, discussions: 35, notes: 67 },
    { day: "Sat", videoViews: 1450, discussions: 28, notes: 103 },
    { day: "Sun", videoViews: 1380, discussions: 33, notes: 98 },
  ]

  const trafficSources = [
    { source: "Organic Search", value: 45, color: "#8884d8" },
    { source: "Direct", value: 25, color: "#82ca9d" },
    { source: "Social Media", value: 15, color: "#ffc658" },
    { source: "Referrals", value: 10, color: "#ff7300" },
    { source: "Email", value: 5, color: "#00ff00" },
  ]

  const recentReviews = [
    {
      id: "1",
      student: "Alice Johnson",
      avatar: "/placeholder.svg",
      course: "Complete React Developer Course",
      rating: 5,
      comment: "Excellent course! Very comprehensive and well-structured.",
      date: "2024-01-28",
    },
    {
      id: "2",
      student: "Bob Smith",
      avatar: "/placeholder.svg",
      course: "Node.js Backend Development",
      rating: 4,
      comment: "Good content, but could use more practical examples.",
      date: "2024-01-27",
    },
    {
      id: "3",
      student: "Carol Davis",
      avatar: "/placeholder.svg",
      course: "Advanced JavaScript Concepts",
      rating: 5,
      comment: "Amazing depth of knowledge. Highly recommended!",
      date: "2024-01-26",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : ""
    return `${sign}${value.toFixed(1)}%`
  }

  return (
  <div>
    <MainNav/>
  <div className="container mx-auto p-6 space-y-8">
    <button
    className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all"
    onClick={()=> router.back()}>Go Back </button>
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your course performance and student engagement</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">{formatCurrency(overviewStats.totalRevenue)}</p>
                    <div className="flex items-center space-x-1">
                      {overviewStats.revenueChange >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm ${overviewStats.revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {formatPercentage(overviewStats.revenueChange)}
                      </span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{overviewStats.totalStudents.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">{formatPercentage(overviewStats.studentsChange)}</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">{overviewStats.averageRating}</p>
                    <div className="flex items-center space-x-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">{formatPercentage(overviewStats.ratingChange)}</span>
                    </div>
                  </div>
                  <Star className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{overviewStats.totalViews.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-500">{formatPercentage(overviewStats.viewsChange)}</span>
                    </div>
                  </div>
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{country.country}</span>
                      <span className="text-sm text-muted-foreground">{country.students} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={country.percentage} className="w-24 h-2" />
                      <span className="text-sm font-medium w-12">{country.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue & Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                    <Bar yAxisId="right" dataKey="students" fill="#82ca9d" name="New Students" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Gross Revenue</span>
                    <span className="font-medium">{formatCurrency(125750)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (3%)</span>
                    <span className="text-red-500">-{formatCurrency(3772.5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Processing (2.9%)</span>
                    <span className="text-red-500">-{formatCurrency(3646.75)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Withholding</span>
                    <span className="text-red-500">-{formatCurrency(2515)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Net Revenue</span>
                    <span className="text-green-600">{formatCurrency(115815.75)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Earning Courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {coursePerformance
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((course, index) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium text-sm line-clamp-1">{course.title}</p>
                          <p className="text-xs text-muted-foreground">{course.students} students</p>
                        </div>
                        <span className="font-medium">{formatCurrency(course.revenue)}</span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Beginner Level</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Intermediate Level</span>
                      <span className="text-sm">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Advanced Level</span>
                      <span className="text-sm">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Activity Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="videoViews" fill="#8884d8" name="Video Views" />
                  <Bar dataKey="discussions" fill="#82ca9d" name="Discussions" />
                  <Bar dataKey="notes" fill="#ffc658" name="Notes Taken" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Play className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">89.2%</div>
                <div className="text-sm text-muted-foreground">Average Watch Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Total Discussions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">76.3%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="videoViews" stroke="#8884d8" name="Video Views" />
                  <Line type="monotone" dataKey="discussions" stroke="#82ca9d" name="Discussions" />
                  <Line type="monotone" dataKey="notes" stroke="#ffc658" name="Notes" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursePerformance.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge variant="outline">{course.students} students</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{formatCurrency(course.revenue)}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold flex items-center justify-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {course.rating}
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.completion}%</div>
                        <div className="text-xs text-muted-foreground">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.engagement}%</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.reviews}</div>
                        <div className="text-xs text-muted-foreground">Reviews</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.student[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{review.student}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{review.course}</p>
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-4">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <Progress
                        value={rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}
                        className="flex-1 h-2"
                      />
                      <span className="text-xs text-muted-foreground w-8">
                        {rating === 5 ? "70%" : rating === 4 ? "20%" : rating === 3 ? "7%" : rating === 2 ? "2%" : "1%"}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.7</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                    <div className="flex justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Reviews</span>
                      <span className="font-medium">733</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Response Rate</span>
                      <span className="font-medium">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    <Footer/>
  </div>
  )
}
