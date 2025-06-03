"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BookOpen, Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function BookFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [format, setFormat] = useState(searchParams.get("format") || "all")
  const [language, setLanguage] = useState(searchParams.get("language") || "all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [isOpen, setIsOpen] = useState(false)

  const handleApplyFilters = () => {
    const params = new URLSearchParams()

    if (category !== "all") params.set("category", category)
    if (format !== "all") params.set("format", format)
    if (language !== "all") params.set("language", language)
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 100) params.set("maxPrice", priceRange[1].toString())

    router.push(`/browse-books?${params.toString()}`)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    setCategory("all")
    setFormat("all")
    setLanguage("all")
    setPriceRange([0, 100])
    router.push("/browse-books")
    setIsOpen(false)
  }

  const filters = [
    {
      name: "Category",
      value: category,
      options: [
        { value: "programming", label: "Programming" },
        { value: "business", label: "Business" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
      ],
      onChange: setCategory,
    },
    {
      name: "Format",
      value: format,
      options: [
        { value: "PDF", label: "PDF" },
        { value: "EPUB", label: "EPUB" },
        { value: "Audiobook", label: "Audiobook" },
        { value: "Physical", label: "Physical" },
      ],
      onChange: setFormat,
    },
    {
      name: "Language",
      value: language,
      options: [
        { value: "English", label: "English" },
        { value: "Spanish", label: "Spanish" },
        { value: "French", label: "French" },
        { value: "German", label: "German" },
      ],
      onChange: setLanguage,
    },
  ]

  const FiltersContent = () => (
    <div className="flex flex-col gap-6">
      {filters.map((filter) => (
        <div key={filter.name} className="space-y-2">
          <Label htmlFor={filter.name}>{filter.name}</Label>
          <Select value={filter.value} onValueChange={filter.onChange}>
            <SelectTrigger id={filter.name}>
              <SelectValue placeholder={`Select ${filter.name}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.name}s</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <div className="text-sm">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
        <Slider defaultValue={priceRange} min={0} max={100} step={5} onValueChange={setPriceRange} className="py-4" />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApplyFilters} className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700">
          Apply Filters
        </Button>
        <Button onClick={handleResetFilters} variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className="sticky top-20 hidden h-fit space-y-6 lg:block">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center text-lg font-semibold">
            <BookOpen className="mr-2 h-5 w-5 text-emerald-600" />
            Filters
          </h3>
          {(category !== "all" ||
            format !== "all" ||
            language !== "all" ||
            priceRange[0] > 0 ||
            priceRange[1] < 100) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 text-xs text-muted-foreground"
            >
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
        <FiltersContent />
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Filters</h3>
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
