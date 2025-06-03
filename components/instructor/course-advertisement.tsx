"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useCurrency } from "@/context/currency-context"
import { Eye, MousePointer, ShoppingCart, DollarSign, Target, Play, Pause } from "lucide-react"

interface CourseAdvertisementProps {
  courseId: string
  courseTitle: string
}

export function CourseAdvertisement({ courseId, courseTitle }: CourseAdvertisementProps) {
  const { toast } = useToast()
  const { formatPrice, convertPrice } = useCurrency()
  const [loading, setLoading] = useState(false)
  const [adForm, setAdForm] = useState({
    title: "",
    description: "",
    targetAudience: [] as string[],
    budget: "",
    duration: "",
  })

  // Mock advertisement data
  const activeAds = [
    {
      id: "ad1",
      title: "Boost React Course Visibility",
      status: "active" as const,
      budget: 500,
      spent: 245.5,
      impressions: 15420,
      clicks: 892,
      conversions: 45,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
    },
    {
      id: "ad2",
      title: "Weekend Special Promotion",
      status: "paused" as const,
      budget: 200,
      spent: 89.25,
      impressions: 5240,
      clicks: 234,
      conversions: 12,
      startDate: "2024-01-20",
      endDate: "2024-01-27",
    },
  ]

  const targetAudienceOptions = [
    "Beginner Developers",
    "Intermediate Developers",
    "Advanced Developers",
    "Students",
    "Professionals",
    "Career Changers",
    "Entrepreneurs",
    "Designers",
  ]

  const handleInputChange = (field: string, value: string) => {
    setAdForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAudienceToggle = (audience: string) => {
    setAdForm((prev) => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter((a) => a !== audience)
        : [...prev.targetAudience, audience],
    }))
  }

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Advertisement created!",
        description: "Your course advertisement campaign has been submitted for review.",
      })

      // Reset form
      setAdForm({
        title: "",
        description: "",
        targetAudience: [],
        budget: "",
        duration: "",
      })
    } catch (error) {
      toast({
        title: "Error creating advertisement",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0.00"
  }

  const calculateConversionRate = (conversions: number, clicks: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : "0.00"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Course Advertisement
          </CardTitle>
          <CardDescription>Promote "{courseTitle}" to reach more students and increase enrollments</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="manage">Manage Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Advertisement Campaign</CardTitle>
              <CardDescription>Set up a new promotional campaign for your course</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAd} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ad-title">Campaign Title</Label>
                  <Input
                    id="ad-title"
                    placeholder="Enter campaign title"
                    value={adForm.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad-description">Campaign Description</Label>
                  <Textarea
                    id="ad-description"
                    placeholder="Describe your campaign goals and messaging"
                    value={adForm.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Target Audience</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {targetAudienceOptions.map((audience) => (
                      <div
                        key={audience}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          adForm.targetAudience.includes(audience)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleAudienceToggle(audience)}
                      >
                        <span className="text-sm">{audience}</span>
                      </div>
                    ))}
                  </div>
                  {adForm.targetAudience.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {adForm.targetAudience.map((audience) => (
                        <Badge key={audience} variant="secondary">
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Campaign Budget (USD)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="100"
                      value={adForm.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      min="10"
                      required
                    />
                    <p className="text-sm text-muted-foreground">Minimum budget: $10</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Campaign Duration (days)</Label>
                    <Select value={adForm.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h4 className="font-medium">Campaign Estimate</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Estimated Reach:</span>
                      <span className="ml-2 font-medium">
                        {adForm.budget ? Math.round(Number(adForm.budget) * 50) : 0} people
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Estimated Clicks:</span>
                      <span className="ml-2 font-medium">
                        {adForm.budget ? Math.round(Number(adForm.budget) * 2.5) : 0} clicks
                      </span>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Campaign..." : "Create Advertisement Campaign"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Manage your current advertisement campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAds.map((ad) => (
                  <div key={ad.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{ad.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {ad.startDate} - {ad.endDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={ad.status === "active" ? "default" : "secondary"}>{ad.status}</Badge>
                        <Button variant="outline" size="sm">
                          {ad.status === "active" ? (
                            <>
                              <Pause className="mr-1 h-3 w-3" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="mr-1 h-3 w-3" />
                              Resume
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Progress</span>
                        <span>
                          {formatPrice(convertPrice(ad.spent))} / {formatPrice(convertPrice(ad.budget))}
                        </span>
                      </div>
                      <Progress value={(ad.spent / ad.budget) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{ad.impressions.toLocaleString()}</div>
                        <div className="text-muted-foreground">Impressions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{ad.clicks.toLocaleString()}</div>
                        <div className="text-muted-foreground">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{ad.conversions}</div>
                        <div className="text-muted-foreground">Conversions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{calculateCTR(ad.clicks, ad.impressions)}%</div>
                        <div className="text-muted-foreground">CTR</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(convertPrice(334.75))}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20,660</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,126</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">57</div>
                <p className="text-xs text-muted-foreground">+22% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Detailed analytics for all your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Conv. Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeAds.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell className="font-medium">{ad.title}</TableCell>
                      <TableCell>
                        <Badge variant={ad.status === "active" ? "default" : "secondary"}>{ad.status}</Badge>
                      </TableCell>
                      <TableCell>{formatPrice(convertPrice(ad.spent))}</TableCell>
                      <TableCell>{ad.impressions.toLocaleString()}</TableCell>
                      <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                      <TableCell>{calculateCTR(ad.clicks, ad.impressions)}%</TableCell>
                      <TableCell>{ad.conversions}</TableCell>
                      <TableCell>{calculateConversionRate(ad.conversions, ad.clicks)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
