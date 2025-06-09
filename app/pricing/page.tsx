"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  Star,
  TrendingUp,
  Brain,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Target,
  Lightbulb,
  BarChart3,
  Globe,
  Shield,
  Headphones,
  Download,
  ArrowRight,
  Play,
  X,
} from "lucide-react"
import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    courses: 0,
    instructors: 0,
    successRate: 0,
    timeSaved: 0,
  })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Online Course Creator",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "CourseWizard AI saved me 20+ hours of course planning! The AI-generated outlines are incredibly detailed and professional.",
      course: "Digital Marketing Mastery",
      revenue: "$15,000",
    },
    {
      name: "Mike Chen",
      role: "Programming Instructor",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "I've created 5 courses with CourseWizard and each one became a bestseller. The AI knows exactly what students want!",
      course: "React Development Pro",
      revenue: "$28,500",
    },
    {
      name: "Emily Rodriguez",
      role: "Design Expert",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "The keyword suggestions alone are worth the subscription. My courses now rank #1 in search results!",
      course: "UI/UX Design Complete",
      revenue: "$12,300",
    },
    {
      name: "David Kim",
      role: "Business Coach",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "From idea to published course in under 2 hours. CourseWizard AI is a game-changer for content creators!",
      course: "Entrepreneurship 101",
      revenue: "$22,800",
    },
  ]

  const features = {
    free: [
      { text: "1 AI course generation per month", icon: Sparkles },
      { text: "Basic course outline", icon: Target },
      { text: "5 lesson suggestions", icon: BarChart3 },
      { text: "Basic SEO keywords", icon: TrendingUp },
      { text: "Community support", icon: Users },
    ],
    pro: [
      { text: "Unlimited AI course generations", icon: Sparkles, highlight: true },
      { text: "Advanced course outlines with 6-8 modules", icon: Target },
      { text: "Unlimited lesson suggestions", icon: BarChart3 },
      { text: "Advanced SEO keyword research", icon: TrendingUp, highlight: true },
      { text: "Price optimization suggestions", icon: Brain },
      { text: "Market demand analysis", icon: Globe },
      { text: "Competitor insights", icon: Shield },
      { text: "Learning objective generation", icon: Lightbulb },
      { text: "Course description optimization", icon: Award },
      { text: "Priority email support", icon: Headphones, highlight: true },
      { text: "Early access to new features", icon: Rocket },
      { text: "Export to popular course platforms", icon: Download },
    ],
  }

  const stats = [
    { label: "Courses Generated", value: 10000, suffix: "+" },
    { label: "Happy Instructors", value: 5000, suffix: "+" },
    { label: "Success Rate", value: 95, suffix: "%" },
    { label: "Hours Saved", value: 20, suffix: "hrs" },
  ]

  // Animate stats on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        courses: 10000,
        instructors: 5000,
        successRate: 95,
        timeSaved: 20,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const AnimatedCounter = ({
    end,
    duration = 2000,
    suffix = "",
  }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        setCount(Math.floor(progress * end))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
   <div>
    <MainNav/>
 <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">

  <button
  className="rounded-xl m-[2rem] px-3 py-1 bg-purple-600 hover:bg-purple-700 transition-all"
  onClick={()=> router.back()}> Go Back </button>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            CourseWizard Pro
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your teaching with AI-powered course creation. Build unlimited courses, get advanced insights, and
            dominate your niche with intelligent automation.
          </p>

         

          {/* Billing Toggle */}
          <div className="flex mx-auto items-center w-[40%] justify-center space-x-4 mb-8 p-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
            <span
              className={`text-lg font-medium transition-all duration-300 ${!isAnnual ? "text-slate-900" : "text-slate-500"}`}
            >
              Monthly
            </span>
            <div className="relative">
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
              />
            </div>
            <span
              className={`text-lg font-medium transition-all duration-300 ${isAnnual ? "text-slate-900" : "text-slate-500"}`}
            >
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-bounce">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-30vh gap-8 mb-20 max-w-5xl mx-auto ">
          {/* Free Plan */}
          <Card
            className={`relative border-2 transition-all flex flex-col justify-between h-full duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              hoveredPlan === "free" ? "border-slate-300 shadow-xl" : "border-slate-200"
            }`}
            onMouseEnter={() => setHoveredPlan("free")}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <CardHeader className="text-center pb-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-t-lg">
           
              <CardTitle className="text-2xl mb-2 text-purple-600">Free Plan</CardTitle>
              <div className="text-4xl font-bold  text-purple-600 mb-2">$0</div>
              <p className="text-slate-600">Perfect for trying out CourseWizard</p>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-4">
                {features.free.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex items-center space-x-3 group">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <Icon className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-700">{feature.text}</span>
                    </div>
                  )
                })}
              </div>
              <Button
                variant="outline"
                className="w-full h-12 text-lg mt-auto transition-all duration-300 hover:scale-105"
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card
            className={`relative border-4 shadow-2xl scale-105 transition-all duration-500 hover:shadow-3xl hover:-translate-y-3 ${
              hoveredPlan === "pro" ? "border-purple-300" : "border-purple-200"
            }`}
            onMouseEnter={() => setHoveredPlan("pro")}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-sm font-medium shadow-lg animate-pulse">
                <Crown className="mr-2 h-4 w-4" />
                MOST POPULAR
              </Badge>
            </div>
            <CardHeader className="text-center pb-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🚀</div>
                <CardTitle className="text-2xl text-purple-600 mb-2">CourseWizard Pro</CardTitle>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ${isAnnual ? "8" : "10"}
                  <span className="text-lg font-normal text-slate-600">/month</span>
                </div>
                {isAnnual && (
                  <div className="inline-flex items-center space-x-1 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3" />
                    <span>Billed annually - Save $24/year!</span>
                  </div>
                )}
                <p className="text-slate-600 mt-2">Unlimited AI-powered course creation</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                {features.pro.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 group ${feature.highlight ? "bg-gradient-to-r from-purple-50 to-blue-50 p-2 rounded-lg" : ""}`}
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <Icon className={`h-4 w-4 ${feature.highlight ? "text-purple-600" : "text-slate-500"}`} />
                      <span
                        className={`text-sm ${feature.highlight ? "text-slate-800 font-medium" : "text-slate-700"}`}
                      >
                        {feature.text}
                      </span>
                      {feature.highlight && <Sparkles className="h-3 w-3 text-purple-500 ml-auto" />}
                    </div>
                  )
                })}
              </div>
              <Button className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <Sparkles className="mr-2 h-5 w-5" />
                Upgrade & Transform Your Teaching
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-center text-slate-500">30-day money-back guarantee • Cancel anytime</p>
            </CardContent>
          </Card>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Why Choose CourseWizard Pro?
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Discover the powerful features that make CourseWizard the #1 choice for course creators worldwide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Intelligence",
                description:
                  "Advanced AI analyzes market trends, competitor data, and student preferences to create winning courses that sell.",
                color: "purple",
              },
              {
                icon: TrendingUp,
                title: "Market Optimization",
                description:
                  "Get data-driven pricing suggestions, SEO keywords, and market demand insights for maximum revenue potential.",
                color: "blue",
              },
              {
                icon: Zap,
                title: "Lightning Fast Creation",
                description:
                  "Create complete course outlines in minutes, not hours. Focus on teaching while AI handles the planning.",
                color: "green",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="text-center border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${
                        feature.color === "purple"
                          ? "from-purple-500 to-purple-600"
                          : feature.color === "blue"
                            ? "from-blue-500 to-blue-600"
                            : "from-green-500 to-green-600"
                      } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Interactive Testimonials */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-center text-slate-600 mb-12">Real results from real instructors</p>

          <Card className="max-w-4xl mx-auto border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="sm" onClick={prevTestimonial} className="hover:bg-slate-100">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 scale-125"
                          : "bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
                <Button variant="ghost" size="sm" onClick={nextTestimonial} className="hover:bg-slate-100">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center transition-all duration-500">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl italic mb-6 text-slate-700 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                    <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{testimonials[currentTestimonial].name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-slate-600">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1 text-slate-600">
                    <Award className="h-4 w-4" />
                    <span>{testimonials[currentTestimonial].course}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    <span>{testimonials[currentTestimonial].revenue} revenue</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white text-center border-0 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="p-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Course Creation?</h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Join thousands of successful instructors using AI to build amazing courses and generate passive income
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4 bg-white text-slate-800 hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Pro Journey Today
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 transition-all duration-300"
                  onClick={() => setShowVideoModal(true)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm opacity-75">No commitment • Cancel anytime • 30-day money-back guarantee</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">CourseWizard Demo</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowVideoModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 2px;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    <Footer/>
    </div>
  )
}
