import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, TrendingUp, Users, Sparkles } from "lucide-react"

export function InstructorCTA() {
  return (
    <section className="w-[100%] flex items-center justify-center py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="gradient-text">Become an</span>
                <br />
                <span className="gradient-text-2">Instructor</span>
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
                Share your knowledge, inspire learners worldwide, and earn income by creating courses on our platform.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-3 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Reach Millions</h3>
                  <p className="text-gray-600">Connect with learners around the world</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 p-3 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Earn Revenue</h3>
                  <p className="text-gray-600">Get paid for every enrollment in your courses</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-3 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Grow Your Brand</h3>
                  <p className="text-gray-600">Build your reputation as an expert in your field</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/register">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Teaching Today
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center animate-slide-up">
            <div className="relative">
              <div className="relative z-10 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 shadow-2xl card-shadow-xl">
                <div className="h-[300px] w-[350px] md:h-[350px] md:w-[450px] overflow-hidden rounded-2xl bg-white">
                  <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-8">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold gradient-text">Teach & Inspire</h3>
                      <p className="text-gray-600 font-medium">Share your expertise with the world</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl blur-3xl transform rotate-6 scale-110"></div>
              <div className="absolute inset-0 -z-20 bg-gradient-to-r from-pink-400/15 to-rose-400/15 rounded-3xl blur-3xl transform -rotate-6 scale-125"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
