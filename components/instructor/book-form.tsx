"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { BookType, Upload, BookOpen } from "lucide-react"

const bookFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  formats: z.array(z.string()).min(1, {
    message: "Please select at least one format.",
  }),
  language: z.string().min(1, {
    message: "Please select a language.",
  }),
  pages: z.coerce.number().optional(),
  isbn: z.string().optional(),
  publicationDate: z.string().min(1, {
    message: "Please provide a publication date.",
  }),
  publisher: z.string().optional(),
  fileSize: z.string().optional(),
  duration: z.string().optional(),
})

type BookFormValues = z.infer<typeof bookFormSchema>

const formatOptions = [
  { id: "PDF", label: "PDF" },
  { id: "EPUB", label: "EPUB" },
  { id: "Audiobook", label: "Audiobook" },
  { id: "Physical", label: "Physical" },
]

export function BookForm() {
  const router = useRouter()
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [bookFile, setBookFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      formats: [],
      language: "",
      pages: undefined,
      isbn: "",
      publicationDate: new Date().toISOString().split("T")[0],
      publisher: "",
      fileSize: "",
      duration: "",
    },
  })

  const selectedFormats = form.watch("formats")
  const showPhysicalFields = selectedFormats.includes("Physical")
  const showDigitalFields = selectedFormats.includes("PDF") || selectedFormats.includes("EPUB")
  const showAudioFields = selectedFormats.includes("Audiobook")

  function onSubmit(data: BookFormValues) {
    setIsSubmitting(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsSubmitting(false)

      // In a real app, you would submit the form data and files to your API
      console.log("Form submitted:", data)
      console.log("Cover image:", coverImage)
      console.log("Book file:", bookFile)

      // Redirect to the instructor books page
      router.push("/instructor/books")
    }, 3000)
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleBookFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBookFile(e.target.files[0])
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter book description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="formats"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel>Book Formats</FormLabel>
                    <FormDescription>Select all formats you want to offer</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {formatOptions.map((format) => (
                      <FormField
                        key={format.id}
                        control={form.control}
                        name="formats"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={format.id}
                              className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(format.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, format.id])
                                      : field.onChange(field.value?.filter((value) => value !== format.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{format.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="publicationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publisher</FormLabel>
                    <FormControl>
                      <Input placeholder="Publisher name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {showPhysicalFields && (
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="pages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Pages</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input placeholder="ISBN number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {showDigitalFields && (
              <FormField
                control={form.control}
                name="fileSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5.2 MB" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {showAudioFields && (
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 8h 43m" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Card>
              <CardContent className="p-4">
                <div className="mb-4">
                  <FormLabel className="mb-2 block">Cover Image</FormLabel>
                  <div className="flex items-center gap-4">
                    <div className="relative h-32 w-24 overflow-hidden rounded-md border bg-muted">
                      {coverImage ? (
                        <img
                          src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <BookOpen className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input type="file" accept="image/*" onChange={handleCoverImageChange} />
                      <p className="mt-1 text-xs text-muted-foreground">Recommended size: 600x800px. Max 2MB.</p>
                    </div>
                  </div>
                </div>

                {(showDigitalFields || showAudioFields) && (
                  <div>
                    <FormLabel className="mb-2 block">Book File</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <BookType className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Input type="file" accept=".pdf,.epub,.mp3" onChange={handleBookFileChange} />
                        <p className="mt-1 text-xs text-muted-foreground">
                          {showDigitalFields && showAudioFields
                            ? "Upload PDF, EPUB, or MP3 file. Max 500MB."
                            : showDigitalFields
                              ? "Upload PDF or EPUB file. Max 100MB."
                              : "Upload MP3 file. Max 500MB."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {isSubmitting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Upload className="mr-2 h-4 w-4 animate-pulse" />
                <span>Uploading book...</span>
              </div>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-purple-600 transition-all" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/instructor/books")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
            {isSubmitting ? "Uploading..." : "Upload Book"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
