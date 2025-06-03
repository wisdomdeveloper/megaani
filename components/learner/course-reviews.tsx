import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { Review } from "@/types/course"
import { Star } from "lucide-react"

interface CourseReviewsProps {
  reviews: Review[]
}

export function CourseReviews({ reviews }: CourseReviewsProps) {
  // Mock rating distribution
  const ratingDistribution = [
    { stars: 5, count: 1250, percentage: 75 },
    { stars: 4, count: 300, percentage: 18 },
    { stars: 3, count: 80, percentage: 5 },
    { stars: 2, count: 20, percentage: 1 },
    { stars: 1, count: 17, percentage: 1 },
  ]

  const totalReviews = ratingDistribution.reduce((acc, rating) => acc + rating.count, 0)
  const averageRating = 4.8

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Reviews</CardTitle>
        <CardDescription>What students are saying about this course</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">{averageRating}</div>
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating) ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{totalReviews.toLocaleString()} reviews</div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center space-x-2 text-sm">
                <span className="w-8">{rating.stars}★</span>
                <Progress value={rating.percentage} className="flex-1 h-2" />
                <span className="w-12 text-muted-foreground">{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          <h4 className="font-semibold">Recent Reviews</h4>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No reviews yet. Be the first to review this course!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
