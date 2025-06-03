import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Users, BookOpen, TrendingUp, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-500 dark:to-purple-500 rounded-full opacity-20 dark:opacity-30 animate-pulse blur-xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-500 dark:to-blue-500 rounded-full opacity-20 dark:opacity-30 animate-pulse delay-1000 blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-400 dark:from-pink-500 dark:to-rose-500 rounded-full opacity-20 dark:opacity-30 animate-pulse delay-500 blur-xl" />
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-full opacity-15 dark:opacity-25 animate-pulse delay-700 blur-xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-300 dark:to-purple-300 rounded-full opacity-30 dark:opacity-40 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="w-fit bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700 hover:from-violet-200 hover:to-purple-200 dark:hover:from-violet-800/50 dark:hover:to-purple-800/50 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />🚀 Join 50,000+ learners worldwide
              </Badge>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Learn Without
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                  Limits
                </span>
              </h1>

              <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl lg:text-2xl leading-relaxed font-medium">
                Master new skills with expert-led courses. From coding to design, business to marketing - your learning
                journey starts here with{" "}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold">
                  Megaani
                </span>
                .
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="group cursor-pointer">
                <div className="p-4 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 border dark:border-violet-800/50 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg dark:group-hover:shadow-violet-500/25">
                  <BookOpen className="h-8 w-8 text-violet-600 dark:text-violet-400 mx-auto mb-2" />
                  <div className="font-bold text-xl text-gray-800 dark:text-gray-200">10,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 border dark:border-indigo-800/50 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg dark:group-hover:shadow-indigo-500/25">
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <div className="font-bold text-xl text-gray-800 dark:text-gray-200">50,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border dark:border-emerald-800/50 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg dark:group-hover:shadow-emerald-500/25">
                  <Star className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <div className="font-bold text-xl text-gray-800 dark:text-gray-200">4.8/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 dark:from-violet-500 dark:to-purple-500 dark:hover:from-violet-600 dark:hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl dark:shadow-violet-500/25 dark:hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/browse-courses">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning Today
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 font-semibold rounded-xl transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-600"
              >
                <Link href="/become-instructor">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Become an Instructor
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-500 dark:to-purple-500 border-3 border-white dark:border-gray-900 shadow-lg"
                  />
                ))}
              </div>
              <span className="font-medium">Join thousands of successful learners</span>
            </div>
          </div>

          <div className="flex items-center justify-center animate-slide-up">
            <div className="relative">
              {/* Enhanced hero image container */}
              <div className="relative z-10 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 dark:from-violet-600 dark:via-purple-600 dark:to-indigo-600 p-2 shadow-2xl card-shadow-xl dark:shadow-violet-500/25">
                <div className="h-[350px] w-[300px] md:h-[450px] md:w-[400px] lg:h-[500px] lg:w-[450px] overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border dark:border-gray-800">
                  <div className="h-full w-full bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 flex items-center justify-center p-8">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400 rounded-3xl flex items-center justify-center shadow-lg">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Interactive Learning
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        Hands-on projects and real-world applications
                      </p>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 z-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-bounce border border-violet-100 dark:border-violet-800">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Live Classes</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-pulse border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">1000+ Online</span>
                </div>
              </div>

              {/* Enhanced background decoration */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-400/20 to-purple-400/20 dark:from-violet-500/30 dark:to-purple-500/30 rounded-3xl blur-3xl transform rotate-6 scale-110"></div>
              <div className="absolute inset-0 -z-20 bg-gradient-to-r from-indigo-400/15 to-blue-400/15 dark:from-indigo-500/25 dark:to-blue-500/25 rounded-3xl blur-3xl transform -rotate-6 scale-125"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
