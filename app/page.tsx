import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { FeaturedCourses } from "@/components/home/featured-courses"
import { CategorySection } from "@/components/home/category-section"
import { HeroSection } from "@/components/home/hero-section"
import { InstructorCTA } from "@/components/home/instructor-cta"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <FeaturedCourses />
        <InstructorCTA />
      </main>
      <Footer />
    </div>
  )
}
