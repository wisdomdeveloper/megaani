import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, TrendingUp, LineChart } from "lucide-react"

export function CategorySection() {
  const categories = [
    {
      title: "Development",
      description: "Web, Mobile, Game Development & more",
      icon: Code,
      href: "/browse-courses?category=development",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/30 to-cyan-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "dark:border-blue-800/50",
    },
    {
      title: "Business",
      description: "Leadership, Management, Entrepreneurship",
      icon: TrendingUp,
      href: "/browse-courses?category=business",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/30 to-teal-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "dark:border-emerald-800/50",
    },
    {
      title: "Design",
      description: "UI/UX, Graphic Design, 3D & Animation",
      icon: Palette,
      href: "/browse-courses?category=design",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/30 to-pink-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "dark:border-purple-800/50",
    },
    {
      title: "Marketing",
      description: "Digital Marketing, SEO, Social Media",
      icon: LineChart,
      href: "/browse-courses?category=marketing",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      darkBgGradient: "from-orange-900/30 to-red-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
      borderColor: "dark:border-orange-800/50",
    },
  ]

  return (
    <section className="w-[100%] flex items-center justify-center py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              Browse Top Categories
            </h2>
            <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
              Discover the perfect course in our diverse range of categories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link key={category.title} href={category.href} className="group">
              <Card
                className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 card-shadow-lg animate-fade-in dark:bg-gray-900 dark:border dark:border-gray-800 dark:hover:shadow-violet-500/25 ${category.borderColor}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center space-y-6 text-center">
                    <div
                      className={`rounded-2xl p-4 bg-gradient-to-br ${category.bgGradient} dark:bg-gradient-to-br ${category.darkBgGradient} border ${category.borderColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{category.description}</p>
                    </div>
                    <div
                      className={`w-full h-1 bg-gradient-to-r ${category.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-4 border-2 border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 font-semibold rounded-xl transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-600 hover:scale-105"
          >
            <Link href="/browse-courses">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
