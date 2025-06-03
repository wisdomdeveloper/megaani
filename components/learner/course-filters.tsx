"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CourseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get("category")?.split(",") || [])
  const [selectedLevels, setSelectedLevels] = useState<string[]>(searchParams.get("level")?.split(",") || [])

  const categories = [
    { id: "development", label: "Development" },
    { id: "business", label: "Business" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "photography", label: "Photography" },
    { id: "music", label: "Music" },
  ]

  const levels = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    } else {
      params.delete("category")
    }

    if (selectedLevels.length > 0) {
      params.set("level", selectedLevels.join(","))
    } else {
      params.delete("level")
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    router.push(`/browse-courses?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 200])
    setSelectedCategories([])
    setSelectedLevels([])
    router.push("/browse-courses")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Filters</h3>
        <Accordion type="multiple" defaultValue={["categories", "levels", "price"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm font-normal">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="levels">
            <AccordionTrigger>Levels</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {levels.map((level) => (
                  <div key={level.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`level-${level.id}`}
                      checked={selectedLevels.includes(level.id)}
                      onCheckedChange={() => handleLevelChange(level.id)}
                    />
                    <Label htmlFor={`level-${level.id}`} className="text-sm font-normal">
                      {level.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col space-y-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
